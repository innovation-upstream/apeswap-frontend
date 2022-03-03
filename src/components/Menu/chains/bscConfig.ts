import { icons } from '@innovationupstream/apeswap-uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const bscConfig = [
  HOME,
  EXCHANGE,
  {
    label: 'Farms',
    icon: icons.FARM,
    path: '/farms',
  },
  {
    label: 'Pools',
    icon: icons.POOL,
    path: '/pools',
  },
  {
    label: 'Vaults',
    icon: icons.VAULT,
    path: '/vaults',
  },
  {
    label: 'IAO',
    icon: icons.ROCKET,
    subMenu: [
      {
        label: 'Official',
        path: '/iao',
      },
      {
        label: 'Self-Serve',
        path: '/ss-iao',
      },
    ],
  },
  {
    label: 'NFA',
    icon: icons.NFA,
    subMenu: [
      {
        label: 'Collection',
        path: '/nft',
      },
      {
        label: 'Auction',
        path: '/auction',
      },
      {
        label: 'Staking',
        path: '/staking',
      },
    ],
  },
  {
    label: 'GNANA',
    icon: icons.GNANA,
    path: '/gnana',
  },
  {
    label: 'Burn',
    icon: icons.VAULT,
    path: '/burn',
  },
  {
    label: 'Info',
    icon: icons.INFO,
    subMenu: [
      {
        label: 'Overview',
        path: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: 'Tokens',
        path: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/tokens`,
      },
      {
        label: 'Pairs',
        path: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/pairs`,
      },
      {
        label: 'Accounts',
        path: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/accounts`,
      },
    ],
  },
  MORE_INFO,
]

export default bscConfig
