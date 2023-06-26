import { ChainId } from '@ape.swap/sdk'

export const RPC_URLS: Record<ChainId, string[]> = {
  [ChainId.BSC]: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io',
    'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
  ],
  [ChainId.ARBITRUM]: ['https://arb1.arbitrum.io/rpc'],
  [ChainId.BSC_TESTNET]: ['https://data-seed-prebsc-2-s3.binance.org:8545/'],
  [ChainId.MATIC]: [
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
  ],
  [ChainId.MATIC_TESTNET]: ['https://matic-mumbai.chainstacklabs.com'],
  [ChainId.MAINNET]: [
    'https://eth-mainnet.nodereal.io/v1/43f9100965104de49b580d1fa1ab28c0',
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
  ],
  [ChainId.TLOS]: ['https://mainnet.telos.net/evm'],
}
