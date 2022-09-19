import React, { useEffect, useState, useCallback } from 'react'
import { Navbar as UikitMenu, useModal } from '@ape.swap/uikit'
import { ChainId } from '@ape.swap/sdk'
import { uauth } from 'utils/web3React'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import useAuth from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import { ContextApi } from 'contexts/Localization/types'
import { useBananaPrice } from 'state/tokenPrices/hooks'
import { useTranslation } from 'contexts/Localization'
import { useProfile, useLiveIfoStatus } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import track from 'utils/track'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'
import { languageList } from '../../config/localization/languages'
import ethConfig from './chains/ethConfig'
import iframeConfig from './chains/iframeConfig'
import MoonPayModal from '../../views/Topup/MoonpayModal'
import { getSidContract } from 'utils'

const Menu = (props) => {
  let isIframe = false
  try {
    isIframe = window.self !== window.top
  } catch (e) {
    console.error(e)
  }
  const { account, chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { switchNetwork } = useSelectNetwork()
  const { isDark, toggleTheme } = useTheme()
  const { profile } = useProfile()
  const { t, setLanguage, currentLanguage } = useTranslation()
  const { liveIfos } = useLiveIfoStatus()
  const { fastRefresh } = useRefresh()
  const [uDName, setUDName] = useState(null)

  const bananaPriceUsd = useBananaPrice()
  const [onPresentModal] = useModal(<MoonPayModal />)
  const currentMenu = (translate: ContextApi['t']) => {
    if (chainId === ChainId.BSC && isIframe !== true) {
      return bscConfig(translate)
    }
    if (chainId === ChainId.MATIC && isIframe !== true) {
      return maticConfig(translate)
    }
    if (chainId === ChainId.MAINNET && isIframe !== true) {
      return ethConfig(translate)
    }
    if (isIframe === true) {
      return iframeConfig(translate)
    }
    return bscConfig(translate)
  }

  // SID TESTING
  const [sidOwner, setSidOwner] = useState(null)
  const getSidOwner = useCallback(async () => {
    const domain = 'bbdrape.bnb'
    const sid = await getSidContract(chainId)
    const address = await sid.name(domain).getAddress()
    const name = await sid.getName(address)
    setSidOwner({ name, address })
  }, [chainId])
  console.log('sidOwner:::', sidOwner)

  useEffect(() => {
    getSidOwner()
    uauth.uauth
      .user()
      .then((user) => setUDName(user.sub))
      .catch(() => null)
  }, [fastRefresh, getSidOwner])

  return (
    <UikitMenu
      // sidName={sidName}
      uDName={uDName}
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      bananaPriceUsd={bananaPriceUsd}
      t={t}
      langs={languageList}
      setLang={setLanguage}
      currentLang={currentLanguage.language}
      links={currentMenu(t)}
      chainId={chainId}
      switchNetwork={switchNetwork}
      profile={{
        image: profile ? profile?.rarestNft.image : null,
        noProfileLink: '/nft',
        profileLink: '',
      }}
      runFiat={onPresentModal}
      track={track}
      liveResult={liveIfos}
      iframe={isIframe}
      {...props}
    />
  )
}

export default Menu
