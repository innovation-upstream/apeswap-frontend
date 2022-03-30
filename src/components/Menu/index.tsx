/** @jsxImportSource theme-ui */
import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Menu as MenuV2,
  MenuBody,
  MenuItem,
  MenuFooter,
  MenuContext,
  Svg,
  Text,
} from '@innovationupstream/apeswap-uikit'
import { useWeb3React } from '@web3-react/core'
import Cookies from 'universal-cookie'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import { useNetworkChainId, useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import track from 'utils/track'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'
import { MenuItem as MenuEntry, MenuSubItem } from './components'

const isBrowser = typeof window === 'object'

const Menu: React.FC<{ chain?: number }> = ({ chain }) => {
  const router = useRouter()
  const { setActive } = useContext(MenuContext)
  const [chainId, setChainId] = useState(chain)
  const { account } = useWeb3React()
  const networkChain = useNetworkChainId()
  const { login, logout } = useAuth()
  const { switchNetwork } = useSelectNetwork()
  const { isDark, toggleTheme } = useTheme()
  const { tokenPrices } = useTokenPrices()
  const bananaPriceUsd = tokenPrices?.find((token) => token.symbol === 'BANANA')?.price
  const { profile } = useProfile()
  const currentMenu = () => {
    if (chainId === CHAIN_ID.BSC) {
      return bscConfig
    }
    if (chainId === CHAIN_ID.MATIC) {
      return maticConfig
    }
    return bscConfig
  }

  useEffect(() => {
    if (isBrowser) {
      const cookies = new Cookies()
      if (account) cookies.set('account', account)
      else cookies.remove('account')
    }
  }, [account])

  useEffect(() => {
    if (networkChain) {
      setChainId(networkChain)
    }
  }, [networkChain])

  useEffect(() => {
    if (!router) return
    const handleChange = (url) => setActive?.(url)
    router.events.on('routeChangeComplete', handleChange)

    // eslint-disable-next-line consistent-return
    return () => router.events.off('routeChangeComplete', handleChange)
  }, [router, setActive])

  return (
    <MenuV2>
      <MenuBody>
        {currentMenu().map((item: any, index) => (
          <MenuItem key={`${item.label}-${index + 1}`}>
            {!item.items ? (
              <MenuEntry label={item.label} icon={item.icon} href={item.href} />
            ) : (
              <MenuSubItem items={item.items} label={item.label} icon={item.icon} />
            )}
          </MenuItem>
        ))}
      </MenuBody>

      <MenuFooter>
        <div sx={{ display: 'flex', justifyContent: 'space-between', ml: '19px', mr: '26px', mb: '70px' }}>
          <div sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
            <Svg icon="ellipse" />
            <Text sx={{ color: 'brown', fontSize: '14px' }} weight="bold">
              $3.747
            </Text>
          </div>
          <Svg icon="ellipse" />
          <Svg icon="ellipse" />
        </div>
      </MenuFooter>
    </MenuV2>
  )
}

export default Menu
