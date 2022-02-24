import { MenuItem, icons } from '@isioma/uikit'
import { BASE_EXCHANGE_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

export const HOME: MenuItem = {
  label: 'Home',
  icon: icons.HOME,
  path: '/',
}

export const EXCHANGE: MenuItem = {
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
}

export const MORE_INFO: MenuItem = {
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
  ],
}
