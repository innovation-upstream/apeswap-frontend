/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import ZapIcon from 'components/DualAddLiquidity/components/Svg/ZapIcon'
import { textUnderlineHover } from '../../styles'
import { styles } from '../../components/DexNav/styles'
import { LiquidityTypes } from '../index'

interface LiquiditySelectorProps {
  liquidityType: string
  onChangeLiquidityType: (LiquidityTypes) => void
}

const LiquiditySelector: React.FC<LiquiditySelectorProps> = () => {
  const { t } = useTranslation()
  return (
    <Flex
      sx={{
        margin: '15px 0 30px 0',
        justifyContent: 'center',
        fontSize: '14px',
      }}
    >
      <Text sx={{ margin: '0 20px', ...styles.navLink }}>{t('+ Add')}</Text>
      <Flex sx={{ margin: '0 20px', alignItems: 'center', ...styles.navLink }}>
        <ZapIcon style={{ marginRight: '5px' }} />
        <Text>{t('Zap')}</Text>
      </Flex>
      <Flex sx={{ margin: '0 20px', position: 'relative', alignItems: 'center', ...textUnderlineHover }}>
        <Text sx={{ ...styles.navLink }}>{t('Migrate')}</Text>
      </Flex>
    </Flex>
  )
}

export default React.memo(LiquiditySelector)
