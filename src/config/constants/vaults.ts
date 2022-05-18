import { CHAIN_ID } from './chains'
import tokens from './tokens'
import { VaultConfig } from './types'

const vaults: VaultConfig[] = [
  {
    id: 0,
    pid: 22,
    availableChains: [CHAIN_ID.BSC],
    type: 'AUTO',
    version: 'V1',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x9a668d5482828a444d7322fe5420ab5b44ce3de7',
    },

    stakeToken: tokens.banana,
    token: tokens.banana,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 0,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },
  {
    id: 1,
    pid: 1,
    availableChains: [CHAIN_ID.BSC],
    type: 'AUTO',
    version: 'V1',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x4e4efe113214c1371b264c09f59f64c5f12589f8',
    },
    stakeToken: tokens.bananaBnb,
    token: tokens.banana,
    quoteToken: tokens.wbnb,
    rewardToken: tokens.bananaBnb,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 1,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // BANANA - BUSD Vault config
  {
    id: 2,
    pid: 2,
    availableChains: [CHAIN_ID.BSC],
    type: 'AUTO',
    version: 'V1',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x234101c6612115cac7bdb74ee20f388bb95db8cc',
    },
    stakeToken: tokens.bananaBusd,
    token: tokens.banana,
    quoteToken: tokens.wbnb,
    rewardToken: tokens.bananaBusd,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 2,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // BANANA - BNB vault config

  {
    id: 3,
    pid: 0,
    availableChains: [CHAIN_ID.BSC],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x9439542987b46F773970011b8DbA577098aBde73',
    },
    stakeToken: tokens.bananaBnb,
    token: tokens.banana,
    quoteToken: tokens.wbnb,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 1,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // BANANA - BUSD vault config

  {
    id: 4,
    pid: 1,
    availableChains: [CHAIN_ID.BSC],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x83b4A9a81d1608280F7a14a7BB9C0Ad6ED47eBb4',
    },
    stakeToken: tokens.bananaBusd,
    token: tokens.banana,
    quoteToken: tokens.busd,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 2,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // MATIC - BNB vault config

  {
    id: 5,
    pid: 2,
    availableChains: [CHAIN_ID.BSC],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x1e549cC26eEDbF9046ca76829Ef3149c7693Fc92',
    },
    stakeToken: tokens.bnbMatic,
    token: tokens.wmatic,
    quoteToken: tokens.wbnb,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 45,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // FTM - BNB vault config

  {
    id: 6,
    pid: 3,
    availableChains: [CHAIN_ID.BSC],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC]: '0xF28530555772Dfb7D6915E8a3c5cEf43a66b23BC',
    },
    stakeToken: tokens.bnbFtm,
    token: tokens.ftm,
    quoteToken: tokens.wbnb,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 49,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // CEEK - BNB vault config

  {
    id: 7,
    pid: 4,
    availableChains: [CHAIN_ID.BSC],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC]: '0x5a850dD7a7A54AB82dB9A436a332A78fAeE040C8',
    },
    stakeToken: tokens.bnbCeek,
    token: tokens.ceek,
    quoteToken: tokens.wbnb,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC]: 117,
      },
      address: {
        [CHAIN_ID.BSC]: '0x5c8D727b265DBAfaba67E050f2f739cAeEB4A6F9',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  // TESTNET VAULTS

  {
    id: 8,
    pid: 0,
    availableChains: [CHAIN_ID.BSC_TESTNET],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC_TESTNET]: '0x5a850dD7a7A54AB82dB9A436a332A78fAeE040C8',
    },
    stakeToken: tokens.horNey,
    token: tokens.hor,
    quoteToken: tokens.ney,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC_TESTNET]: 7,
      },
      address: {
        [CHAIN_ID.BSC_TESTNET]: '0xbbC5e1cD3BA8ED639b00927115e5f0e0040aA613',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC_TESTNET]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },

  {
    id: 9,
    pid: 1,
    availableChains: [CHAIN_ID.BSC_TESTNET],
    type: 'MAX',
    version: 'V2',
    stratAddress: {
      [CHAIN_ID.BSC_TESTNET]: '0x7b6dA317FB5A6D4e66Dc470CaE1E2F4fe2384299',
    },
    stakeToken: tokens.forEver,
    token: tokens.for,
    quoteToken: tokens.ever,
    rewardToken: tokens.banana,
    platform: 'ApeSwap',
    masterchef: {
      pid: {
        [CHAIN_ID.BSC_TESTNET]: 8,
      },
      address: {
        [CHAIN_ID.BSC_TESTNET]: '0xbbC5e1cD3BA8ED639b00927115e5f0e0040aA613',
      },
      rewardsPerBlock: {
        [CHAIN_ID.BSC_TESTNET]: 'cakePerBlock',
      },
      rewardToken: tokens.banana,
    },
  },
]

export default vaults
