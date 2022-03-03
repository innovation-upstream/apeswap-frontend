/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Menu as MenuV2,
  MenuBody,
  MenuItem,
  MenuFooter,
  MenuContext,
  Icon,
  Text,
} from '@innovationupstream/apeswap-uikit'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import { useNetworkChainId, useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'

const Menu = (props) => {
  const router = useRouter()
  const { setActive } = useContext(MenuContext)
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

  useEffect(() => {
    if (!router) return
    router.events.on('routeChangeComplete', (url) => {
      setActive?.(url)
    })
  }, [router, setActive])

  const NextLink: React.FC<{ path: string }> = ({ children, path }) => (
    <Link href={path} passHref>
      <a
        sx={{
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
          },
        }}
      >
        <Text
          sx={{
            color: 'text',
            paddingLeft: '10px',
            fontWeight: '400',
          }}
        >
          {children}
        </Text>
      </a>
    </Link>
  )

  return (
    <MenuV2>
      <MenuBody>
        {currentMenu().map((item: any, index) => (
          <MenuItem hasSubmenu={!!item.subMenu} {...item} key={`${item}-${index + 1}`}>
            {!item.subMenu ? (
              <NextLink path={item.path}>{item.label}</NextLink>
            ) : (
              item.subMenu?.map((link) => (
                <MenuItem isSubmenu {...link}>
                  <NextLink path={link.path}>{link.label}</NextLink>
                </MenuItem>
              ))
            )}
          </MenuItem>
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
  )
}

export default Menu
