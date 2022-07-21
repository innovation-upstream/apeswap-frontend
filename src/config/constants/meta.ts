import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ApeSwap',
  description:
    'ApeSwap is a DeFi Hub on BNB Chain, Polygon, & Ethereum. Swap, stake, and lend cryptocurrencies, from stablecoins to altcoins - all in one place.',
  image: 'https://apeswap.finance/logo.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home Page | ApeSwap',
  },
  '/exchange': {
    title: 'Exchange | ApeSwap',
    description: 'Swap between hundreds of crypto tokens using our decentralized exchange.',
  },
  '/stats': {
    title: 'ApeStats | ApeSwap',
    description: 'Track your portfolio on ApeSwap using our custom dashboard.',
  },
  '/nft': {
    title: 'Non Fungible Apes | ApeSwap',
    description: 'Buy and sell ApeSwap NFTs and join our NFT community.',
  },
  '/farms': {
    title: 'BANANA Farms | ApeSwap',
    description: 'Stake your liquidity provider (LP) tokens in BANANA Farms to earn BANANA.',
  },
  '/jungle-farms': {
    title: 'Jungle Farms | ApeSwap',
    description: 'Stake your liquidity provider (LP) tokens to earn partner project tokens.',
  },
  '/pools': {
    title: 'Staking Pools | ApeSwap',
    description: 'Stake BANANA in Staking Pools to earn partner project tokens.',
  },
  '/liquidity': {
    title: 'Liquidity | ApeSwap',
    description: 'Add liquidity to the ApeSwap decentralized exchange to create LPs and earn trading fees.',
  },
  '/lottery': {
    title: 'Lottery | ApeSwap',
  },
  '/iao': {
    title: 'Initial Ape Offerings | ApeSwap',
    description: 'Launch your crypto project with ApeSwap, or commit into Initial Ape Offerings.',
  },
  '/gnana': {
    title: 'GNANA | ApeSwap',
    description: 'Convert your BANANA to GNANA to gain exclusive access to governance, pools, and more.',
  },
  '/vaults': {
    title: 'BANANA Maximizers | ApeSwap',
    description: 'Stake your liquidity provider (LP) tokens in auto-compounding vaults to earn BANANA.',
  },
  '/auction': {
    title: 'Auction | ApeSwap',
  },
  '/staking': {
    title: 'NFA Staking | ApeSwap',
  },
  '/treasury-bills': {
    title: 'Treasury Bills | ApeSwap',
    description: 'Get BANANA and partner project tokens at a discount using your liquidity provider (LP) tokens.',
  },
  '/orders': {
    title: 'Limit Orders | ApeSwap',
    description: 'Trade crypto tokens at the price you want using limit orders on the ApeSwap DEX.',
  },
}
