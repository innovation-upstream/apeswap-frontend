import { Link } from 'react-router-dom'
import { Card, CardIcon, CogIcon, Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import { Currency } from '@apeswapfinance/sdk'
import NumericalInput from 'components/LiquidityWidget/CurrencyInput/NumericalInput'
import { CurrencyLogo } from 'components/Logo'
import CurrencySearchModal from 'components/SearchModal/CurrencySearchModal'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useState } from 'react'
import TokenSelector from '../TokenSelector'
import { styles } from './styles'

const DexNav: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ ...styles.dexNavContainer }}>
      <Flex sx={{ ...styles.navLinkContainer }}>
        <Text size="14px" sx={{ ...styles.navLink }}>
          <Link to="/swap">{t('Swap')}</Link>
        </Text>
        <Text size="14px" sx={{ ...styles.navLink }}>
          {t('Orders')}
        </Text>
        <Text size="14px" sx={{ ...styles.navLink }}>
          <Link to="/add">{t('Liquidity')}</Link>
        </Text>
      </Flex>
      <Flex sx={{ ...styles.navIconContainer }}>
        <CardIcon />
        <CogIcon />
      </Flex>
    </Flex>
  )
}

export default React.memo(DexNav)
