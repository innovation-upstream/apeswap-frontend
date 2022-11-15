import { ChainId } from '@ape.swap/sdk'

interface PairToken {
  name: string
  symbol: string
}
interface SwapToken {
  id: string
  symbol: string
}

interface SwapTransaction {
  id: string
  timestamp: string
}

export interface Pairs {
  id: string
  reserveUsd: string
  token0: PairToken
  token1: PairToken
  volumeUsd: string
}

export interface Swaps {
  amount0In: string
  amount0Out: string
  amount1In: string
  amount1Out: string
  amountUsd: string
  pair: { token0: SwapToken; token1: SwapToken }
  to: string
  transaction: SwapTransaction
}

export interface Transactions {
  swaps: Swaps[]
}

export interface NativePrice {
  id: string
  ethPrice: string
}

export interface DaysData {
  dailyVolumeETH: string
  dailyVolumeUSD: string
  date: number
  id: string
  totalLiquidityETH: string
  totalLiquidityUSD: string
  totalVolumeUSD: string
  txCount: string
}

export interface Token {
  derivedETH: string
  id: string
  name: string
  symbol: string
  totalLiquidity: string
  tradeVolumeUSD: string
}

export interface Block {
  id: string
  number: string
  timestamp: string
}

export enum InfoStateTypes {
  PAIRS = 'pairs',
  TRANSACTIONS = 'transactions',
  NATIVE_PRICE = 'nativePrice',
  DAYS_DATA = 'daysData',
  TOKENS = 'tokens',
  BLOCK = 'block',
}

export interface InfoState {
  pairs: Record<ChainId, { data: Pairs[]; loading: boolean; initalized: boolean }>
  transactions: Record<ChainId, { data: Transactions[]; loading: boolean; initalized: boolean }>
  nativePrice: Record<ChainId, { data: NativePrice; loading: boolean; initalized: boolean }>
  daysData: Record<ChainId, { data: DaysData[]; loading: boolean; initalized: boolean }>
  tokens: Record<ChainId, { data: Token[]; loading: boolean; initalized: boolean }>
  block: Record<ChainId, { data: Block; loading: boolean; initalized: boolean }>
}
