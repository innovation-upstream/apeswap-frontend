import React, { useCallback, useState } from 'react'
import { Flex, Link, Text } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { useAppDispatch } from 'state'
import { useCurrency } from 'hooks/Tokens'
import { Currency, ETHER, Token, TokenAmount } from '@ape.swap/sdk'
import maxAmountSpend from 'utils/maxAmountSpend'
import ZapPanel from './components/ZapPanel'
import { Field, selectInputCurrency, selectLP } from 'state/zap/actions'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import ZapArrow from './components/Svg/ZapArrow'
import ZapLiquidityActions from './components/ZapLiquidityActions'
import { styles } from './styles'
import { ParsedFarm } from '../../state/zap/reducer'
import { useZapCallback } from '../../hooks/useZapCallback'

const ZapLiquidity = () => {
  const [{ zapErrorMessage, txHash }, setZapState] = useState<{
    zapErrorMessage: string | undefined
    txHash: string | undefined
  }>({
    zapErrorMessage: undefined,
    txHash: undefined,
  })
  const dispatch = useAppDispatch()
  const { INPUT, OUTPUT, typedValue, recipient, zapType, zapSlippage } = useZapState()
  const inputCurrency = useCurrency(INPUT?.currencyId)

  const { zap, inputError: zapInputError, currencyBalances } = useDerivedZapInfo()
  const { onUserInput } = useZapActionHandlers()

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

  const handleCurrencyBSelect = useCallback(
    (farm: ParsedFarm) => {
      dispatch(selectLP({ outPut: farm }))
    },
    [dispatch],
  )

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

  // re evaluate tokens pricing after hooks and state are finilized
  /* useMemo(async () => {
    console.log('calculating prices')
    const priceA = await getCurrencyUsdPrice(chainId, currencyA)
    const priceB = currencyB.lpValueUsd
    setPrices({ [Field.CURRENCY_A]: priceA, [Field.CURRENCY_B]: parseFloat(priceB) })
  }, [chainId, currencyA, currencyB]) */

  // mint state
  // const { parsedAmounts, currencyBalances, zapInsight, error } = useDerivedMintForZap(currencyA, currencyB, null)

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.INPUT, Field.OUTPUT].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field]),
    }
  }, {})

  const handleMaxInput = useCallback(
    (field: Field) => {
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [maxAmounts, onUserInput],
  )

  const currencies = {
    [Field.INPUT]: inputCurrency,
    [Field.OUTPUT]: OUTPUT,
  }

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    setZapState({
      zapErrorMessage: undefined,
      txHash: undefined,
    })
  }, [setZapState])

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
          onUserInput={onUserInput}
          handleMaxInput={handleMaxInput}
          useZapList
        />
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          {
            // move this arrow to the UI Kit
          }
          <ZapArrow />
        </Flex>
        <ZapPanel
          value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0'}
          panelText="To:"
          selectedFarm={OUTPUT}
          fieldType={Field.OUTPUT}
          onLpSelect={handleCurrencyBSelect}
          handleMaxInput={null}
        />
        {
          /*
        { typedValue && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zapInsight={zapInsight} />
          </Flex>
        )} */
          <ZapLiquidityActions
            currencies={currencies}
            zapInputError={zapInputError}
            zap={zap}
            handleZap={handleZap}
            zapErrorMessage={zapErrorMessage}
            txHash={txHash}
            handleDismissConfirmation={handleDismissConfirmation}
          />
        }
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
