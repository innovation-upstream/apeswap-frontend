import { ChainId } from '@ape.swap/sdk'

export enum Product {
  BNB_DEX = 'BNB-dex',
  POLYGON_DEX = 'Polygon-dex',
  ETHEREUM_DEX = 'Ethereum-dex',
  TELOS_DEX = 'Telos-dex',
  JUNGLE_FARMS = 'jungle-farms',
  BANANA_FARMS = 'banana-farms',
  POLYGON_FARMS = 'Polygon-farms',
  TELOS_FARMS = 'Telos-farms',
  POOLS = 'pools',
  MAXIMIZERS_VAULTS = 'maximizers-vaults',
  GNANA = 'gnana',
  TREASURY_BILL = 'treasury-bills',
  IAO = 'iao',
  ORDERS = 'orders',
  LIQUIDITY = 'liquidity',

  LENDING = 'lending',
}

export const tutorialSlides = {
  [Product.TREASURY_BILL]: [
    {
      title: 'Step 1',
      description: 'Connect your wallet',
      image: 'treasury-bills-0.svg',
    },
    {
      title: 'Step 2',
      description: 'Select & Enable',
      image: 'treasury-bills-1.svg',
    },
    { title: 'Step 3', description: 'Add Liquidity', image: 'treasury-bills-2.svg' },
    { title: 'Step 4', description: 'Buy', image: 'treasury-bills-3.svg' },
    { title: 'Step 5', description: 'Claim!', image: 'treasury-bills-4.svg' },
  ],
  [Product[`${ChainId}-DEX`]]: [
    {
      title: 'Step 1',
      description: 'Connect your wallet',
      image: `${ChainId}-dex-0.svg`,
    },
  ],
  [Product.POOLS]: [],
}
