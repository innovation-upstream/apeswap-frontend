import { Pair } from '@ape.swap/sdk'

const getCleanLpSymbol = (pair: Pair, chainId) => {
  const symbol0 = pair?.token0?.getSymbol(chainId)
  const symbol1 = pair?.token1?.getSymbol(chainId)
  const removeW = (symbol) => {
    if (symbol === 'WMATIC') return 'MATIC'
    if (symbol === 'BTCB') return 'BTC'
    if (symbol === 'WBTC') return 'BTC'
    if (symbol === 'WETH') return 'ETH'
    if (symbol === 'WBNB') return 'BNB'
    return symbol
  }
  return `${removeW(symbol1)}-${removeW(symbol0)}`
}

export default getCleanLpSymbol
