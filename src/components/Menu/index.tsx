/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { NavLink, Flex, Box } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
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

const menuItemContainer = {
  alignItems: 'center',
  height: '48px',
  pl: '17px',
  pr: '20px',
  flexShrink: 0,
  boxShadow: 'none',
  fontSize: '16px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'white4',
  },
} as any

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
}

const NextLink: React.FC<{ path: string }> = ({ children, path }) => (
  <Link href={path} passHref>
    <a>
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

const MenuComponent = ({ icon, label, path }) => {
  const { active } = useContext(MenuContext)

  return (
    <Flex
      sx={{
        ...menuItemContainer,
        boxShadow: path === active ? 'rgb(175, 110, 90) 4px 0px 0px inset' : '',
      }}
    >
      <Flex sx={linkStyle}>
        <Flex sx={{ alignItems: 'center' }}>
          <Flex sx={{ flexShrink: 0 }}>{typeof icon === 'string' ? <Icon width={24} icon={icon as any} /> : icon}</Flex>
          <Flex sx={{ flexShrink: 0, marginLeft: '10px' }}>
            <NextLink path={path}>{label}</NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

const Submenu = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false)
  const { active, collapse } = useContext(MenuContext)

  return (
    <>
      <Flex
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          ...menuItemContainer,
        }}
      >
        <Flex sx={linkStyle}>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex sx={{ flexShrink: 0 }}>
              {typeof icon === 'string' ? <Icon width={24} icon={icon as any} /> : icon}
            </Flex>
            <Flex sx={{ flexShrink: 0, marginLeft: '10px' }}>
              <Text
                sx={{
                  color: 'text',
                  paddingLeft: '10px',
                  fontWeight: '400',
                }}
              >
                {label}
              </Text>
            </Flex>
          </Flex>
          <Box sx={{ display: collapse ? 'none' : null }}>
            <Icon icon="caret" direction={open ? 'up' : 'down'} />
          </Box>
        </Flex>
      </Flex>
      <AnimatePresence>
        {!collapse && open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ height: { duration: 0.3 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden' }}
          >
            {items?.map((link, index) => (
              <Flex
                sx={{
                  ...menuItemContainer,
                  position: 'relative',
                  boxShadow: link.path === active ? 'rgb(175, 110, 90) 4px 0px 0px inset' : '',
                }}
              >
                <Flex key={`${link.label}-${index + 1}`} sx={linkStyle}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex sx={{ flexShrink: 0, marginLeft: '10px' }}>
                      <NextLink path={link.path}>{link.label}</NextLink>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

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

  return (
    <MenuV2>
      <MenuBody>
        {currentMenu().map((item: any, index) => (
          <MenuItem key={`${item}-${index + 1}`}>
            {!item.subMenu ? (
              <MenuComponent label={item.label} icon={item.icon} path={item.path} />
            ) : (
              <Submenu items={item.subMenu} label={item.label} icon={item.icon} />
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
