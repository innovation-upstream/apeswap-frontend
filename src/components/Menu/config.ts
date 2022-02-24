import { MenuEntry } from '@apeswapfinance/uikit'
import { MenuItem, icons } from '@isioma/uikit'
import { BASE_EXCHANGE_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

const config: MenuItem[] = [
  {
    label: 'Home',
    icon: icons.HOME,
    path: '/',
  },
  {
    label: 'Ape Stats',
    icon: icons.CALCULATOR,
    path: '/stats',
  },
  {
    label: 'Trade',
    icon: icons.TRADE,
    subMenu: [
      {
        label: 'Exchange',
        path: BASE_EXCHANGE_URL,
      },
      {
        label: 'Liquidity',
        path: BASE_LIQUIDITY_POOL_URL,
      },
    ],
  },
  {
    label: 'Vaults',
    icon: icons.VAULT,
    path: `${BASE_EXCHANGE_URL}/vaults`,
  },
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
    label: 'IAZOs',
    icon: icons.ROCKET,
    path: '/iazos',
  },
  {
    label: 'IAO',
    icon: icons.ROCKET,
    path: '/iao',
  },
  {
    label: 'NFA',
    icon: icons.NFA,
    subMenu: [
      {
        label: 'List',
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
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   path: '/lottery',
  // },
  /* 
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    subMenu: [
      {
        label: 'Leaderboard',
        path: '/teams',
      },
      {
        label: 'Your Profile',
        path: '/profile',
      },
    ],
  }, */
  {
    label: 'Info',
    icon: icons.INFO,
    subMenu: [
      {
        label: 'Overview',
        path: 'https://info.apeswap.finance',
      },
      {
        label: 'Tokens',
        path: 'https://info.apeswap.finance/tokens',
      },
      {
        label: 'Pairs',
        path: 'https://info.apeswap.finance/pairs',
      },
      {
        label: 'Accounts',
        path: 'https://info.apeswap.finance/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: icons.MORE,
    subMenu: [
      {
        label: 'Governance',
        path: 'https://vote.apeswap.finance',
      },
      {
        label: 'Github',
        path: 'https://github.com/apeswapfinance',
      },
      {
        label: 'Docs',
        path: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Blog',
        path: 'https://ape-swap.medium.com/',
      },
      {
        label: 'Partnership Application',
        path: 'https://docs.google.com/forms/d/e/1FAIpQLSdiC4jpKQAYD4iALGrm9ErmDIs1xtsOENu9GsvgdczVwe_uOw/viewform?usp=sf_link',
      },
      {
        label: 'ApeTV',
        path: 'https://anchor.fm/apetv',
      },
      {
        label: 'ApeLabs',
        path: 'https://www.apelabs.education',
      },
      {
        label: 'Bug Bounty Program',
        path: 'https://apeswap.gitbook.io/apeswap-finance/security/bug-bounty-program',
      },
      {
        label: 'Audits',
        path: 'https://apeswap.gitbook.io/apeswap-finance/security/audits',
      },
    ],
  },
]

export default config
