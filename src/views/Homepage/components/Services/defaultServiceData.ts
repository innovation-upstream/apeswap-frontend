import { DefaultServiceData } from './types'
import { ContextApi } from '../../../../contexts/Localization/types'

export const defaultServiceData: (t: ContextApi['t']) => DefaultServiceData[] = (t) => [
  {
    id: 'poolDetails',
    title: t('Staking Pools'),
    description: t('Stake BANANA or GNANA'),
    backgroundImg: 'images/homepage-pools',
    link: '/pools',
    stats: [],
  },
  {
    id: 'farmDetails',
    title: t('Yield Farms'),
    description: t('Stake LP, earn BANANA'),
    backgroundImg: 'images/homepage-farms',
    link: '/banana-farms',
    stats: [],
  },
  {
    id: 'lendingDetails',
    title: t('Lending Network'),
    description: t('Earn while you HODL'),
    backgroundImg: 'images/homepage-lending',
    link: 'https://lending.apeswap.finance/markets',
    stats: [],
  },
  {
    id: 'billDetails',
    title: t('Treasury Bills'),
    description: t('Create protocol-owned liquidity with yield-generating NFTs'),
    backgroundImg: 'images/homepage-bills',
    link: '/treasury-bills',
    stats: [],
  },
]
