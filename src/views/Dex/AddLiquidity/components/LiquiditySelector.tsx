/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { Box } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import ZapIcon from 'components/DualAddLiquidity/components/Svg/ZapIcon'

const LiquiditySelector = () => {
  const { t } = useTranslation()
  return (
    <Flex sx={{ margin: '15px 0 30px 0', justifyContent: 'center' }}>
      <Text sx={{ margin: '0 20px' }}>{t('+ Add')}</Text>
      <Box sx={{ margin: '0 20px' }}>
        <ZapIcon style={{ marginRight: '5px' }} />
        <Text>{t('Zap')}</Text>
      </Box>
      <Box sx={{ margin: '0 20px' }}>{t('Migrate')}</Box>
    </Flex>
  )
}

export default React.memo(LiquiditySelector)
