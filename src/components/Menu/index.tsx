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
  IconButton,
  Text,
} from '@innovationupstream/apeswap-uikit'
import { useWeb3React } from '@web3-react/core'
import Cookies from 'universal-cookie'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import { useNetworkChainId, useProfile, useTokenPrices } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import { Flex, Box } from 'theme-ui'
import ConnectButton from 'components/TopMenu_old/ConnectButton'
import BNBButton from 'components/TopMenu_old/BNBButton'
import RightContainer from './components/RightContainer'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'
import { MenuItem as MenuEntry, MenuSubItem, MenuSubItemMobile } from './components'
import GlobalStyle from './style'

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
  const [collapse, setCollapse] = useState(false)
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
    <>
      <GlobalStyle />

      {['desktop_header', 'mobile_header']?.map((row) => (
        <Flex
          className={row === 'mobile_header' ? 'mobile_header' : 'desktop_header'}
          sx={
            row === 'desktop_header'
              ? {
                  color: 'text',
                  backgroundColor: 'primaryDark',
                  position: 'relative',
                  zIndex: 101,
                  alignItems: 'center',
                  flexShrink: 0,
                  height: '60px',
                }
              : {
                  backgroundColor: 'primaryDark',
                  position: 'relative',
                  alignItems: 'center',
                  flexShrink: 0,
                  height: '60px',
                  display: 'none',
                }
          }
        >
          <Box className={row === 'mobile_header' ? 'moble_div1' : ''} sx={{ paddingLeft: '20px' }}>
            <Svg icon="logo" />
          </Box>
          <Box
            className={row === 'mobile_header' ? 'moble_div2' : ''}
            sx={{
              display: 'flex',
            }}
            backgroundColor="black"
          >
            {currentMenu().map((item: any, index) => (
              <MenuItem key={`${item.label}-${index + 1}`}>
                {(() => {
                  if (row === String('desktop_header')) {
                    return !item.items ? (
                      <MenuEntry label={item.label} icon={item.icon} href={item.href} />
                    ) : (
                      <MenuSubItem items={item.items} label={item.label} icon={item.icon} />
                    )
                  }

                  if (row === 'mobile_header' && collapse) {
                    return !item.items ? (
                      <MenuEntry label={item.label} icon={item.icon} href={item.href} />
                    ) : (
                      <MenuSubItemMobile
                        items={item.items}
                        label={item.label}
                        icon={item.icon}
                        setCollapse={setCollapse}
                        collapseData={collapse}
                      />
                    )
                  }
                  return null
                })()}
              </MenuItem>
            ))}

            {row === 'mobile_header' && collapse && (
              <Box sx={{ position: 'absolute', right: '23px', bottom: '20px' }}>
                <IconButton
                  variant="primary"
                  icon="twitter"
                  color="info"
                  sx={{ padding: '8px', margin: '0 5px' }}
                  background="navMenuLogo"
                />
                <IconButton
                  variant="primary"
                  icon="send"
                  color="info"
                  sx={{ padding: '8px', margin: '0 5px' }}
                  background="navMenuLogo"
                />
                <IconButton
                  variant="primary"
                  icon="discord"
                  color="info"
                  sx={{ padding: '6px 8px', margin: '0 5px' }}
                  background="navMenuLogo"
                />
                <BNBButton />
              </Box>
            )}
          </Box>

          <Box
            className="header_first"
            sx={
              row === 'desktop_header'
                ? {
                    marginLeft: 'auto',
                  }
                : {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                    gap: [4, 8],
                    position: 'absolute',
                    right: 0,
                    paddingRight: '20px',
                    '>*:empty': {
                      display: 'none',
                    },

                    '> button:nth-last-child(2)': {
                      border: 0,
                      zIndex: 9,
                    },
                  }
            }
          >
            <RightContainer />
            {row === 'mobile_header' && (
              <>
                <IconButton
                  variant="transparent"
                  className="testttt"
                  onClick={() => setCollapse(!collapse)}
                  icon={collapse ? 'close' : 'hamburger'}
                  color="info"
                  sx={{
                    width: '24',
                    display: 'none',
                  }}
                />
              </>
            )}
          </Box>
        </Flex>
      ))}
    </>
  )
}

export default Menu
