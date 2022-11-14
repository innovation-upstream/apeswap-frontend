import React, { useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { MarketingModal, TutorialModal } from '@ape.swap/uikit'
import { LendingBodies } from 'components/MarketingModalContent/Lending/'
import { BillsBodies } from 'components/MarketingModalContent/Bills/'
import CircularModal from 'components/CircularModal'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import MoonPayModal from 'views/Topup/MoonpayModal'
import GnanaModal from 'components/GnanaModal'
import NewsletterModal from 'components/NewsletterModal'
import SwiperProvider from 'contexts/SwiperProvider'
import QuestModal from '../MarketingModalContent/Quests/QuestModal'
import {
  MODAL_TYPE,
  SET_DEFAULT_MODAL_KEY,
  SHOW_DEFAULT_MODAL_KEY,
  SET_DEF_MOD_KEY,
  SHOW_DEF_MOD_KEY,
} from 'config/constants'
import { circularRoute } from 'utils'
import { NETWORK_LABEL } from 'config/constants/chains'
import { DexSlides } from 'components/MarketingModalContent/Dex'
import { FarmSlides } from 'components/MarketingModalContent/Farm'
import { PoolSlides } from 'components/MarketingModalContent/Pool'

const MarketingModalCheck = () => {
  const { chainId } = useActiveWeb3React()
  const location = useLocation()
  const history = useHistory()
  const { t } = useTranslation()
  const networkLabel = NETWORK_LABEL[chainId]
  const jungleFarmRoute = location.pathname.includes('jungle-farms')
  const farmType =
    networkLabel === 'Telos' || networkLabel === 'Polygon' ? networkLabel : jungleFarmRoute ? 'jungle' : 'banana'
  const dex = `${networkLabel}-dex`
  const farm = `${farmType}-farms`

  useMemo(() => {
    localStorage.removeItem(SHOW_DEFAULT_MODAL_KEY) // remove old key
    localStorage.removeItem(SET_DEFAULT_MODAL_KEY) // remove old key
    const onHomepage = history.location.pathname === '/'
    const sdmk = localStorage.getItem(SET_DEF_MOD_KEY)
    const isdm = localStorage.getItem(SHOW_DEF_MOD_KEY)

    // This needs to be fixed but I didnt want to reset users local storage keys
    // Basically first land users wont get the modal until they refresh so I added a showDefaultModalFlag variable
    const isDefaultModalSet = JSON.parse(sdmk)
    const isShowDefaultModal = JSON.parse(isdm)
    const showDefaultModalFlag = isShowDefaultModal || (!isShowDefaultModal && !isDefaultModalSet)

    if (!isDefaultModalSet) {
      localStorage.setItem(SHOW_DEF_MOD_KEY, JSON.stringify('SHOW'))
    }

    if (showDefaultModalFlag && onHomepage) {
      history.push({ search: '?modal=tutorial' })
    }
  }, [history])

  const dexRoute = location.search.includes('modal=dex')
  const farmsRoute = location.search.includes('modal=farms')
  const poolsRoute = location.search.includes('modal=pools')

  const lendingRoute = location.search.includes('modal=3')
  const billsRoute = location.search.includes('modal=bills')
  const questRoute = location.search.includes('modal=tutorial')
  const moonpayRoute = location.search.includes('modal=moonpay')
  const getGnanaRoute = location.search.includes('modal=gnana')
  const buyRoute = circularRoute(chainId, location, 'modal=circular-buy')
  const sellRoute = circularRoute(chainId, location, 'modal=circular-sell')
  const phRoute = circularRoute(chainId, location, 'modal=circular-ph')
  const ghRoute = circularRoute(chainId, location, 'modal=circular-gh')
  const newsletterRoute = location.search.includes('modal=newsletter')

  const { LendingBody1, LendingBody2, LendingBody3, LendingBody4, LendingBody5 } = LendingBodies
  // const { PoolsBody1, PoolsBody2, PoolsBody3, PoolsBody4 } = PoolsBodies
  const { BillsBody1 } = BillsBodies

  const onDismiss = () => {
    history.push({
      pathname: location.pathname,
    })
  }

  const lending = [
    <LendingBody1 key="lend1" />,
    <LendingBody2 key="lend2" />,
    <LendingBody3 key="lend3" />,
    <LendingBody4 key="lend4" />,
    <LendingBody5 key="lend5" />,
  ]
  // const pools = [
  //   <PoolsBody1 key="pool1" />,
  //   <PoolsBody2 key="pool2" />,
  //   <PoolsBody3 key="pool3" />,
  //   <PoolsBody4 key="pool4" />,
  // ]
  const bills = [<BillsBody1 key="bill1" />]
  // link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/stake/farms"

  return farmsRoute ? (
    <TutorialModal
      type={farm}
      title={t(`Welcome to ${farmType} Farms`)}
      description={t(
        `Earn ${
          jungleFarmRoute
            ? 'Partner Tokens by Staking Liquidity!'
            : `${
                networkLabel === 'Polygon' ? 'rewards' : networkLabel === 'Telos' ? 'TLOS' : 'BANANA'
              } by staking liquidity provider (LP) tokens!`
        }`,
      )}
      t={t}
      onDismiss={onDismiss}
      onReady={onDismiss}
      readyText={t("I'm Ready")}
    >
      {FarmSlides}
    </TutorialModal>
  ) : dexRoute ? (
    <TutorialModal
      type={dex}
      title={t("Welcome to ApeSwap's Dex")}
      description={t(`Easily trade ANY token on ${networkLabel} Chain!`)}
      t={t}
      onDismiss={onDismiss}
      onReady={onDismiss}
      readyText={t("I'm Ready")}
    >
      {DexSlides}
    </TutorialModal>
  ) : poolsRoute ? (
    <TutorialModal
      type="pools"
      title={t('Welcome to Staking Pools')}
      description={t('Earn tokens by staking BANANA or GNANA!')}
      t={t}
      onDismiss={onDismiss}
      onReady={onDismiss}
      readyText={t("I'm Ready")}
    >
      {PoolSlides}
    </TutorialModal>
  ) : lendingRoute ? (
    <MarketingModal
      title={t("Welcome to ApeSwap's Lending Network")}
      description={t('How does it work?')}
      onDismiss={onDismiss}
      startEarning={onDismiss}
      startEarningText={t('Start Earning')}
    >
      {lending}
    </MarketingModal>
  ) : // poolsRoute ? (
  //   <MarketingModal
  //     title={t("Welcome to ApeSwap's Pools")}
  //     description={t('Earn tokens by staking BANANA or GNANA')}
  //     onDismiss={onDismiss}
  //     startEarning={onDismiss}
  //     startEarningText={t('Start Earning')}
  //   >
  //     {pools}
  //   </MarketingModal>
  // ) :
  billsRoute ? (
    <MarketingModal
      title={t('Welcome to ApeSwap Treasury Bills')}
      onDismiss={onDismiss}
      startEarning={onDismiss}
      startEarningText={t("I'M READY")}
    >
      {bills}
    </MarketingModal>
  ) : moonpayRoute ? (
    <MoonPayModal onDismiss={onDismiss} />
  ) : getGnanaRoute ? (
    <GnanaModal onDismiss={onDismiss} />
  ) : buyRoute ? (
    <CircularModal actionType={MODAL_TYPE.BUYING} onDismiss={onDismiss} />
  ) : sellRoute ? (
    <CircularModal actionType={MODAL_TYPE.SELLING} onDismiss={onDismiss} />
  ) : phRoute ? (
    <CircularModal actionType={MODAL_TYPE.POOL_HARVEST} onDismiss={onDismiss} />
  ) : ghRoute ? (
    <CircularModal actionType={MODAL_TYPE.GENERAL_HARVEST} onDismiss={onDismiss} />
  ) : newsletterRoute ? (
    <NewsletterModal onDismiss={onDismiss} />
  ) : questRoute ? (
    <SwiperProvider>
      <QuestModal onDismiss={onDismiss} />
    </SwiperProvider>
  ) : null
}

export default React.memo(MarketingModalCheck)
