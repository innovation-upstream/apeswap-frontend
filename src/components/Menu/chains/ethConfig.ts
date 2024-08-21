import { MenuEntry } from '@apeswapfinance/uikit'
import { ContextApi } from '../../../contexts/Localization/types'

const maticConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Exchange'),
    lightIcon: 'ExchangeLightImage',
    darkIcon: 'ExchangeDarkImage',
    items: [
      {
        label: t('Swap'),
        href: 'https://apeswap.finance/swap',
        isNew: false,
      },
      {
        label: t('Liquidity'),
        href: 'https://apeswap.finance/add-liquidity',
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
    label: t('Liquidity Health'),
    href: 'https://apeswap.finance/liquidity-health',
    isNew: false,
  },
  {
    label: t('More'),
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: t('ApeStats'),
        href: 'https://legacy.apeswap.finance/apestats',
        isNew: false,
      },
      {
        label: t('Protocol Data'),
        href: 'https://apeswap.finance/protocol-dashboard',
        isNew: false,
      },
      {
        label: t('Charts'),
        href: 'https://legacy.apeswap.finance/info',
        isNew: false,
      },
      {
        label: 'Lend',
        href: 'https://lending.apeswap.finance/',
      },
      {
        label: 'ApeSwap NFTs',
        href: 'https://apeswap.finance/nft',
      },
      {
        label: t('Governance'),
        href: 'https://discuss.apeswap.finance',
        isNew: false,
      },
    ],
  },
]

export default maticConfig
