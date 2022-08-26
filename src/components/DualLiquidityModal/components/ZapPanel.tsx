/** @jsxImportSource theme-ui */
import React, { useMemo, useState } from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { Input as NumericalInput } from 'components/CurrencyInputPanel/NumericalInput'
import { useTranslation } from 'contexts/Localization'
import LPSelector from './LPSelector'
import { styles } from '../styles'
import { getBalanceNumber } from 'utils/formatBalance'
import { ParsedFarm } from 'state/zap/reducer'
import { Field } from 'state/zap/actions'
import { Pair } from '@ape.swap/sdk'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Spinner } from 'theme-ui'
import BigNumber from 'bignumber.js'

export interface ZapPanelProps {
  value: string
  panelText: string
  selectedFarm: ParsedFarm
  fieldType: Field
  onLpSelect: (farm: ParsedFarm) => void
  lpPair: Pair
}

const ZapPanel: React.FC<ZapPanelProps> = ({ value, selectedFarm, onLpSelect, fieldType, panelText, lpPair }) => {
  const currencyBalance = getBalanceNumber(new BigNumber(selectedFarm?.userBalance))
  const balance = !isNaN(currencyBalance) ? currencyBalance : 0
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const [usdVal, setUsdVal] = useState(null)

  useMemo(async () => {
    setUsdVal(null)
    setUsdVal(await getTokenUsdPrice(chainId, lpPair?.liquidityToken?.address, 18, true))
  }, [chainId, lpPair?.liquidityToken?.address])

  return (
    <Flex sx={styles.dexPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{panelText}</Text>
        <NumericalInput value={value} onUserInput={null} align="left" id="token-amount-input" readOnly />
        <LPSelector selectedFarm={selectedFarm} onLpSelect={onLpSelect} field={fieldType} />
      </Flex>
      <Flex sx={styles.panelBottomContainer}>
        <Flex sx={styles.centered}>
          <Text size="12px" sx={styles.panelBottomText}>
            {!usdVal && (value || value === '.') && value !== '0' && <Spinner width="15px" height="15px" />}
            {usdVal !== null && value !== '0' && usdVal !== 0 && value && `$${(usdVal * parseFloat(value)).toFixed(2)}`}
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
