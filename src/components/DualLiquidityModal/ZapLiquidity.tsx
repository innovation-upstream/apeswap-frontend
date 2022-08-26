import React, { useCallback, useState } from 'react'
import { Flex, Link, Text } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { useAppDispatch } from 'state'
import { useCurrency } from 'hooks/Tokens'
import { Currency, ETHER, Token, TokenAmount, ZapType } from '@ape.swap/sdk'
import maxAmountSpend from 'utils/maxAmountSpend'
import ZapPanel from './components/ZapPanel'
import { Field, selectInputCurrency, selectLP } from 'state/zap/actions'
import { useDerivedZapInfo, useSetInitialZapData, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import ZapArrow from './components/Svg/ZapArrow'
import ZapLiquidityActions from './components/ZapLiquidityActions'
import { styles } from './styles'
import { ParsedFarm } from 'state/zap/reducer'
import { useZapCallback } from 'hooks/useZapCallback'
import DistributionPanel from './components/DistributionPanel/DistributionPanel'

const ZapLiquidity = () => {
  const [{ zapErrorMessage, txHash }, setZapState] = useState<{
    zapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    zapErrorMessage: undefined,
    txHash: undefined,
  })
  useSetInitialZapData()

  const dispatch = useAppDispatch()
  const { INPUT, OUTPUT, typedValue, recipient, zapType, zapSlippage } = useZapState()

  const inputCurrency = useCurrency(INPUT?.currencyId)

  const { zap, inputError: zapInputError, currencyBalances } = useDerivedZapInfo(typedValue, INPUT, OUTPUT, recipient)
  const { onUserInput, onSetZapType } = useZapActionHandlers()
  onSetZapType(ZapType.ZAP)

  const { callback: zapCallback, error: zapCallbackError } = useZapCallback(
    zap,
    zapType,
    zapSlippage,
    recipient,
    '',
    null,
  )

  const handleZap = useCallback(() => {
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
    zapCallback()
      .then((hash) => {
        setZapState({
          zapErrorMessage: undefined,
          txHash: hash,
        })
      })
      .catch((error) => {
        setZapState({
          zapErrorMessage: error.message,
          txHash: undefined,
        })
      })
  }, [zapCallback])

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.INPUT, Field.OUTPUT].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field]),
    }
  }, {})

  const currencies = {
    [Field.INPUT]: inputCurrency,
    [Field.OUTPUT]: OUTPUT,
  }

  const handleDismissConfirmation = useCallback(() => {
    // clear zapState if user close the error modal
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
  }, [setZapState])

  const handleInputSelect = useCallback(
    (field: Field, currency: Currency) => {
      dispatch(
        selectInputCurrency({
          currencyId: currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : '',
        }),
      )
    },
    [dispatch],
  )

  const handleOutputSelect = useCallback(
    (farm: ParsedFarm) => {
      dispatch(selectLP({ outPut: farm }))
    },
    [dispatch],
  )

  const onUserInputCallback = useCallback(
    (field, typedValue) => {
      onUserInput(field, typedValue)
    },
    [onUserInput],
  )

  const handleMaxInput = useCallback(
    (field: Field) => {
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [maxAmounts, onUserInput],
  )

  console.log('renderingg')

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        <DexPanel
          value={typedValue}
          panelText="From:"
          currency={inputCurrency}
          otherCurrency={null}
          fieldType={Field.INPUT}
          onCurrencySelect={handleInputSelect}
          onUserInput={onUserInputCallback}
          handleMaxInput={handleMaxInput}
          useZapList
        />
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          {
            // pending import arrow from UI kit once a new version is published
          }
          <ZapArrow />
        </Flex>
        <ZapPanel
          value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0'}
          panelText="To:"
          selectedFarm={OUTPUT}
          fieldType={Field.OUTPUT}
          onLpSelect={handleOutputSelect}
          lpPair={zap.pairOut.pair}
        />
        {typedValue && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zap={zap} />
          </Flex>
        )}
        <ZapLiquidityActions
          currencies={currencies}
          zapInputError={zapInputError}
          zap={zap}
          handleZap={handleZap}
          zapErrorMessage={zapErrorMessage}
          txHash={txHash}
          handleDismissConfirmation={handleDismissConfirmation}
        />
        <Flex sx={{ marginTop: '10px', justifyContent: 'center' }}>
          <Link
            href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity"
            target="_blank"
            textAlign="center"
          >
            <Text size="12px" style={{ lineHeight: '18px', fontWeight: 400, textDecoration: 'underline' }}>
              Learn more{'>'}
            </Text>
          </Link>
        </Flex>
      </Flex>
    </div>
  )
}

export default React.memo(ZapLiquidity)
