import React, { useEffect, useState } from 'react'
import { Navbar as UikitMenu } from '@ape.swap/uikit'
import { uauth } from 'utils/web3React'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { CHAIN_ID } from 'config/constants/chains'
import useTheme from 'hooks/useTheme'
import useTopup from 'hooks/useTopup'
import { ContextApi } from 'contexts/Localization/types'
import { useTranslation } from 'contexts/Localization'
import { useProfile, useTokenPrices, useLiveIfoStatus } from 'state/hooks'
import useSelectNetwork from 'hooks/useSelectNetwork'
import track from 'utils/track'
import bscConfig from './chains/bscConfig'
import maticConfig from './chains/maticConfig'
import { languageList } from '../../config/localization/languages'
import ethConfig from './chains/ethConfig'

const Menu = (props) => {
  const { account, chainId } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { switchNetwork } = useSelectNetwork()
  const { isDark, toggleTheme } = useTheme()
  const { tokenPrices } = useTokenPrices()
  const bananaPriceUsd = tokenPrices?.find((token) => token.symbol === 'BANANA')?.price
  const { profile } = useProfile()
  const { t, setLanguage, currentLanguage } = useTranslation()
  const { onTopup } = useTopup()
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
  const { liveIfos } = useLiveIfoStatus()
  const [uDName, setUDName] = useState(null)

  useEffect(() => {
    uauth.uauth
      .user()
      .then((user) => setUDName(user.sub))
      .catch((err) => console.info(err.message))
  }, [])
  console.log('uDName:::', uDName)
  // Doesn't update UDName on first try
  // Have to refresh the page (Fix This)

  return (
    <UikitMenu
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
      runFiat={onTopup}
      track={track}
      liveResult={liveIfos}
      {...props}
    />
  )
}

export default Menu
