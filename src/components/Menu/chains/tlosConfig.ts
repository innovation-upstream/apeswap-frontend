import { MenuEntry } from '@ape.swap/uikit'
import { ContextApi } from '../../../contexts/Localization/types'

const tlosConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Exchange'),
    lightIcon: 'ExchangeLightImage',
    darkIcon: 'ExchangeDarkImage',
    items: [
      {
        label: t('Swap'),
        href: 'https://legacy.apeswap.finance/swap',
        isNew: false,
      },
      {
        label: t('Liquidity'),
        href: 'https://legacy.apeswap.finance/zap',
        isNew: false,
      },
      {
        label: t('Pro Trading'),
        href: 'https://pro.apeswap.finance',
        isNew: false,
      },
    ],
  },
  {
    label: t('Farms'),
    href: 'https://legacy.apeswap.finance/farms',
    isNew: false,
  },
  {
    label: t('Bonds'),
    href: 'https://legacy.apeswap.finance/bonds',
    isNew: false,
  },
  {
    label: t('Explore'),
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: t('ApeStats'),
        href: 'https://legacy.apeswap.finance/apestats',
        isNew: false,
      },
      {
        label: t('Dashboard'),
        href: 'https://apeswap.finance/protocol-dashboard',
        isNew: false,
      },
      {
        label: t('Documentation'),
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
      },
      {
        label: t('Charts'),
        href: 'https://legacy.apeswap.finance/info',
        isNew: false,
      },
      {
        label: t('Governance'),
        href: 'https://discuss.apeswap.finance',
        isNew: false,
      },
      {
        label: t('Newsletter'),
        href: '?modal=newsletter',
        isNew: true,
      },
    ],
  },
]

export default tlosConfig
