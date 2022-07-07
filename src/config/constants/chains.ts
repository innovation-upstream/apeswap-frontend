// Network chain ids

import { SmartRouter } from '@apeswapfinance/sdk'

export const CHAIN_ID = {
  BSC: 56,
  BSC_TESTNET: 97,
  MATIC: 137,
  MATIC_TESTNET: 80001,
  ETH: 1,
}

// Network labels

export const NETWORK_LABEL = {
  [CHAIN_ID.BSC]: 'BSC',
  [CHAIN_ID.BSC_TESTNET]: 'BSC Testnet',
  [CHAIN_ID.MATIC]: 'Polygon',
  [CHAIN_ID.MATIC_TESTNET]: 'Polygon Testnet',
  [CHAIN_ID.ETH]: 'Ethereum',
}

// Network icons

export const NETWORK_ICON = {
  [CHAIN_ID.BSC]: '',
  [CHAIN_ID.BSC_TESTNET]: '',
  [CHAIN_ID.MATIC]: '',
  [CHAIN_ID.MATIC_TESTNET]: '',
  [CHAIN_ID.ETH]: '',
}

export const NETWORK_INFO_LINK = {
  [CHAIN_ID.BSC]: 'https://info.apeswap.finance',
  [CHAIN_ID.BSC_TESTNET]: 'https://info.apeswap.finance',
  [CHAIN_ID.MATIC]: 'https://polygon.info.apeswap.finance/',
  [CHAIN_ID.MATIC_TESTNET]: 'https://polygon.info.apeswap.finance/',
  [CHAIN_ID.ETH]: 'https://ethereum.info.apeswap.finance',
}

// Network RPC nodes
export const NETWORK_RPC = {
  [CHAIN_ID.BSC]: [
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
  ],
  [CHAIN_ID.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [CHAIN_ID.MATIC]: ['https://polygon-rpc.com/'],
  [CHAIN_ID.MATIC_TESTNET]: ['https://matic-mumbai.chainstacklabs.com'],
  [CHAIN_ID.ETH]: ['https://mainnet.infura.io/v3/db68086081a640d6999f0b58d049b0c4'],
}

// Network block explorers

export const BLOCK_EXPLORER = {
  [CHAIN_ID.BSC]: 'https://bscscan.com',
  [CHAIN_ID.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [CHAIN_ID.MATIC]: 'https://polygonscan.com',
  [CHAIN_ID.MATIC_TESTNET]: 'https://mumbai.polygonscan.com/',
  [CHAIN_ID.ETH]: 'https://etherscan.io/',
}

export const CHAIN_PARAMS = {
  [CHAIN_ID.BSC]: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.BSC],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.BSC]],
  },
  [CHAIN_ID.BSC_TESTNET]: {
    chainId: '0x61',
    chainName: 'Binance Smart Chain Testnet',
    nativeCurrency: {
      name: 'bnb',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.BSC_TESTNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.BSC_TESTNET]],
  },
  [CHAIN_ID.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MATIC],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MATIC]],
  },
  [CHAIN_ID.MATIC_TESTNET]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.MATIC_TESTNET],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.MATIC_TESTNET]],
  },
  [CHAIN_ID.ETH]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: NETWORK_RPC[CHAIN_ID.ETH],
    blockExplorerUrls: [BLOCK_EXPLORER[CHAIN_ID.ETH]],
  },
}

// Ape price impact cutoff
export const APE_PRICE_IMPACT = 15

// This sets the priority of when a router is used
export const PRIORITY_SMART_ROUTERS = {
  [CHAIN_ID.ETH]: [SmartRouter.APE, SmartRouter.UNISWAP],
  [CHAIN_ID.BSC]: [SmartRouter.APE, SmartRouter.BISWAP, SmartRouter.PANCAKE],
  [CHAIN_ID.MATIC]: [SmartRouter.APE, SmartRouter.QUICKSWAP],
}

// Wallchain Configs
// If a router is in the priority list for a certain chain it must be added to the wallchain params
export const WALLCHAIN_PARAMS = {
  [CHAIN_ID.BSC]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: '85c578a5-ecb0-445c-8a95-4c0eba2f33b6',
    },
    [SmartRouter.PANCAKE]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: 'c5f0eb9a-180b-4787-a5c0-db68292f6926',
    },
    [SmartRouter.BISWAP]: {
      apiUrl: '',
      apiKey: '',
    },
  },
  [CHAIN_ID.BSC_TESTNET]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://bsc.wallchains.com/upgrade_txn/',
      apiKey: '85c578a5-ecb0-445c-8a95-4c0eba2f33b6',
    },
  },
  [CHAIN_ID.MATIC]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://matic.wallchains.com/upgrade_txn/',
      apiKey: '5cf2b177-5fa5-477a-8cea-f2b54859af2a',
    },
    [SmartRouter.QUICKSWAP]: {
      apiUrl: 'https://matic.wallchains.com/upgrade_txn/',
      apiKey: '31f565ed-7bc1-44f4-8ca7-331897d65132',
    },
  },
  [CHAIN_ID.ETH]: {
    [SmartRouter.APE]: {
      apiUrl: 'https://eth.wallchains.com/upgrade_txn/',
      apiKey: '498288e3-4c04-40e9-95a7-3ceb3f75096c',
    },
    [SmartRouter.UNISWAP]: {
      apiUrl: 'https://eth.wallchains.com/upgrade_txn/',
      apiKey: 'ff1e792c-b199-4393-8385-40e533e3687a',
    },
  },
}

// To display correct prices for each liquidity pool when need to swap the contract out
// Routers in prioirty list must be in here
export const SMART_PRICE_GETTERS = {
  [CHAIN_ID.BSC]: {
    [SmartRouter.APE]: '0x5e545322b83626c745FE46144a15C00C94cBD803',
    [SmartRouter.PANCAKE]: '0xF724471B00B5fACBA78D195bD241d090350a04Bd',
    [SmartRouter.BISWAP]: '0x1828e426fF3ec9E037cff888CB13f84d5e95F4eF',
  },
  [CHAIN_ID.BSC_TESTNET]: {
    [SmartRouter.APE]: '0xd722f9A2950E35Ab3EeD1d013c214671750A638B',
  },
  [CHAIN_ID.MATIC]: {
    [SmartRouter.APE]: '0x05D6C73D7de6E02B3f57677f849843c03320681c',
    [SmartRouter.QUICKSWAP]: '0xEe57c38d678CaE0cE16168189dB47238d8fe6553',
  },
  [CHAIN_ID.ETH]: {
    [SmartRouter.APE]: '0x5fbFd1955EeA2F62F1AfD6d6E92223Ae859F7887',
    [SmartRouter.UNISWAP]: '0x0187D959A28B0D3B490c2D898fA1CcD054cCC3cd',
  },
}
