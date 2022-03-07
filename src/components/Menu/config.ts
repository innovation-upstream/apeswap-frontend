import { icons } from '@innovationupstream/apeswap-uikit'
import { BASE_EXCHANGE_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

const config = [
  {
    label: 'Home',
    icon: icons.HOME,
    href: '/',
  },
  {
    label: 'Ape Stats',
    icon: icons.CALCULATOR,
    href: '/stats',
  },
  {
    label: 'Trade',
    icon: icons.TRADE,
    items: [
      {
        label: 'Exchange',
        href: BASE_EXCHANGE_URL,
      },
      {
        label: 'Liquidity',
        href: BASE_LIQUIDITY_POOL_URL,
      },
    ],
  },
  {
    label: 'Vaults',
    icon: icons.VAULT,
    href: `${BASE_EXCHANGE_URL}/vaults`,
  },
  {
    label: 'Farms',
    icon: icons.FARM,
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: icons.POOL,
    href: '/pools',
  },
  {
    label: 'IAZOs',
    icon: icons.ROCKET,
    href: '/iazos',
  },
  {
    label: 'IAO',
    icon: icons.ROCKET,
    href: '/iao',
  },
  {
    label: 'NFA',
    icon: icons.NFA,
    items: [
      {
        label: 'List',
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
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  /* 
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    items: [
      {
        label: 'Leaderboard',
        href: '/teams',
      },
      {
        label: 'Your Profile',
        href: '/profile',
      },
    ],
  }, */
  {
    label: 'Info',
    icon: icons.INFO,
    items: [
      {
        label: 'Overview',
        href: 'https://info.apeswap.finance',
      },
      {
        label: 'Tokens',
        href: 'https://info.apeswap.finance/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.apeswap.finance/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.apeswap.finance/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: icons.MORE,
    items: [
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
      },
      {
        label: 'Github',
        href: 'https://github.com/apeswapfinance',
      },
      {
        label: 'Docs',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Blog',
        href: 'https://ape-swap.medium.com/',
      },
      {
        label: 'Partnership Application',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSdiC4jpKQAYD4iALGrm9ErmDIs1xtsOENu9GsvgdczVwe_uOw/viewform?usp=sf_link',
      },
      {
        label: 'ApeTV',
        href: 'https://anchor.fm/apetv',
      },
      {
        label: 'ApeLabs',
        href: 'https://www.apelabs.education',
      },
      {
        label: 'Bug Bounty Program',
        href: 'https://apeswap.gitbook.io/apeswap-finance/security/bug-bounty-program',
      },
      {
        label: 'Audits',
        href: 'https://apeswap.gitbook.io/apeswap-finance/security/audits',
      },
    ],
  },
]

export default config
