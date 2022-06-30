import { getApePriceGetterAddress, getNativeWrappedAddress } from 'utils/addressHelper'
import apePriceGetterABI from 'config/abi/apePriceGetter.json'
import { getBalanceNumber } from 'utils/formatBalance'
import multicall from 'utils/multicall'
import { Currency, Token } from '@apeswapfinance/sdk'

export const getTokenUsdPrice = async (
  chainId: number,
  tokenAddress: string,
  tokenDecimal: number,
  lp?: boolean,
  isNative?: boolean,
) => {
  const apePriceGetterAddress = getApePriceGetterAddress(chainId)
  const nativeTokenAddress = getNativeWrappedAddress(chainId)
  if (!apePriceGetterAddress) return 0
  if ((tokenAddress || isNative) && tokenDecimal) {
    const call = lp
      ? {
          address: apePriceGetterAddress,
          name: 'getLPPrice',
          params: [tokenAddress, 18],
        }
      : {
          address: apePriceGetterAddress,
          name: 'getPrice',
          params: [isNative ? nativeTokenAddress : tokenAddress, tokenDecimal],
        }

    const tokenPrice = await multicall(chainId, apePriceGetterABI, [call])
    const filterPrice = getBalanceNumber(tokenPrice[0], tokenDecimal)
    return filterPrice
  }
  return null
}

export const getCurrencyUsdPrice = async (chainId: number, currency: Currency, lp = false) => {
  const isNative = currency?.symbol === 'ETH'
  const [address, decimals] = currency instanceof Token ? [currency?.address, currency?.decimals] : ['', 18]
  const apePriceGetterAddress = getApePriceGetterAddress(chainId)
  const nativeTokenAddress = getNativeWrappedAddress(chainId)
  if ((address || isNative) && decimals) {
    const call = lp
      ? {
          address: apePriceGetterAddress,
          name: 'getLPPrice',
          params: [address, 18],
        }
      : {
          address: apePriceGetterAddress,
          name: 'getPrice',
          params: [isNative ? nativeTokenAddress : address, decimals],
        }

    const tokenPrice = await multicall(chainId, apePriceGetterABI, [call])
    const filterPrice = getBalanceNumber(tokenPrice[0], decimals)
    return filterPrice
  }
  return null
}
