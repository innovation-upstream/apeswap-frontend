import { MenuEntry } from '@ape.swap/uikit'
import { ContextApi } from '../../../contexts/Localization/types'

const maticConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Exchange'),
    lightIcon: 'ExchangeLightImage',
    darkIcon: 'ExchangeDarkImage',
    items: [
      {
        label: t('Swap'),
        href: 'https://dex.apeswap.finance/swap',
        isNew: false,
      },
      {
        label: t('Liquidity'),
        href: 'https://dex.apeswap.finance/zap',
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
    label: t('Bonds'),
    href: 'https://apeswap.finance/bonds',
  },
  {
    label: t('Liquidity Health'),
    href: 'https://apeswap.finance/liquidity-health',
  },
  {
    label: t('Farms'),
    href: 'https://apeswap.finance/farms',
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
