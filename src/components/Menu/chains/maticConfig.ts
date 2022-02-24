import { MenuItem, icons } from '@isioma/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const maticConfig: MenuItem[] = [
  HOME,
  // {
  //   label: 'Ape Stats',
  //   icon: 'StatsIcon',
  //   path: '/stats',
  // },
  EXCHANGE,
  {
    label: 'Farms',
    icon: icons.FARM,
    path: '/farms',
  },
  {
    label: 'Vaults',
    icon: icons.VAULT,
    path: '/vaults',
  },
  //   {
  //     label: 'Pools',
  //     icon: 'PoolIcon',
  //     path: '/pools',
  //   },
  //   {
  //     label: 'IAO',
  //     icon: 'IfoIcon',
  //     path: '/iao',
  //   },
  //   {
  //     label: 'GNANA',
  //     icon: 'ApeZone',
  //     path: '/gnana',
  //   },
  {
    label: 'Info',
    icon: icons.MORE,
    subMenu: [
      {
        label: 'Overview',
        path: NETWORK_INFO_LINK[CHAIN_ID.MATIC],
      },
      {
        label: 'Tokens',
        path: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/tokens`,
      },
      {
        label: 'Pairs',
        path: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/pairs`,
      },
      {
        label: 'Accounts',
        path: `${NETWORK_INFO_LINK[CHAIN_ID.MATIC]}/accounts`,
      },
    ],
  },
  MORE_INFO,
]

export default maticConfig
