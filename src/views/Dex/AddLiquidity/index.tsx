import React, { useCallback, useState } from 'react'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { ArrowDropLeftIcon, Button, Flex, Text, useModal } from '@ape.swap/uikit'
import { useSwapCallback } from 'hooks/useSwapCallback'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import confirmPriceImpactWithoutFee from 'views/Swap/components/confirmPriceImpactWithoutFee'
import { computeTradePriceBreakdown } from 'utils/prices'
import { useTranslation } from 'contexts/Localization'
import { Link } from 'react-router-dom'
import { CurrencyAmount, JSBI, Trade } from '@apeswapfinance/sdk'
import { useExpertModeManager, useUserSlippageTolerance } from 'state/user/hooks'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import maxAmountSpend from 'utils/maxAmountSpend'
import { dexStyles } from '../styles'
import DexPanel from '../components/DexPanel'
import DexNav from '../components/DexNav'
import ConfirmSwapModal from '../Swap/components/ConfirmSwapModal'
import SwapSwitchButton from '../Swap/components/SwapSwitchButton'
import DexActions from '../components/DexActions'
import DexTradeInfo from '../components/DexTradeInfo'
import AddLiquiditySign from './components/AddLiquiditySign'

const Swap: React.FC = () => {
  // modal and loading
  const [{ tradeToConfirm, swapErrorMessage, attemptingTxn, txHash }, setSwapState] = useState<{
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    swapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    tradeToConfirm: undefined,
    attemptingTxn: false,
    swapErrorMessage: undefined,
    txHash: undefined,
  })

  const loadedUrlParams = useDefaultsFromURLSearch()

  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const [allowedSlippage] = useUserSlippageTolerance()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  const { INPUT, OUTPUT, independentField, typedValue, recipient } = useSwapState()
  // the callback to execute the swap

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  console.log(v2Trade)
  console.log(useDerivedSwapInfo())
  console.log(parsedAmount)

  const [inputCurrency, outputCurrency] = [useCurrency(INPUT?.currencyId), useCurrency(OUTPUT?.currencyId)]

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)
  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE
  const trade = showWrap ? undefined : v2Trade
  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT
  const parsedAmounts = showWrap
    ? {
        [Field.INPUT]: parsedAmount,
        [Field.OUTPUT]: parsedAmount,
      }
    : {
        [Field.INPUT]: independentField === Field.INPUT ? parsedAmount : trade?.inputAmount,
        [Field.OUTPUT]: independentField === Field.OUTPUT ? parsedAmount : trade?.outputAmount,
      }

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: showWrap
      ? parsedAmounts[independentField]?.toExact() ?? ''
      : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(trade, allowedSlippage, recipient)

  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])

  const { priceImpactWithoutFee } = computeTradePriceBreakdown(trade)

  const handleAcceptChanges = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, tradeToConfirm: trade }))
  }, [trade])

  const handleConfirmDismiss = useCallback(() => {
    setSwapState((prevState) => ({ ...prevState, showConfirm: false })) // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [onUserInput, txHash])

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  const userHasSpecifiedInputOutput = Boolean(
    currencies[Field.INPUT] && currencies[Field.OUTPUT] && parsedAmounts[independentField]?.greaterThan(JSBI.BigInt(0)),
  )

  const handleSwap = useCallback(() => {
    if (priceImpactWithoutFee && !confirmPriceImpactWithoutFee(priceImpactWithoutFee, t)) {
      return
    }
    if (!swapCallback) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, swapErrorMessage: undefined, txHash: undefined })
    swapCallback()
      .then(async (hash) => {
        setSwapState({ attemptingTxn: false, tradeToConfirm, swapErrorMessage: undefined, txHash: hash })
        //   track({
        //     event: 'swap',
        //     value: tradeValueUsd,
        //     chain: chainId,
        //     data: {
        //       token1: trade?.inputAmount?.currency?.getSymbol(chainId),
        //       token2: trade?.outputAmount?.currency?.getSymbol(chainId),
        //       token1Amount: Number(trade?.inputAmount.toSignificant(6)),
        //       token2Amount: Number(trade?.outputAmount.toSignificant(6)),
        //     },
        //   })
      })
      .catch((error) => {
        setSwapState({
          attemptingTxn: false,
          tradeToConfirm,
          swapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t])

  // const handleCurrencySelection = useCallback(
  //   (selectedCurrency: Currency, fieldType: Field) => {
  //     onCurrencySelection(fieldType, selectedCurrency)
  //     // updateParams('outputCurrency', outputCurrency.symbol !== 'ETH' ? outputCurrency.address : 'ETH')
  //     // const showSwapWarning = shouldShowSwapWarning(outputCurrency)
  //     // if (showSwapWarning) {
  //     //   setSwapWarningCurrency(outputCurrency)
  //     // } else {
  //     //   setSwapWarningCurrency(null)
  //     // }
  //   },
  //   [onCurrencySelection],
  // )

  const [onPresentConfirmModal] = useModal(
    <ConfirmSwapModal
      trade={trade}
      originalTrade={tradeToConfirm}
      onAcceptChanges={handleAcceptChanges}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      recipient={recipient}
      bestRoute={null}
      allowedSlippage={allowedSlippage}
      onConfirm={handleSwap}
      swapErrorMessage={swapErrorMessage}
      customOnDismiss={handleConfirmDismiss}
    />,
    true,
    true,
    'swapConfirmModal',
  )

  return (
    <Flex sx={{ justifyContent: 'center', height: '100vh', paddingTop: '100px' }}>
      <Flex sx={{ ...dexStyles.dexContainer }}>
        <DexNav />
        <Flex sx={{ margin: '20px 0px 5px 0px', justifyContent: 'center' }}>
          <Text weight={700}>ADD LIQUIDITY</Text>
        </Flex>
        <Flex sx={{ margin: '0px 0px 50px 0px', alignItems: 'center' }}>
          <Link to="/pool">
            <ArrowDropLeftIcon width="7px" /> <Text size="12px">{t('Back')}</Text>
          </Link>
        </Flex>
        <DexPanel
          value={formattedAmounts[Field.INPUT]}
          panelText="Token 1"
          currency={inputCurrency}
          otherCurrency={outputCurrency}
          fieldType={Field.INPUT}
          onCurrencySelect={onCurrencySelection}
          onUserInput={onUserInput}
          handleMaxInput={handleMaxInput}
        />
        <AddLiquiditySign />
        <DexPanel
          value={formattedAmounts[Field.OUTPUT]}
          panelText="Token 2"
          currency={outputCurrency}
          otherCurrency={inputCurrency}
          fieldType={Field.OUTPUT}
          onCurrencySelect={onCurrencySelection}
          onUserInput={onUserInput}
        />
        <DexTradeInfo trade={v2Trade} allowedSlippage={allowedSlippage} bestRoute={null} />
        <DexActions
          trade={trade}
          swapInputError={swapInputError}
          isExpertMode={isExpertMode}
          showWrap={showWrap}
          wrapType={wrapType}
          swapCallbackError={swapCallbackError}
          priceImpactWithoutFee={priceImpactWithoutFee}
          userHasSpecifiedInputOutput={userHasSpecifiedInputOutput}
          onWrap={onWrap}
          handleSwap={handleSwap}
          onPresentConfirmModal={onPresentConfirmModal}
          setSwapState={setSwapState}
          disabled={false}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(Swap)
