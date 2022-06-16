/** @jsxImportSource theme-ui */
import { Link, useLocation } from 'react-router-dom'
import { Card, CardIcon, CogIcon, Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import { Currency } from '@apeswapfinance/sdk'
import NumericalInput from 'components/LiquidityWidget/CurrencyInput/NumericalInput'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useState } from 'react'
import TokenSelector from '../TokenSelector'
import SettingsModal from '../../../../components/Menu/GlobalSettings/SettingsModal'
import { styles } from './styles'

const DexNav: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  const onLiquidity = pathname?.includes('add') || pathname?.includes('pool') || pathname?.includes('remove')
  const [onPresentSettingsModal] = useModal(<SettingsModal />)

  return (
    <Flex sx={{ ...styles.dexNavContainer }}>
      <Flex sx={{ ...styles.navLinkContainer }}>
        <Text size="14px" sx={{ ...styles.navLink, opacity: !pathname?.includes('swap') && 0.5 }} as={Link} to="/swap">
          {t('Swap')}
        </Text>
        <Text
          size="14px"
          sx={{ ...styles.navLink, opacity: !pathname?.includes('orders') && 0.5 }}
          as={Link}
          to="/orders"
        >
          {t('Orders')}
        </Text>
        <Text size="14px" sx={{ ...styles.navLink, opacity: !onLiquidity && 0.5 }} as={Link} to="/add">
          {t('Liquidity')}
        </Text>
      </Flex>
      <Flex sx={{ ...styles.navIconContainer }}>
        {/* <CardIcon sx={{cursor: 'pointer'}}/> */}
        <CogIcon sx={{ cursor: 'pointer' }} onClick={onPresentSettingsModal} />
      </Flex>
    </Flex>
  )
}

export default React.memo(DexNav)
