/** @jsxImportSource theme-ui */
import React from 'react'
import { TutorialModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import {
  SwapSlides,
  FarmSlides,
  PoolSlides,
  MaximizerSlides,
  GnanaSlides,
  BillsSlides,
  IAOSlides,
  OrdersSlides,
  LiquiditySlides,
  ConnectWalletSlide,
  MigrateSlides,
} from './TutorialSlides'

const Tutorial: React.FC<{
  location: string
  onDismiss: () => void
}> = ({ location, onDismiss }) => {
  const { t } = useTranslation()
  const { chainId, account } = useActiveWeb3React()
  const networkLabel = NETWORK_LABEL[chainId]

  const getSlidesContent = () => {
    if (location === '/swap')
      return {
        type: `${networkLabel}-dex`,
        title: "Welcome to ApeSwap's Dex",
        description: `Easily trade ANY token on ${networkLabel} Chain!`,
        slides: account ? SwapSlides() : [ConnectWalletSlide(), ...SwapSlides()],
      }
    if (location === '/farms')
      return {
        type: `${networkLabel}-farms`,
        title: `Welcome to ${networkLabel === 'BNB' ? 'BANANA' : networkLabel} Farms`,
        description: `Earn BANANA by staking liquidity provider (LP) tokens!`,
        slides: account ? FarmSlides() : [ConnectWalletSlide(), ...FarmSlides()],
      }
    if (location === '/jungle-farms')
      return {
        type: `jungle-farms`,
        title: `Welcome to Jungle Farms`,
        description: `Earn Partner Tokens by Staking Liquidity!`,
        slides: account ? FarmSlides() : [ConnectWalletSlide(), ...FarmSlides()],
      }
    if (location === '/pools')
      return {
        type: 'pools',
        title: 'Welcome to Staking Pools',
        description: 'Earn tokens by staking BANANA or GNANA!',
        slides: account ? PoolSlides() : [ConnectWalletSlide(), ...PoolSlides()],
      }
    if (location === '/maximizers')
      return {
        type: 'maximizers',
        title: 'Welcome to Banana Maximizers',
        description: 'Maximize your BANANA yields!',
        slides: account ? MaximizerSlides() : [ConnectWalletSlide(), ...MaximizerSlides()],
      }
    if (location === '/gnana')
      return {
        type: 'gnana',
        title: 'Welcome to Golden Banana',
        description: 'Unlock the exclusive benefits of GNANA!',
        slides: account ? GnanaSlides() : [ConnectWalletSlide(), ...GnanaSlides()],
      }
    if (location === '/treasury-bills')
      return {
        type: 'treasury-bills',
        title: 'Welcome to Treasury Bills',
        description: 'Buy tokens at a discount and obtain a unique NFT!',
        slides: account ? BillsSlides() : [ConnectWalletSlide(), ...BillsSlides()],
      }
    if (location === '/iao')
      return {
        type: 'iao',
        title: 'Welcome to Initial Ape Offerings',
        description: 'Contribute BNB or GNANA to obtain newly launched tokens!',
        slides: account ? IAOSlides() : [ConnectWalletSlide(), ...IAOSlides()],
      }
    if (location === '/limit-orders')
      return {
        type: 'orders',
        title: 'Welcome to Limit Orders',
        description: 'Trade at the price you want!',
        slides: account ? OrdersSlides() : [ConnectWalletSlide(), ...OrdersSlides()],
      }
    if (location === '/migrate')
      return {
        type: 'migrate',
        title: 'Welcome to Liquidity Migration',
        description: 'Migrate your liquidity from external DEXs into ApeSwap',
        slides: account ? OrdersSlides() : [ConnectWalletSlide(), ...MigrateSlides()],
      }
    return {
      type: 'liquidity',
      title: 'Welcome Dex Liquidity',
      description: 'Provide liquidity to earn trading fees!',
      slides: account ? LiquiditySlides() : [ConnectWalletSlide(), ...LiquiditySlides()],
    }
  }

  const tutorials = getSlidesContent()

  return (
    <TutorialModal
      type={tutorials?.type}
      title={tutorials?.title}
      description={tutorials?.description}
      t={t}
      onDismiss={onDismiss}
      readyText={t("I'm Ready")}
      isConnected={!!account}
    >
      {tutorials?.slides}
    </TutorialModal>
  )
}

export default Tutorial
