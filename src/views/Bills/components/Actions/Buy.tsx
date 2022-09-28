/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { Flex, Svg, Text, Text as StyledText, useModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useBuyBill from 'views/Bills/hooks/useBuyBill'
import BigNumber from 'bignumber.js'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from 'state/bills'
import { Field, selectCurrency } from 'state/swap/actions'
import { useTranslation } from 'contexts/Localization'
import { BuyProps } from './types'
import { GetLPButton, styles } from './styles'
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
import BillActions from './BillActions'

export interface TestPair {
  currencyA: Currency
  currencyB: Currency
}

const Buy: React.FC<BuyProps> = ({ bill, onBillId, onTransactionSubmited }) => {
  const {
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
  const { onBuyBill, maxPrice } = useBuyBill(contractAddress[chainId], value, lpPrice, price)
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

  const { recipient } = useZapState()
  const { zap } = useDerivedZapInfo()
  const [zapSlippage] = useUserSlippageTolerance(true)
  const { onCurrencySelection, onUserInput } = useZapActionHandlers()
  const { callback: zapCallback } = useZapCallback(
    zap,
    ZapType.ZAP_T_BILL,
    zapSlippage,
    recipient,
    '',
    contractAddress[chainId] || 's',
    maxPrice.toFixed(0),
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

  const onHandleValueChange = useCallback(
    (val: string) => {
      setValue(val)
      onUserInput(Field.INPUT, val)
    },
    [onUserInput],
  )

  const searchForBillId = useCallback(
    (resp) => {
      const billId = resp.events[6]?.args?.billId?.toString()
      const { transactionHash } = resp
      onBillId(billId, transactionHash)
    },
    [onBillId],
  )

  const handleBuy = useCallback(async () => {
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
  }, [
    account,
    chainId,
    currencyB,
    dispatch,
    onBuyBill,
    onTransactionSubmited,
    searchForBillId,
    t,
    toastError,
    toastSuccess,
    zapCallback,
  ])

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
      setCurrencyA(currency?.currencyA)
      setCurrencyB(currency?.currencyB)
      onHandleValueChange('')
      // if currencyB is null, use buyBill logic
      if (!currency?.currencyB) {
        // if there's no currencyB apply zap logic
        onCurrencySelection(Field.INPUT, [currency.currencyA])
        onCurrencySelection(Field.OUTPUT, [billCurrencyA, billCurrencyB])
      }
    },
    [billCurrencyA, billCurrencyB, onCurrencySelection, onHandleValueChange],
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
          <BillActions
            bill={bill}
            currencyB={currencyB}
            handleBuy={handleBuy}
            billValue={billValue}
            value={value}
            safeAvailable={safeAvailable?.toString()}
            balance={selectedCurrencyBalance?.toExact()}
            pendingTrx={pendingTrx}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export default React.memo(Buy)
