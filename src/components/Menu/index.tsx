/** @jsxImportSource theme-ui */
import React, { useEffect, useContext, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import throttle from 'lodash/throttle'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import { MenuContext } from '@innovationupstream/apeswap-uikit'
import { Svg, IconButton } from '@ape.swap/uikit'
import Link from 'next/link'
import { useWeb3React } from '@web3-react/core'
import Cookies from 'universal-cookie'
import { CHAIN_ID } from 'config/constants/chains'
import { Flex, Box } from 'theme-ui'
import { SSRContext } from 'contexts/SSRContext'
import { useTranslation } from 'contexts/Localization'
import { ContextApi } from 'contexts/Localization/types'
import { useNetworkChainId } from 'state/hooks'
import { NetworkButton } from 'components/NetworkButton'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'
import { DesktopMenu, MobileMenu } from './components'
import ConnectButton from './components/ConnectButton'
import ethConfig from './chains/ethConfig'
import { styles, dynamicStyles } from './styles'

const Menu: React.FC<{ chain?: number }> = () => {
  const router = useRouter()
  const refPrevOffset = useRef(null)
  const [showMenu, setShowMenu] = useState(true)
  const { setActive, collapse, setCollapse } = useContext(MenuContext)
  const { account } = useWeb3React()
  const chainId = useNetworkChainId()
  const { isDesktop, isBrowser } = useContext(SSRContext)
  const { isXxl } = useMatchBreakpoints()
  const isMobile = isBrowser ? isXxl === false : !isDesktop
  const { t } = useTranslation()

  const currentMenu = (translate: ContextApi['t']) => {
    if (chainId === CHAIN_ID.BSC) {
      return bscConfig(translate)
    }
    if (chainId === CHAIN_ID.MATIC) {
      return maticConfig(translate)
    }
    if (chainId === CHAIN_ID.ETH) {
      return ethConfig(translate)
    }
    return bscConfig(translate)
  }

  useEffect(() => {
    refPrevOffset.current = window.pageYOffset
  }, [])

  useEffect(() => {
    if (isBrowser) {
      const cookies = new Cookies()
      if (account) cookies.set('account', account)
      else cookies.remove('account')
    }
  }, [account, isBrowser])

  useEffect(() => {
    if (!router) return
    const handleChange = (url) => {
      setActive?.(url)
      setCollapse(true)
    }
    router.events.on('routeChangeComplete', handleChange)

    // eslint-disable-next-line consistent-return
    return () => router.events.off('routeChangeComplete', handleChange)
  }, [router, setActive, setCollapse])

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight
      const isTopOfPage = currentOffset === 0
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true)
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true)
        } else {
          // Has scroll down
          setShowMenu(false)
        }
      }
      refPrevOffset.current = currentOffset
    }
    const throttledHandleScroll = throttle(handleScroll, 200)

    window.addEventListener('scroll', throttledHandleScroll)
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  const menuStyle = dynamicStyles.userBlockBtn({ showMenu })

  return (
    <>
      <Box sx={menuStyle}>
        <Flex sx={styles.headerSetting}>
          <Flex sx={{ columnGap: '40px', height: '100%' }}>
            <Link href="/">
              <IconButton variant="transparent" icon="logo" sx={styles.apeLogoHeader} />
            </Link>
            {!isMobile && <DesktopMenu items={currentMenu(t) as any} />}
          </Flex>
          <Flex sx={{ alignItems: 'center', columnGap: 5, height: '100%' }}>
            {!isMobile && <NetworkButton />}
            <ConnectButton />
            {isMobile && (
              <Box sx={{ paddingY: '10px' }}>
                <IconButton color="text" variant="transparent" onClick={() => setCollapse(!collapse)}>
                  <Svg icon={collapse ? 'hamburger' : 'close'} width={collapse ? 35 : 20} />
                </IconButton>
              </Box>
            )}
          </Flex>
        </Flex>
        {isMobile && <MobileMenu items={currentMenu(t) as any} />}
      </Box>
      {!collapse && <Box onClick={() => setCollapse(true)} sx={styles.overlay} />}
    </>
  )
}

export default Menu
