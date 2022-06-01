import { Button, Flex, Skeleton, Svg, Text, useModal } from '@ape.swap/uikit'
import { Currency } from '@apeswapfinance/sdk'
import NumericalInput from 'components/LiquidityWidget/CurrencyInput/NumericalInput'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useState, useMemo } from 'react'
import { Field } from 'state/swap/actions'
import { useDerivedSwapInfo } from 'state/swap/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { getCurrencyUsdPrice } from 'utils/getTokenUsdPrice'
import TokenSelector from '../TokenSelector'
import { styles } from './styles'
import { DexPanelProps } from './types'

const DexPanel: React.FC<DexPanelProps> = ({
  value,
  currency,
  onCurrencySelect,
  onUserInput,
  otherCurrency,
  fieldType,
  showCommonBases = false,
}) => {
  const [usdVal, setUsdVal] = useState(null)
  const { chainId, account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const currencyBalance = selectedCurrencyBalance?.toSignificant(6)
  const { t } = useTranslation()

  useMemo(async () => {
    setUsdVal(null)
    setUsdVal(await getCurrencyUsdPrice(chainId, currency))
  }, [chainId, currency])

  return (
    <Flex sx={{ ...styles.dexPanelContainer }}>
      <Flex sx={{ ...styles.panelTopContainer }}>
        {fieldType && (
          <Text sx={{ ...styles.swapDirectionText }}>{fieldType === Field.INPUT ? t('From') : t('To')}</Text>
        )}
        <NumericalInput
          value={value}
          onUserInput={(val) => onUserInput(fieldType, val)}
          align="left"
          id="token-amount-input"
        />
        <TokenSelector
          currency={currency}
          otherCurrency={otherCurrency}
          onCurrencySelect={(selectedCurrency: Currency) => onCurrencySelect(fieldType, selectedCurrency)}
        />
      </Flex>
      <Flex sx={{ ...styles.panelBottomContainer }}>
        <Text size="12px" sx={{ ...styles.panelBottomText }}>
          {usdVal && value && `$${(usdVal * parseFloat(value)).toFixed(2)}`}
        </Text>
        {account && (
          <Flex sx={{ alignItems: 'center' }}>
            <Text size="12px" sx={{ ...styles.panelBottomText }}>
              {t('Balance: %balance%', { balance: currencyBalance || 'loading' })}
            </Text>
            {fieldType === Field.INPUT && parseFloat(currencyBalance) > 0 && (
              <Button sx={{ ...styles.maxButton }} size="sm" onClick={() => onUserInput(fieldType, currencyBalance)}>
                {t('max')}
              </Button>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(DexPanel)
