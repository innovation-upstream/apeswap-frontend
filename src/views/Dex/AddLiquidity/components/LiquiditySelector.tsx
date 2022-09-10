/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg, Text, ZapIcon } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { LiquidityTypes } from '../index'
import { StyledTag, styles } from './styles'

interface LiquiditySelectorProps {
  liquidityType: string
  onChangeLiquidityType: (LiquidityTypes) => void
}

const LiquiditySelector: React.FC<LiquiditySelectorProps> = ({ liquidityType, onChangeLiquidityType }) => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.liquiditySelectorContainer}>
      <Text
        sx={{
          ...styles.liquiditySelector,
          color: liquidityType !== LiquidityTypes.ADD ? 'textDisabled' : null,
        }}
        onClick={() => onChangeLiquidityType(LiquidityTypes.ADD)}
      >
        {t('+ Add')}
      </Text>
      <Flex
        sx={{
          ...styles.liquiditySelector,
          color: liquidityType !== LiquidityTypes.ZAP ? 'textDisabled' : null,
        }}
        onClick={() => onChangeLiquidityType(LiquidityTypes.ZAP)}
      >
        <Flex sx={{ marginRight: '5px' }}>
          <Svg color={liquidityType !== LiquidityTypes.ZAP ? 'textDisabled' : 'text'} icon={'ZapIcon'} />
        </Flex>
        <Text>{t('Zap')}</Text>
      </Flex>
      <Flex sx={{ margin: '0 20px', position: 'relative', alignItems: 'center', color: 'textDisabled' }}>
        <Text>{t('Migrate')} </Text>
        <StyledTag variant={'binance'}> {t('Soon')} </StyledTag>
      </Flex>
    </Flex>
  )
}

export default React.memo(LiquiditySelector)
