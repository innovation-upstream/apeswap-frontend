/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TutorialModal, useWalletModal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { NETWORK_LABEL } from 'config/constants/chains'
import { METAMASK_LINKS } from 'config/constants'
import { useTranslation } from 'contexts/Localization'
import { FarmSlides } from './Farm'
import { PoolSlides } from './Pool'
import { MaximizerSlides } from './Maximizers'
import { GnanaSlides } from './Gnana'
import { BillSlides } from './Bills'
import { IaoSlides } from './Iao'
import { OrderSlides } from './Orders'
import { LiquiditySlides } from './Liquidity'
import { styles } from './styles'
import useAuth from '../../hooks/useAuth'

const Tutorial: React.FC<{
  location: string
  onDismiss: () => void
}> = ({ location, onDismiss }) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const networkLabel = NETWORK_LABEL[chainId]
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)

  const connectWalletSlide = {
    title: 'Connect Your Wallet',
    description: (
      <Flex sx={{ flexWrap: 'wrap', mt: 2 }}>
        <Text sx={styles.content}>
          <Text sx={styles.yellow} onClick={onPresentConnectModal}>
            {t('Click here')}
          </Text>{' '}
          <Text sx={styles.content}>{t('to connect your wallet to ApeSwap.')}</Text>
        </Text>
        <Text sx={{ fontStyle: 'italic' }}>
          <Text sx={styles.content}>{t('Don’t have a wallet?')}</Text>{' '}
          <Text sx={styles.content}>
            {t(`A full setup guide for MetaMask on ${NETWORK_LABEL[chainId]} can be found `)}
          </Text>
          <Text sx={styles.yellow}>
            <a href={METAMASK_LINKS[NETWORK_LABEL[chainId]]} target="_blank" rel="noreferrer noopener">
              {t('here')}
            </a>
          </Text>
        </Text>
      </Flex>
    ),
  }

  const tutorials = {
    '/swap': {
      type: `${networkLabel}-dex`,
      title: "Welcome to ApeSwap's Dex",
      description: `Easily trade ANY token on ${networkLabel} Chain!`,
      slides: [connectWalletSlide, <>second slide</>],
    },
    farms: {
      title: `Welcome to ${networkLabel} Farms`,
      description: `Earn moneeeeeeeeeeeeey`,
      slides: FarmSlides,
    },
    pools: {
      title: 'Welcome to Staking Pools',
      description: 'Earn tokens by staking BANANA or GNANA!',
      slides: PoolSlides,
    },
    'maximizers-vaults': {
      title: 'Welcome to Banana Maximizers',
      description: 'Maximize your BANANA yields!',
      slides: MaximizerSlides,
    },
    gnana: {
      title: 'Welcome to Golden Banana',
      description: 'Unlock the exclusive benefits of GNANA!',
      slides: GnanaSlides,
    },
    'treasury-bills': {
      title: 'Welcome to Treasury Bills',
      description: 'Buy tokens at a discount and obtain a unique NFT!',
      slides: BillSlides,
    },
    iao: {
      title: 'Welcome to Initial Ape Offerings',
      description: 'Contribute BNB or GNANA to obtain newly launched tokens!',
      slides: IaoSlides,
    },
    orders: {
      title: 'Welcome to Limit Orders',
      description: 'Trade at the price you want!',
      slides: OrderSlides,
    },
    liquidity: {
      title: "Welcome to ApeSwap's Dex Liquidity",
      description: 'Provide liquidity to earn trading fees!',
      slides: LiquiditySlides,
    },
  }

  return (
    <TutorialModal
      type={tutorials[location].type}
      title={tutorials[location].title}
      description={tutorials[location].description}
      t={t}
      onDismiss={onDismiss}
      readyText={t("I'm Ready")}
    >
      {tutorials[location].slides}
    </TutorialModal>
  )
}

export default Tutorial
