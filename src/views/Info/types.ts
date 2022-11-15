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
    symbol: string
    name: string
  }
  token1: {
    symbol: string
    name: string
  }
  reserveUSD: number
  volumeUSD: number
}
