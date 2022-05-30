import React, { useCallback } from 'react'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { Flex } from '@ape.swap/uikit'
import { useExpertModeManager, useUserSlippageTolerance } from 'state/user/hooks'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { dexStyles } from '../styles'
import DexPanel from '../components/DexPanel'
import DexNav from '../components/DexNav'
import SwapSwitchButton from './components/SwapSwitchButton'
import DexActions from '../components/DexActions'
import DexTradeInfo from '../components/DexTradeInfo'

const Swap: React.FC = () => {
  const loadedUrlParams = useDefaultsFromURLSearch()

  const [allowedSlippage] = useUserSlippageTolerance()

  // for expert mode
  const [isExpertMode] = useExpertModeManager()

  const { INPUT, OUTPUT, independentField, typedValue, recipient } = useSwapState()

  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()

  console.log(v2Trade)

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

  return (
    <Flex sx={{ justifyContent: 'center', height: '100vh', paddingTop: '100px' }}>
      <Flex sx={{ ...dexStyles.dexContainer }}>
        <DexNav />
        <DexPanel
          value={formattedAmounts[Field.INPUT]}
          currency={inputCurrency}
          otherCurrency={outputCurrency}
          fieldType={Field.INPUT}
          onCurrencySelect={onCurrencySelection}
          onUserInput={onUserInput}
        />
        <SwapSwitchButton onClick={onSwitchTokens} />
        <DexPanel
          value={formattedAmounts[Field.OUTPUT]}
          currency={outputCurrency}
          otherCurrency={inputCurrency}
          fieldType={Field.OUTPUT}
          onCurrencySelect={onCurrencySelection}
          onUserInput={onUserInput}
        />
        <DexTradeInfo trade={v2Trade} allowedSlippage={allowedSlippage} />
        <DexActions
          trade={trade}
          swapInputError={swapInputError}
          isExpertMode={isExpertMode}
          showWrap={showWrap}
          wrapType={wrapType}
          onWrap={onWrap}
        />
      </Flex>
    </Flex>
  )
}

export default React.memo(Swap)
