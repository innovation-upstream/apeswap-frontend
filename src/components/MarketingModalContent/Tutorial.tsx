/** @jsxImportSource theme-ui */
import React from 'react'
import { TutorialModal } from '@ape.swap/uikit'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NETWORK_LABEL } from 'config/constants/chains'
import { Product } from './slides'
import { useTranslation } from 'contexts/Localization'
import { DexSlides } from './Dex'
import { FarmSlides } from './Farm'
import { PoolSlides } from './Pool'
import { MaximizerSlides } from './Maximizers'
import { GnanaSlides } from './Gnana'
import { BillSlides } from './Bills'
import { IaoSlides } from './Iao'
import { OrderSlides } from './Orders'
import { LiquiditySlides } from './Liquidity'

const Tutorial: React.FC<{
  type: Product
  onDismiss: () => void
}> = ({ type, onDismiss }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { chainId } = useActiveWeb3React()
  const networkLabel = NETWORK_LABEL[chainId]
  const jungleFarmRoute = location.pathname.includes('jungle-farms') && chainId !== 40
  const farmType = jungleFarmRoute
    ? 'jungle'
    : networkLabel === 'Telos' || networkLabel === 'Polygon'
    ? networkLabel
    : 'banana'
  const DEX = `${networkLabel}-dex`
  const FARMS = `${farmType}-farms`

  const displayModal = (type: Product) => {
    switch (type) {
      case DEX:
        return {
          title: "Welcome to ApeSwap's Dex",
          description: `Easily trade ANY token on ${networkLabel} Chain!`,
          slides: DexSlides,
        }
      case FARMS:
        return {
          title: `Welcome to ${farmType} Farms`,
          description: `Earn ${
            jungleFarmRoute
              ? 'Partner Tokens by Staking Liquidity!'
              : `${
                  networkLabel === 'Polygon' ? 'rewards' : networkLabel === 'Telos' ? 'TLOS' : 'BANANA'
                } by staking liquidity provider (LP) tokens!`
          }`,
          slides: FarmSlides,
        }
      case 'pools':
        return {
          title: 'Welcome to Staking Pools',
          description: 'Earn tokens by staking BANANA or GNANA!',
          slides: PoolSlides,
        }
      case 'maximizers-vaults':
        return {
          title: 'Welcome to Banana Maximizers',
          description: 'Maximize your BANANA yields!',
          slides: MaximizerSlides,
        }
      case 'gnana':
        return {
          title: 'Welcome to Golden Banana',
          description: 'Unlock the exclusive benefits of GNANA!',
          slides: GnanaSlides,
        }
      case 'treasury-bills':
        return {
          title: 'Welcome to Treasury Bills',
          description: 'Buy tokens at a discount and obtain a unique NFT!',
          slides: BillSlides,
        }
      case 'iao':
        return {
          title: 'Welcome to Initial Ape Offerings',
          description: 'Contribute BNB or GNANA to obtain newly launched tokens!',
          slides: IaoSlides,
        }
      case 'orders':
        return {
          title: 'Welcome to Limit Orders',
          description: 'Trade at the price you want!',
          slides: OrderSlides,
        }
      case 'liquidity':
        return {
          title: "Welcome to ApeSwap's Dex Liquidity",
          description: 'Provide liquidity to earn trading fees!',
          slides: LiquiditySlides,
        }
      default:
        return null
    }
  }

  return (
    <TutorialModal
      type={type}
      title={displayModal(type).title}
      description={displayModal(type).description}
      t={t}
      onDismiss={onDismiss}
      onReady={onDismiss}
      readyText={t("I'm Ready")}
    >
      {displayModal(type).slides}
    </TutorialModal>
  )
}

export default Tutorial
