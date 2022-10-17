import React, { useCallback, useEffect, useState } from 'react'
import { Flex, Link, Svg, Text } from '@ape.swap/uikit'
import DexPanel from 'views/Dex/components/DexPanel'
import { useCurrency } from 'hooks/Tokens'
import { Currency, CurrencyAmount, Pair, ZapType } from '@ape.swap/sdk'
import maxAmountSpend from 'utils/maxAmountSpend'
import ZapPanel from 'views/Dex/Zap/components/ZapPanel'
import { Field } from 'state/zap/actions'
import { useDerivedZapInfo, useSetZapInputList, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import ZapLiquidityActions from 'views/Dex/Zap/components/ZapLiquidityActions'
import { styles } from './styles'
import { useZapCallback } from 'hooks/useZapCallback'
import DistributionPanel from 'views/Dex/Zap/components/DistributionPanel/DistributionPanel'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Box, Switch } from 'theme-ui'
import store from 'state'
import useTheme from 'hooks/useTheme'
import { wrappedToNative } from '../../utils'

interface ZapLiquidityProps {
  handleConfirmedTx: (hash: string, pairOut: Pair) => void
  poolAddress: string
  pid: number
}

const ZapLiquidity: React.FC<ZapLiquidityProps> = ({ handleConfirmedTx, poolAddress, pid }) => {
  useSetZapInputList()
  const [zapErrorMessage, setZapErrorMessage] = useState<string>(null)
  const [stakeIntoProduct, setStakeIntoProduct] = useState<boolean>(false)
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { isDark } = useTheme()

  const { INPUT, typedValue, recipient, zapType } = useZapState()
  const [zapSlippage] = useUserSlippageTolerance(true)

  const currencyA = INPUT.currencyId

  const inputCurrency = useCurrency(currencyA)

  const { zap, inputError: zapInputError, currencyBalances } = useDerivedZapInfo()
  const { onUserInput, onInputSelect, onCurrencySelection, onSetZapType } = useZapActionHandlers()

  const handleInputSelect = useCallback(
    (field: Field, currency: Currency) => {
      onInputSelect(field, currency)
    },
    [onInputSelect],
  )

  const handleOutputSelect = useCallback(
    (currencyIdA: Currency, currencyIdB: Currency) => {
      onCurrencySelection(Field.OUTPUT, [currencyIdA, currencyIdB])
    },
    [onCurrencySelection],
  )

  const handleZapChange = (newState) => {
    setStakeIntoProduct(newState)
    if (newState) {
      onSetZapType(ZapType.ZAP_MINI_APE)
    } else {
      onSetZapType(ZapType.ZAP)
    }
  }

  const { callback: zapCallback } = useZapCallback(zap, zapType, zapSlippage, recipient, poolAddress, null, pid)

  const handleZap = useCallback(() => {
    setZapErrorMessage(null)
    zapCallback()
      .then((hash) => {
        handleConfirmedTx(hash, zap.pairOut.pair)
      })
      .catch((error) => {
        setZapErrorMessage(error.message)
      })
  }, [handleConfirmedTx, zap.pairOut.pair, zapCallback])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapErrorMessage if user closes the error modal
    setZapErrorMessage(null)
  }, [])

  const handleMaxInput = useCallback(
    (field: Field) => {
      const maxAmounts: { [field in Field]?: CurrencyAmount } = {
        [Field.INPUT]: maxAmountSpend(currencyBalances[Field.INPUT]),
        [Field.OUTPUT]: maxAmountSpend(currencyBalances[Field.OUTPUT]),
      }
      if (maxAmounts) {
        onUserInput(field, maxAmounts[field]?.toExact() ?? '')
      }
    },
    [currencyBalances, onUserInput],
  )

  // reset input value to zero on first render
  useEffect(() => {
    onUserInput(Field.INPUT, '')
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])

  return (
    <div>
      <Flex sx={styles.liquidityContainer}>
        {!!poolAddress && (
          <Flex sx={{ marginBottom: '10px', fontSize: '12px', alignItems: 'center' }}>
            <Text>
              {t('Stake in')}{' '}
              {`${wrappedToNative(zap?.pairOut?.pair?.token0?.getSymbol(chainId)) ?? ''} - ${
                wrappedToNative(zap?.pairOut?.pair?.token1?.getSymbol(chainId)) ?? ''
              }`}
            </Text>
            <Box sx={{ width: '50px', marginLeft: '10px' }}>
              <Switch
                checked={stakeIntoProduct}
                onChange={() => handleZapChange(!stakeIntoProduct)}
                sx={{
                  ...styles.switchStyles,
                  backgroundColor: isDark ? 'rgba(56, 56, 56, 1)' : 'rgba(241, 234, 218, 1)',
                }}
              />
            </Box>
          </Flex>
        )}
        <Flex sx={{ marginTop: '30px' }}>
          <DexPanel
            value={typedValue}
            panelText="From:"
            currency={inputCurrency}
            otherCurrency={null}
            fieldType={Field.INPUT}
            onCurrencySelect={handleInputSelect}
            onUserInput={onUserInput}
            handleMaxInput={handleMaxInput}
            isZapInput
          />
        </Flex>
        <Flex sx={{ margin: '10px', justifyContent: 'center' }}>
          <Svg icon="ZapArrow" />
        </Flex>
        <ZapPanel
          value={zap?.pairOut?.liquidityMinted?.toSignificant(10) || '0.0'}
          onSelect={handleOutputSelect}
          lpPair={zap.pairOut.pair}
        />
        {typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
          <Flex sx={{ marginTop: '40px' }}>
            <DistributionPanel zap={zap} />
          </Flex>
        )}
        <ZapLiquidityActions
          zapInputError={zapInputError}
          zap={zap}
          handleZap={handleZap}
          zapErrorMessage={zapErrorMessage}
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
