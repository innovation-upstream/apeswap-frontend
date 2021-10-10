// Network chain ids

export const CHAIN_ID = {
  BSC: 56,
  BSC_TESTNET: 96,
  MATIC: 137,
  MATIC_TESTNET: 80001,
}

// Network labels

export const NETWORK_LABEL = {
  [CHAIN_ID.BSC]: 'BSC',
  [CHAIN_ID.BSC_TESTNET]: 'BSC Testnet',
  [CHAIN_ID.MATIC]: 'Polygon',
  [CHAIN_ID.MATIC_TESTNET]: 'Polygon Testnet',
}

// Network icons

export const NETWORK_ICON = {
  [CHAIN_ID.BSC]: '',
  [CHAIN_ID.BSC_TESTNET]: '',
  [CHAIN_ID.MATIC]: '',
  [CHAIN_ID.MATIC_TESTNET]: '',
}

// Network RPC nodes

export const NETWORK_RPC = {
  [CHAIN_ID.BSC]: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed.binance.org/',
  ],
  [CHAIN_ID.BSC_TESTNET]: [
    'https://data-seed-prebsc-1-s1.binance.org:8545/',
    'https://data-seed-prebsc-2-s1.binance.org:8545/',
    'https://data-seed-prebsc-1-s2.binance.org:8545/',
  ],
  [CHAIN_ID.MATIC]: ['https://polygon-rpc.com/'],
  [CHAIN_ID.MATIC_TESTNET]: ['https://matic-mumbai.chainstacklabs.com'],
}

// Network block explorers

export const BLOCK_EXPLORER = {
  [CHAIN_ID.BSC]: 'https://bscscan.com',
  [CHAIN_ID.BSC_TESTNET]: 'https://testnet.bscscan.com/',
  [CHAIN_ID.MATIC]: 'https://polygonscan.com',
  [CHAIN_ID.MATIC_TESTNET]: 'https://mumbai.polygonscan.com/',
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
}