import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import multicall from 'utils/multicall'
import tokens from 'config/constants/tokens'
import { getBalanceNumber } from 'utils/formatBalance'
import { getApePriceGetterAddress } from 'utils/addressHelpers'
import { getPools } from 'hooks/api'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const fetchPrices = async () => {
  const apePriceGetter = getApePriceGetterAddress()
  const pools = await getPools()
  let tokenList = pools.reduce((a, v) => ({ ...a, [v.rewardToken.symbol.toLowerCase()]: v.rewardToken }), {})
  tokenList = {
    ...tokens,
    ...tokenList,
  }
  const calls = Object.keys(tokenList).map((token, i) => {
    if (tokenList[token].lpToken) {
      return {
        address: apePriceGetter,
        name: 'getLPPrice',
        params: [tokenList[token].address[CHAIN_ID], tokenList[token].decimals],
      }
    }
    return {
      address: apePriceGetter,
      name: 'getPrice',
      params: [tokenList[token].address[CHAIN_ID], tokenList[token].decimals],
    }
  })

  const tokenPrices = await multicall(apePriceGetterABI, calls)

  const mappedTokenPrices = Object.keys(tokenList).map((token, i) => {
    return {
      symbol: tokenList[token].symbol,
      address: tokenList[token].address,
      price:
        tokenList[token].symbol === 'GNANA'
          ? getBalanceNumber(tokenPrices[0], tokenList[token].decimals) * 1.389
          : getBalanceNumber(tokenPrices[i], tokenList[token].decimals),
      decimals: tokenList[token].decimals,
    }
  })

  return mappedTokenPrices
}

export default fetchPrices
