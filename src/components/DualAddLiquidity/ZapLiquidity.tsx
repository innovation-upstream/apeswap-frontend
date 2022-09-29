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
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { useTranslation } from '../../contexts/Localization'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { Box, Switch } from 'theme-ui'
import store from '../../state'

interface ZapLiquidityProps {
  handleConfirmedTx: (hash: string, pairOut: Pair) => void
  showStakeOption?: boolean
}

const ZapLiquidity: React.FC<ZapLiquidityProps> = ({ handleConfirmedTx, showStakeOption }) => {
  useSetZapInputList()
  const [zapErrorMessage, setZapErrorMessage] = useState<string>(null)
  const [stakeIntoProduct, setStakeIntoProduct] = useState<boolean>(false)
  const [poolAddress, setPoolAddress] = useState('')
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const [localZapType, setLocalZapType] = useState<ZapType>(ZapType.ZAP)

  const { INPUT, typedValue, recipient, zapType } = useZapState()
  const [zapSlippage] = useUserSlippageTolerance(true)

  const currencyA = INPUT.currencyId

  const inputCurrency = useCurrency(currencyA)

  const { zap, inputError: zapInputError, currencyBalances } = useDerivedZapInfo()
  const { onUserInput, onInputSelect, onCurrencySelection } = useZapActionHandlers()

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
    const jungleFarmAddress = store
      .getState()
      .jungleFarms.data.find(
        (jungleFarm) =>
          jungleFarm?.stakingToken?.address[chainId]?.toLowerCase() ===
          zap?.pairOut?.pair?.liquidityToken?.address?.toLowerCase(),
      )?.contractAddress[chainId]
    setStakeIntoProduct(newState)
    if (newState) {
      setLocalZapType(ZapType.ZAP_LP_POOL)
      setPoolAddress(jungleFarmAddress)
    } else {
      setLocalZapType(ZapType.ZAP)
      setPoolAddress('')
    }
  }

  const { callback: zapCallback } = useZapCallback(zap, localZapType, zapSlippage, recipient, poolAddress, null)

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
        {showStakeOption && (
          <Flex sx={{ marginBottom: '12px', fontSize: '12px', alignItems: 'center' }}>
            <Text>
              {t('Stake in')}{' '}
              {`${zap?.pairOut?.pair?.token0?.getSymbol(chainId)} - ${zap?.pairOut?.pair?.token1?.getSymbol(chainId)}`}
            </Text>
            <Box sx={{ width: '50px', marginLeft: '10px' }}>
              <Switch
                checked={stakeIntoProduct}
                onChange={() => handleZapChange(!stakeIntoProduct)}
                sx={styles.switchStyles}
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
