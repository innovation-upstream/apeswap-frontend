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
