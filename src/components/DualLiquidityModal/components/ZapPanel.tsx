/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'
import { useTranslation } from 'contexts/Localization'
import React, { useMemo, useState } from 'react'
import { Field as MintField } from 'state/mint/actions'
import LPSelector from './LPSelector'
import { styles } from '../styles'
import { getBalanceNumber } from 'utils/formatBalance'
import { useZapState } from 'state/zap/hooks'
import { ParsedFarm } from '../types'

export interface ZapPanelProps {
  value: string
  panelText: string
  selectedFarm: ParsedFarm
  fieldType?: MintField
  onLpSelect: (farm: ParsedFarm) => void
  handleMaxInput?: (field: any) => void
}

const ZapPanel: React.FC<ZapPanelProps> = ({ value, selectedFarm, onLpSelect, fieldType, panelText }) => {
  const { zapInto } = useZapState()
  const [usdVal, setUsdVal] = useState(null)
  const currencyBalance = getBalanceNumber(selectedFarm?.userData?.tokenBalance)
  const balance = !isNaN(currencyBalance) ? currencyBalance : 0
  const { t } = useTranslation()

  useMemo(async () => {
    if (zapInto) {
      setUsdVal(zapInto.lpValueUsd)
    }
  }, [zapInto])

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{panelText}</Text>
        <NumericalInput value={value} onUserInput={null} align="left" id="token-amount-input" disabled />
        <LPSelector selectedFarm={selectedFarm} onLpSelect={onLpSelect} field={fieldType} />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex sx={styles.centered}>
          <Text size="12px" sx={styles.panelBottomText}>
            {usdVal && value !== '.' && usdVal !== 0 && value && `$${(usdVal * parseFloat(value)).toFixed(2)}`}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center' }}>
          <Text size="12px" sx={styles.panelBottomText}>
            {t('Balance: %balance%', { balance: balance === 0 ? '0' : balance.toFixed(6) })}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(ZapPanel)
