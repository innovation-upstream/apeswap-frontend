import { Token } from 'config/constants/types'

export interface Bills {
  billType: string
  token: Token
  quoteToken: Token
  lpAddress?: string
  earnToken: Token
  price: number
  roi: number
  vestingTime: string
}

export interface InfoPair {
  id: string
  token0: {
    id: string
    symbol: string
    name: string
  }
  token1: {
    id: string
    symbol: string
    name: string
  }
  reserveUSD: number
  volumeUSD: number
  chain: string
}

export interface InfoToken {
  id: string
  name: string
  symbol: string
  totalLiquidity: number
  derivedETH: number
  tradeVolumeUSD: number
  chain: string
}

export interface InfoTransaction {
  chain: string
  swaps: [
    {
      to: string
      amountUSD: number
      pair: {
        token0: {
          id: string
          symbol: string
        }
        token1: {
          id: string
          symbol: string
        }
      }
      amount0In: number
      amount0Out: number
      amount1In: number
      amount1Out: number
      transaction: {
        id: any
        timestamp: number
      }
    },
  ]
}
