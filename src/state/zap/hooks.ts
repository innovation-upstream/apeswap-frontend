import { parseUnits } from '@ethersproject/units'
import { ChainId, Currency, CurrencyAmount, ETHER, JSBI, Token, TokenAmount, Zap, ZapType } from '@ape.swap/sdk'
import { ParsedQs } from 'qs'
import { useCallback, useEffect, useMemo, useState } from 'react'
import contracts from 'config/constants/contracts'
import { useDispatch, useSelector } from 'react-redux'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useENS from 'hooks/ENS/useENS'
import { useCurrency } from 'hooks/Tokens'
import { mergeBestZaps, useTradeExactIn } from 'hooks/Zap/Zap'
import useParsedQueryString from 'hooks/useParsedQueryString'
import { isAddress } from 'utils'
import { AppDispatch, AppState, useAppDispatch } from '../index'
import { useCurrencyBalances } from '../wallet/hooks'
import {
  Field,
  MergedZap,
  replaceZapState,
  selectInputCurrency,
  selectOutputCurrency,
  setInputList,
  setRecipient,
  setZapType,
  typeInput,
} from './actions'
import { ParsedFarm, ZapState } from './reducer'
import { useUserSlippageTolerance } from '../user/hooks'
import { usePair } from 'hooks/usePairs'
import useTotalSupply from 'hooks/useTotalSupply'
import { AppThunk } from '../types'
import fetchZapInputTokens from './api'
import { TokenAddressMap, WrappedTokenInfo } from '../lists/hooks'
import { fromPairs, groupBy } from 'lodash'

export function useZapState(): AppState['zap'] {
  return useSelector<AppState, AppState['zap']>((state) => state.zap)
}

export function useZapActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency[]) => void
  onUserInput: (field: Field, typedValue: string) => void
  onChangeRecipient: (recipient: string | null) => void
  onSetZapType: (zapType: ZapType) => void
} {
  const dispatch = useAppDispatch()

  const onCurrencySelection = useCallback(
    (field: Field, currencies: Currency[]) => {
      const currency = currencies[0]
      if (field === Field.INPUT) {
        dispatch(
          selectInputCurrency({
            currencyId: currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : '',
          }),
        )
      } else {
        const currency2 = currencies[1]
        dispatch(
          selectOutputCurrency({
            currency1: currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : '',
            currency2: currency2 instanceof Token ? currency2.address : currency2 === ETHER ? 'ETH' : '',
          }),
        )
      }
    },
    [dispatch],
  )

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch],
  )

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      dispatch(setRecipient({ recipient }))
    },
    [dispatch],
  )

  const onSetZapType = useCallback(
    (zapType: ZapType) => {
      dispatch(setZapType({ zapType }))
    },
    [dispatch],
  )

  return {
    onCurrencySelection,
    onUserInput,
    onChangeRecipient,
    onSetZapType,
  }
}

// try to parse a user entered amount for a given token
export function tryParseAmount(value?: string, currency?: Currency): CurrencyAmount | undefined {
  if (!value || !currency) {
    return undefined
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString()
    if (typedValueParsed !== '0') {
      return currency instanceof Token
        ? new TokenAmount(currency, JSBI.BigInt(typedValueParsed))
        : CurrencyAmount.ether(JSBI.BigInt(typedValueParsed))
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error)
  }
  // necessary for all paths to return a value
  return undefined
}

const BAD_RECIPIENT_ADDRESSES: string[] = [
  '0xBCfCcbde45cE874adCB698cC183deBcF17952812', // v2 factory
  '0xf164fC0Ec4E93095b804a4795bBe1e041497b92a', // v2 router 01
  '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F', // v2 router 02
]

/**
 * Returns true if any of the pairs or tokens in a trade have the given checksummed address
 * @param trade to check for the given address
 * @param checksummedAddress address to check in the pairs and tokens
 */
function involvesAddress(trade: Zap, checksummedAddress: string): boolean {
  return (
    trade.route.path.some((token) => token.address === checksummedAddress) ||
    trade.route.pairs.some((pair) => pair.liquidityToken.address === checksummedAddress)
  )
}

// from the current swap inputs, compute the best trade and return it.
export function useDerivedZapInfo(
  typedValue,
  INPUT,
  OUTPUT,
  recipient,
): {
  currencies: { [field in Field]?: Currency }
  currencyBalances: { [field in Field]?: CurrencyAmount }
  parsedAmount: CurrencyAmount | undefined
  zap: MergedZap
  inputError?: string
} {
  const { account, chainId } = useActiveWeb3React()
  const { currency1: outputCurrencyId1, currency2: outputCurrencyId2 } = OUTPUT

  const inputCurrency = useCurrency(INPUT.currencyId)

  const out1 = useCurrency(useMemo(() => outputCurrencyId1, [outputCurrencyId1]))
  const out2 = useCurrency(useMemo(() => outputCurrencyId2, [outputCurrencyId2]))
  const outputCurrencies = useMemo(() => {
    return [out1, out2]
  }, [out1, out2])
  const outputPair = usePair(outputCurrencies[0], outputCurrencies[1])
  const totalSupply = useTotalSupply(outputPair?.[1]?.liquidityToken)

  const recipientLookup = useENS(recipient ?? undefined)
  const to: string | null = (recipient === null ? account : recipientLookup.address) ?? null
  const [allowedSlippage] = useUserSlippageTolerance(true)

  const relevantTokenBalances = useCurrencyBalances(account ?? undefined, [
    inputCurrency ?? undefined,
    outputPair?.[1]?.liquidityToken ?? undefined,
  ])

  // Change to currency amount. Divide the typed input by 2 to get correct distributions
  // I think the parseFloat might be generating rounding issues
  const parsedAmount = tryParseAmount((parseFloat(typedValue) / 2).toString(), inputCurrency ?? undefined)

  const bestZapOne = useTradeExactIn(parsedAmount, outputCurrencies[0] ?? undefined)
  const bestZapTwo = useTradeExactIn(parsedAmount, outputCurrencies[1] ?? undefined)
  const zap = useMemo(
    () => mergeBestZaps(bestZapOne, bestZapTwo, outputCurrencies, outputPair, allowedSlippage, totalSupply, chainId),
    [bestZapOne, bestZapTwo, outputCurrencies, outputPair, allowedSlippage, totalSupply, chainId],
  )

  const currencyBalances = {
    [Field.INPUT]: relevantTokenBalances[0],
    [Field.OUTPUT]: relevantTokenBalances[1],
  }

  const currencies: { [field in Field]?: Currency } = {
    [Field.INPUT]: inputCurrency ?? undefined,
    [Field.OUTPUT]: inputCurrency ?? undefined,
  }

  let inputError: string | undefined
  if (!account) {
    inputError = 'Connect Wallet'
  }

  if (!parsedAmount) {
    inputError = inputError ?? 'Enter an amount'
  }

  if (!currencies[Field.INPUT] || !currencies[Field.OUTPUT]) {
    inputError = inputError ?? 'Select a token'
  }

  const formattedTo = isAddress(to)
  if (!to || !formattedTo) {
    inputError = inputError ?? 'Enter a recipient'
  } else if (
    BAD_RECIPIENT_ADDRESSES.indexOf(formattedTo) !== -1 ||
    (bestZapOne && involvesAddress(bestZapOne, formattedTo))
  ) {
    inputError = inputError ?? 'Invalid recipient'
  }

  // compare input balance to max input based on version
  const [balanceIn, amountIn] = [
    currencyBalances[Field.INPUT],
    zap?.currencyIn?.inputAmount ? zap?.currencyIn.inputAmount : null,
  ]

  if (balanceIn && amountIn && JSBI.lessThan(balanceIn.raw, amountIn)) {
    inputError = `Insufficient ${zap.currencyIn.currency.getSymbol(chainId)} balance`
  }

  return {
    currencies,
    currencyBalances,
    parsedAmount,
    zap,
    inputError,
  }
}

function parseCurrencyFromURLParameter(urlParam: any): string {
  if (typeof urlParam === 'string') {
    const valid = isAddress(urlParam)
    if (valid) return valid
    if (urlParam.toUpperCase() === 'ETH') return 'ETH'
    if (valid === false) return 'ETH'
  }
  return 'ETH' ?? ''
}

function parseTokenAmountURLParameter(urlParam: any): string {
  // eslint-disable-next-line no-restricted-globals
  return typeof urlParam === 'string' && !isNaN(parseFloat(urlParam)) ? urlParam : ''
}

function parseIndependentFieldURLParameter(urlParam: any): Field {
  return typeof urlParam === 'string' && urlParam.toLowerCase() === 'output' ? Field.OUTPUT : Field.INPUT
}

const ENS_NAME_REGEX = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)?$/
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/

function validatedRecipient(recipient: any): string | null {
  if (typeof recipient !== 'string') return null
  const address = isAddress(recipient)
  if (address) return address
  if (ENS_NAME_REGEX.test(recipient)) return recipient
  if (ADDRESS_REGEX.test(recipient)) return recipient
  return null
}

export function queryParametersToZapState(parsedQs: ParsedQs, chainId: ChainId): ZapState {
  let inputCurrency = parseCurrencyFromURLParameter(parsedQs.inputCurrency)
  let outputCurrency = parseCurrencyFromURLParameter(parsedQs.outputCurrency)

  const chainAddress = contracts.banana[chainId]

  if (inputCurrency === outputCurrency) {
    if (typeof parsedQs.outputCurrency === 'string') {
      inputCurrency = ''
    } else {
      outputCurrency = chainAddress
    }
  }

  const recipient = validatedRecipient(parsedQs.recipient)

  return {
    [Field.INPUT]: {
      currencyId: inputCurrency,
    },
    [Field.OUTPUT]: {
      lpSymbol: '',
      lpAddress: '',
      lpValueUsd: '',
      currency1: '',
      currency1Symbol: '',
      currency2: '',
      currency2Symbol: '',
      userData: {
        allowance: undefined,
        tokenBalance: undefined,
        stakedBalance: undefined,
        earnings: undefined,
      },
    },
    shareOfPool: '',
    typedValue: parseTokenAmountURLParameter(parsedQs.exactAmount),
    independentField: parseIndependentFieldURLParameter(parsedQs.exactField),
    zapType: ZapType.ZAP,
    recipient,
    zapOutputList: null,
    zapInputList: null,
    zapSlippage: null,
  }
}

// updates the swap state to use the defaults for a given network
export function useDefaultsFromURLSearch():
  | {
      inputCurrencyId: string | undefined
      outputCurrencies: { currency1: string | undefined; currency2: string | undefined }
    }
  | undefined {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const parsedQs = useParsedQueryString()
  const [result, setResult] = useState<
    | {
        inputCurrencyId: string | undefined
        outputCurrencies: { currency1: string | undefined; currency2: string | undefined }
      }
    | undefined
  >()

  useEffect(() => {
    if (!chainId) return
    const parsed = queryParametersToZapState(parsedQs, chainId)

    dispatch(
      replaceZapState({
        typedValue: parsed.typedValue,
        field: parsed.independentField,
        inputCurrencyId: parsed[Field.INPUT].currencyId,
        outputCurrencyId: parsed[Field.OUTPUT],
        recipient: parsed.recipient,
        zapType: parsed.zapType,
      }),
    )

    setResult({ inputCurrencyId: parsed[Field.INPUT].currencyId, outputCurrencies: parsed[Field.OUTPUT] })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, chainId])

  return result
}

export function useZapInputList(): { [address: string]: Token } {
  const { zapInputList } = useZapState()
  if (!zapInputList) return
  return zapInputList
}

export const useSetInitialZapData = () => {
  const dispatch = useAppDispatch()
  const { zapInputList } = useZapState()
  if (!zapInputList) {
    dispatch(getZapInputList())
  }
}

export const getZapOutputList = (farms, jungleFarms, currentBlock, chainId) => {
  const activeFarms = farms?.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

  const parsedFarms: ParsedFarm[] = activeFarms?.map((farm) => {
    return {
      lpSymbol: farm.lpSymbol,
      lpAddress: farm.lpAddresses[chainId],
      lpValueUsd: farm.lpValueUsd?.toString(),
      currency1: farm.tokenAddresses[chainId],
      currency1Symbol: farm.tokenSymbol,
      currency2: farm.quoteTokenAdresses[chainId],
      currency2Symbol: farm.quoteTokenSymbol,
      userData: farm.userData,
    }
  })

  const currJungleFarms = jungleFarms?.map((farm) => {
    return { ...farm, isFinished: farm.isFinished || currentBlock > farm.endBlock }
  })

  const activeJungleFarms = currJungleFarms?.filter((farm) => {
    return !farm.isFinished
  })

  const parsedJungleFarms: ParsedFarm[] = activeJungleFarms?.map((farm) => {
    return {
      lpSymbol: farm.tokenName,
      lpAddress: farm.contractAddress[chainId],
      lpValueUsd: '0',
      currency1: farm.lpTokens.token.address[chainId],
      currency1Symbol: farm.lpTokens.token.symbol,
      currency2: farm.lpTokens.quoteToken.address[chainId],
      currency2Symbol: farm.lpTokens.quoteToken.symbol,
      userData: {
        allowance: farm.userData?.allowance,
        tokenBalance: farm.userData?.stakingTokenBalance,
        stakedBalance: farm.userData?.stakedBalance,
        earnings: farm.userData?.pendingReward,
      },
    }
  })
  return [...parsedFarms, ...parsedJungleFarms]
}

export const getZapInputList = (): AppThunk => async (dispatch) => {
  try {
    const resp: { [symbol: string]: Token } = await fetchZapInputTokens()
    if (resp) dispatch(setInputList({ zapInputList: resp }))
  } catch (error) {
    console.error(error)
  }
}

//this function could be used to parse the zapList, so it can be used for DexPanel component
const parseZapInput = (chainId, zapInputList) => {
  const tokenMap = []
  Object.values(zapInputList).forEach((token: any) => {
    const addressesEntries = Object.entries(token.address)
    const mapedTokensByAddresses = []
    addressesEntries.forEach((address) => {
      if (address[1] === '') return
      mapedTokensByAddresses.push({
        address: address[1],
        chainId: address[0],
        decimals: token.decimals,
        symbol: token.symbol,
      })
    })
    mapedTokensByAddresses.forEach((mappedToken) => {
      tokenMap.push(new WrappedTokenInfo(mappedToken, []))
    })
  })

  const groupedTokenMap: { [chainId: string]: WrappedTokenInfo[] } = groupBy(tokenMap, (tokenInfo) => tokenInfo.chainId)
  const tokenAddressMap = fromPairs(
    Object.entries(groupedTokenMap).map(([chainId, tokenInfoList]) => [
      chainId,
      fromPairs(tokenInfoList.map((tokenInfo) => [tokenInfo.address, { token: tokenInfo }])),
    ]),
  ) as TokenAddressMap

  return Object.keys(tokenAddressMap[chainId] ?? {}).reduce<{ [address: string]: Token }>((newMap, address) => {
    newMap[address] = tokenAddressMap[chainId][address].token
    return newMap
  }, {})
}
