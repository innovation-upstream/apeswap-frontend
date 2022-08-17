import BigNumber from 'bignumber.js'

export interface ZapInsight {
  zapFromSymbol: string
  zapFromAddress: string
  zapFromAmount: string
  zapInto: {
    lpAddress: string
    liquidityMinted: string
    tokenASymbol: string
    tokenAAddress: string
    tokenAAmount: string
    tokenBSymbol: string
    tokenBAddress: string
    tokenBAmount: string
  }
  shareOfPool: string
}

export interface ParsedFarm {
  lpSymbol: string
  lpAddress: string
  lpValueUsd: string
  tokenAddress: string
  tokenSymbol: string
  quoteTokenAddress: string
  quoteTokenSymbol: string
  userData: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}
