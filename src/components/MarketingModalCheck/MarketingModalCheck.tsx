import React from 'react'
import { useRouter } from 'next/router'
import { MarketingModal } from '@apeswapfinance/uikit'
import { LendingBodies } from 'components/MarketingModalContent/Lending/'
import { FarmsBodies } from 'components/MarketingModalContent/Farms/'
import { PoolsBodies } from 'components/MarketingModalContent/Pools/'
import { BillsBodies } from 'components/MarketingModalContent/Bills/'
import { useTranslation } from 'contexts/Localization'

const MarketingModalCheck = () => {
  const { push, query, pathname } = useRouter()
  const { t } = useTranslation()

  const farmsRoute = query.modal === '1'
  const poolsRoute = query.modal === '2'
  const lendingRoute = query.modal === '3'
  const billsRoute = query.modal === 'bills'

  const { LendingBody1, LendingBody2, LendingBody3, LendingBody4, LendingBody5 } = LendingBodies
  const { FarmsBody1, FarmsBody2, FarmsBody3, FarmsBody4 } = FarmsBodies
  const { PoolsBody1, PoolsBody2, PoolsBody3, PoolsBody4 } = PoolsBodies
  const { BillsBody1 } = BillsBodies

  const onDismiss = () => {
    push({ pathname }, undefined, { shallow: true })
  }

  const lending = [<LendingBody1 />, <LendingBody2 />, <LendingBody3 />, <LendingBody4 />, <LendingBody5 />]
  const farms = [<FarmsBody1 />, <FarmsBody2 />, <FarmsBody3 />, <FarmsBody4 />]
  const pools = [<PoolsBody1 />, <PoolsBody2 />, <PoolsBody3 />, <PoolsBody4 />]
  const bills = [<BillsBody1 />]

  return lendingRoute ? (
    <MarketingModal
      title={t("Welcome to ApeSwap's Lending Network")}
      description={t('How does it work?')}
      onDismiss={onDismiss}
      startEarning={onDismiss}
      startEarningText={t('Start Earning')}
    >
      {lending}
    </MarketingModal>
  ) : farmsRoute ? (
    <MarketingModal
      title={t("Welcome to ApeSwap's Farms")}
      description={t('Start earning passive income with your cryptocurrency!')}
      onDismiss={onDismiss}
      startEarning={onDismiss}
      startEarningText={t('Start Earning')}
    >
      {farms}
    </MarketingModal>
  ) : poolsRoute ? (
    <MarketingModal
      title={t("Welcome to ApeSwap's Pools")}
      description={t('Earn tokens by staking BANANA or GNANA')}
      onDismiss={onDismiss}
      startEarning={onDismiss}
      startEarningText={t('Start Earning')}
    >
      {pools}
    </MarketingModal>
  ) : billsRoute ? (
    <MarketingModal
      title={t('Welcome to ApeSwap Treasury Bills')}
      onDismiss={onDismiss}
      startEarning={onDismiss}
      startEarningText={t("I'M READY")}
    >
      {bills}
    </MarketingModal>
  ) : null
}

export default React.memo(MarketingModalCheck)
