/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, Box } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
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

const NextLink: React.FC<{ href: string; csx?: any }> = ({ children, href, csx = {} }) => (
  <Link href={href} passHref>
    <a>
      <Text
        sx={{
          color: 'text',
          paddingLeft: '16px',
          fontWeight: '400',
          fontSize: 2,
          ...csx,
        }}
      >
        {children}
      </Text>
    </a>
  </Link>
)

const MenuComponent = ({ icon, label, href }) => {
  const { active } = useContext(MenuContext)

  return (
    <Flex
      sx={{
        ...menuItemContainer,
        borderColor: 'text',
        paddingLeft: href === active ? '13px' : undefined,
        borderLeft: href === active ? '4px solid' : '',
      }}
    >
      <Flex sx={linkStyle}>
        <Flex sx={{ alignItems: 'center' }}>
          <Flex sx={{ flexShrink: 0 }}>{typeof icon === 'string' ? <Svg width={24} icon={icon as any} /> : icon}</Flex>
          <Flex sx={{ flexShrink: 0 }}>
            <NextLink href={href}>{label}</NextLink>
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
              {typeof icon === 'string' ? <Svg width={24} icon={icon as any} /> : icon}
            </Flex>
            <Flex sx={{ flexShrink: 0, marginLeft: '16px' }}>
              <Text
                sx={{
                  color: 'text',
                  fontWeight: '400',
                  fontSize: 2,
                }}
              >
                {label}
              </Text>
            </Flex>
          </Flex>
          <Box sx={{ display: collapse ? 'none' : null }}>
            <Svg icon="caret" width={7} direction={open ? 'up' : 'down'} />
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
            sx={{ overflow: 'hidden', background: 'body' }}
          >
            {items?.map((link, index) => (
              <Flex
                key={`${link.label}-${index + 1}`}
                sx={{
                  ...menuItemContainer,
                  position: 'relative',
                  borderColor: 'text',
                  paddingLeft: link.href === active ? '13px' : undefined,
                  borderLeft: link.href === active ? '4px solid' : '',
                }}
              >
                <Flex key={`${link.label}-${index + 1}`} sx={linkStyle}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex sx={{ flexShrink: 0, marginLeft: '10px' }}>
                      <NextLink href={link.href} csx={{ fontSize: 1 }}>
                        {link.label}
                      </NextLink>
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
              <MenuComponent label={item.label} icon={item.icon} href={item.href} />
            ) : (
              <Submenu items={item.items} label={item.label} icon={item.icon} />
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
