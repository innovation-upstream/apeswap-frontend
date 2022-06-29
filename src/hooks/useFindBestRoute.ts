import { SmartRouter } from '@apeswapfinance/sdk'
import { PRIORITY_SMART_ROUTERS } from 'config/constants/chains'
import { SwapDelay, RouterTypeParams, Field } from 'state/swap/actions'
import { tryParseAmount, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from 'utils/prices'
import callWallchainAPI from 'utils/wallchainService'
import { useCurrency } from './Tokens'
import { useTradeExactIn, useTradeExactOut } from './Trades'
import useActiveWeb3React from './useActiveWeb3React'
import { useSwapCallArguments } from './useSwapCallback'

// This file will be more involved with V2 launch.

const useFindBestRoute = () => {
  const { onSetSwapDelay, onBestRoute } = useSwapActionHandlers()
  const {
    recipient,
    swapDelay,
    independentField,
    typedValue,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const [allowedSlippage] = useUserSlippageTolerance()
  const { chainId, account } = useActiveWeb3React()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined)
  const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut
  const { priceImpactWithoutFee } = computeTradePriceBreakdown(v2Trade)
  console.log(v2Trade)

  const swapCalls = useSwapCallArguments(v2Trade, allowedSlippage, recipient)

  // To not cause a call on every user input the code will be executed when the delay is complete
  if (swapDelay !== SwapDelay.INPUT_COMPLETE) {
    return v2Trade
  }
  if (swapCalls[0]) {
    const {
      contract,
      parameters: { methodName, args, value },
    } = swapCalls[0]
    callWallchainAPI(methodName, args, value, chainId, account, contract, onBestRoute, onSetSwapDelay)
  }
  // onSetSwapDelay(SwapDelay.VALID)
  return v2Trade
}

export default useFindBestRoute
