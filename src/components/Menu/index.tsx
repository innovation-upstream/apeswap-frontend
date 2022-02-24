/** @jsxImportSource theme-ui */
import React from 'react'
import { Menu as MenuV2, MenuContextProvider, MenuBody, MenuFooter, MenuLink, Text, Icon } from '@isioma/uikit'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import { useNetworkChainId, useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'

const Menu = (props) => {
  const { account } = useWeb3React()
  const chainId = useNetworkChainId()
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

  return (
    <MenuContextProvider>
      <MenuV2>
        <MenuBody>
          {currentMenu().map((item, index) => (
            <MenuLink item={item} key={`${item}-${index + 1}`} />
          ))}
        </MenuBody>

        <MenuFooter>
          <div sx={{ display: 'flex', justifyContent: 'space-between', ml: '19px', mr: '26px', mb: '70px' }}>
            <div sx={{ display: 'flex', alignItems: 'center', columnGap: '8px' }}>
              <Icon icon="ellipse" />
              <Text sx={{ color: 'brown', fontSize: '14px' }} weight="bold">
                $3.747
              </Text>
            </div>
            <Icon icon="ellipse" />
            <Icon icon="ellipse" />
          </div>
        </MenuFooter>
      </MenuV2>
    </MenuContextProvider>
  )
}

export default Menu
