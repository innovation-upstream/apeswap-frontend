/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { AutoRenewIcon, Flex, Svg, Text, Text as StyledText, useModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBuyBill from 'views/Bills/hooks/useBuyBill'
import BigNumber from 'bignumber.js'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { Field, selectCurrency } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { ActionProps } from './types'
import { BuyButton, GetLPButton, styles } from './styles'
import DualLiquidityModal from 'components/DualAddLiquidity/DualLiquidityModal'
import { selectOutputCurrency } from 'state/zap/actions'
import { BillValueContainer, TextWrapper } from '../Modals/styles'
import InputPanel from './InputPanel/InputPanel'
import { usePair } from 'hooks/usePairs'
import { Currency, ZapType } from '@ape.swap/sdk'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { useCurrency } from 'hooks/Tokens'
import { Box } from 'theme-ui'
import { useCurrencyBalance } from 'state/wallet/hooks'
import maxAmountSpend from 'utils/maxAmountSpend'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { useZapCallback } from 'hooks/useZapCallback'

export interface TestPair {
  currencyA: Currency
  currencyB: Currency
}

const Buy: React.FC<ActionProps> = ({ bill, onBillId, onTransactionSubmited }) => {
  const {
    userData,
    token,
    quoteToken,
    contractAddress,
    price,
    lpPrice,
    earnToken,
    earnTokenPrice,
    maxTotalPayOut,
    totalPayoutGiven,
  } = bill
  const { chainId, account } = useActiveWeb3React()
  const [value, setValue] = useState('')
  const { onBuyBill } = useBuyBill(contractAddress[chainId], value, lpPrice, price)
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const billCurrencyA = useCurrency(token.address[chainId])
  const billCurrencyB = useCurrency(quoteToken.address[chainId])
  const [currencyA, setCurrencyA] = useState(billCurrencyA)
  const [currencyB, setCurrencyB] = useState(billCurrencyB)

  const billsCurrencies: TestPair = { currencyA: billCurrencyA, currencyB: billCurrencyB }

  const inputCurrencies = [currencyA, currencyB]
  const [, pair] = usePair(inputCurrencies[0], inputCurrencies[1])
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, pair?.liquidityToken ?? inputCurrencies[0])

  const { INPUT, OUTPUT, typedValue, recipient } = useZapState()
  const { zap } = useDerivedZapInfo(typedValue, INPUT, OUTPUT, recipient)
  const [zapSlippage] = useUserSlippageTolerance(true)
  const { onCurrencySelection, onUserInput } = useZapActionHandlers()
  const { callback: zapCallback } = useZapCallback(
    zap,
    ZapType.ZAP_T_BILL,
    zapSlippage,
    recipient,
    '',
    contractAddress[chainId] || 's',
  )

  const consideredValue = inputCurrencies[1] ? value : zap?.pairOut?.liquidityMinted?.toExact()
  const bigValue = new BigNumber(consideredValue).times(new BigNumber(10).pow(18))
  const billValue = bigValue.div(new BigNumber(price))?.toString()
  const available = new BigNumber(maxTotalPayOut)
    ?.minus(new BigNumber(totalPayoutGiven))
    ?.div(new BigNumber(10).pow(earnToken.decimals))

  // threshold equals to 2 usd in earned tokens (banana or jungle token)
  const threshold = new BigNumber(10).div(earnTokenPrice)
  const safeAvailable = available.minus(threshold)

  const onHandleValueChange = (val: string) => {
    setValue(val)
    onUserInput(Field.INPUT, val)
  }

  const searchForBillId = (resp) => {
    const billId = resp.events[6]?.args?.billId?.toString()
    const { transactionHash } = resp
    onBillId(billId, transactionHash)
  }

  const handleBuy = async () => {
    setPendingTrx(true)
    if (currencyB) {
      onTransactionSubmited(true)
      await onBuyBill()
        .then((resp) => {
          const trxHash = resp.transactionHash
          searchForBillId(resp)
          toastSuccess(t('Buy Successful'), {
            text: t('View Transaction'),
            url: getEtherscanLink(trxHash, 'transaction', chainId),
          })
        })
        .catch((e) => {
          console.error(e)
          toastError(e?.data?.message || t('Error: Please try again.'))
          setPendingTrx(false)
          onTransactionSubmited(false)
        })
    } else {
      await zapCallback()
        .then((hash) => {
          toastSuccess(t('Buy Successful'), {
            text: t('View Transaction'),
            url: getEtherscanLink(hash, 'transaction', chainId),
          })
        })
        .catch((e) => {
          console.error(e)
          toastError(e?.data?.message || t('Error: Please try again.'))
          setPendingTrx(false)
          onTransactionSubmited(false)
        })
    }
    dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    dispatch(fetchBillsUserDataAsync(chainId, account))
    setPendingTrx(false)
  }

  const [onPresentAddLiquidityModal] = useModal(<DualLiquidityModal />, true, true, 'liquidityWidgetModal')

  const showLiquidity = () => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token.symbol === 'BNB' ? 'ETH' : token.address[chainId],
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken.symbol === 'BNB' ? 'ETH' : quoteToken.address[chainId],
      }),
    )
    dispatch(
      selectOutputCurrency({
        currency1: token.address[chainId],
        currency2: quoteToken.address[chainId],
      }),
    )
    onPresentAddLiquidityModal()
  }

  const handleMaxInput = () => {
    if (!currencyB && currencyA.symbol === 'ETH') {
      onHandleValueChange(maxAmountSpend(selectedCurrencyBalance)?.toExact())
    }
    onHandleValueChange(selectedCurrencyBalance.toExact())
  }

  const handleCurrencySelect = useCallback(
    (currency: TestPair) => {
      // if currencyB !== use buyBill logic
      if (currency?.currencyB) {
        setCurrencyA(currency.currencyA)
        setCurrencyB(currency.currencyB)
      } else {
        // if there's no currencyB apply zap logic
        onCurrencySelection(Field.INPUT, [currency.currencyA])
        onCurrencySelection(Field.OUTPUT, [billCurrencyA, billCurrencyB])
        setCurrencyA(currency.currencyA)
        setCurrencyB(null)
      }
    },
    [billCurrencyA, billCurrencyB, onCurrencySelection],
  )

  return (
    <Flex sx={styles.buyContainer}>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box>
          <Box sx={styles.lpContainer}>
            <GetLPButton variant="secondary" onClick={showLiquidity}>
              <StyledText sx={{ marginRight: '5px' }}>{t('Get LP')}</StyledText>
              <Svg icon="ZapIcon" color="yellow" />
            </GetLPButton>
          </Box>
          <InputPanel
            handleMaxInput={handleMaxInput}
            onUserInput={onHandleValueChange}
            value={value}
            onCurrencySelect={handleCurrencySelect}
            inputCurrencies={inputCurrencies}
            lpList={[billsCurrencies]}
          />
          {new BigNumber(userData?.allowance).gt(0) && (
            <BillValueContainer>
              <TextWrapper>
                <Text size="12px" pr={1}>
                  {t('Bill Value')}:{' '}
                  <span style={{ fontWeight: 700 }}>
                    {billValue === 'NaN' ? '0' : parseFloat(billValue).toFixed(3)} {earnToken?.symbol}
                  </span>
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text size="12px">
                  {t('Available')}:{' '}
                  <span style={{ fontWeight: 700 }}>
                    {!available ? '0' : new BigNumber(safeAvailable).toFixed(3)} {earnToken?.symbol}
                  </span>
                </Text>
              </TextWrapper>
            </BillValueContainer>
          )}
        </Box>
      </Flex>
      <Flex sx={{ width: '100%' }}>
        <Box sx={styles.getLpContainer}>
          <GetLPButton variant="secondary" onClick={showLiquidity}>
            <StyledText sx={{ marginRight: '5px' }}>{t('Get LP')}</StyledText>
            <Svg icon="ZapIcon" color="yellow" />
          </GetLPButton>
        </Box>
        <Box sx={styles.buyButtonContainer}>
          <BuyButton
            onClick={handleBuy}
            endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={
              billValue === 'NaN' ||
              parseFloat(billValue) < 0.01 ||
              parseFloat(billValue) > safeAvailable.toNumber() ||
              parseFloat(selectedCurrencyBalance.toExact()) < parseFloat(value) ||
              pendingTrx
            }
          >
            {t('Buy')}
          </BuyButton>
        </Box>
      </Flex>
    </Flex>
  )
}

export default React.memo(Buy)
