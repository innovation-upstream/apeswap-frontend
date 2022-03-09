import React from 'react'
import { icons } from '@innovationupstream/apeswap-uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'
import Lending from '../../Icons/Lending'

const bscConfig = [
  HOME,
  EXCHANGE,
  {
    label: 'Farms',
    icon: icons.FARM,
    items: [
      {
        label: 'BANANA',
        href: '/farms',
      },
      {
        label: 'Jungle',
        href: '/jungle-farms',
      },
    ],
  },
  {
    label: 'Pools',
    icon: icons.POOL,
    href: '/pools',
  },
  {
    label: 'Vaults',
    icon: icons.VAULT,
    href: '/vaults',
  },
  {
    label: 'IAO',
    icon: icons.ROCKET,
    items: [
      {
        label: 'Official',
        href: '/iao',
      },
      {
        label: 'Self-Serve',
        href: '/ss-iao',
      },
    ],
  },
  {
    label: 'NFA',
    icon: icons.NFA,
    items: [
      {
        label: 'Collection',
        href: '/nft',
      },
      {
        label: 'Auction',
        href: '/auction',
      },
      {
        label: 'Staking',
        href: '/staking',
      },
    ],
  },
  {
    label: 'GNANA',
    icon: icons.GNANA,
    href: '/gnana',
  },
  {
    label: 'Lending',
    icon: <Lending width="24px" />,
    href: 'https://lending.apeswap.finance/markets',
  },
  {
    label: 'Info',
    icon: icons.CHART,
    items: [
      {
        label: 'Overview',
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: 'Tokens',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/tokens`,
      },
      {
        label: 'Pairs',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/pairs`,
      },
      {
        label: 'Accounts',
        href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/accounts`,
      },
    ],
  },
  MORE_INFO,
]

export default bscConfig
