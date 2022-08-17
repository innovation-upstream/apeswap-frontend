import { AppState, useAppDispatch } from '../index'
import { useSelector } from 'react-redux'
import { useCurrency } from '../../hooks/Tokens'
import { selectToken, setInputList } from './actions'
import { AppThunk } from '../types'
import { Token } from '@apeswapfinance/sdk'
import fetchZapInputTokens from './api'
import { TokenAddressMap, WrappedTokenInfo } from '../lists/hooks'
import { fromPairs, groupBy } from 'lodash'

export function useZapState(): AppState['zap'] {
  return useSelector<AppState, AppState['zap']>((state) => state.zap)
}

export function useZapInputList(): { [address: string]: Token } {
  const { zapInputList } = useZapState()
  if (!zapInputList) return
  return zapInputList
}

export const useSetZapData = () => {
  const dispatch = useAppDispatch()
  const { zapInputList, zapFrom } = useZapState()
  if (!zapInputList) {
    dispatch(setInitialZapDataAsync())
  }
  const busd = useCurrency('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
  if (!zapFrom) {
    dispatch(selectToken({ zapFrom: busd }))
  }
}

export const setInitialZapDataAsync = (): AppThunk => async (dispatch) => {
  try {
    const resp: { [symbol: string]: Token } = await fetchZapInputTokens()
    if (resp) dispatch(setInputList({ zapInputList: resp }))
  } catch (error) {
    console.error(error)
  }
}

//this function could be used to parse the zapList so it can be used for DexPanel component
const parseZapInput = (chainId, zapInputList) => {
  const tokenMap = []
  Object.values(zapInputList).map((token: any) => {
    const addressesEntries = Object.entries(token.address)
    const mapedTokensByAddresses = []
    addressesEntries.forEach((address) => {
      if (address[1] === '') return
      mapedTokensByAddresses.push({
        address: address[1],
        chainId: address[0],
        decimals: token.decimals,
        symbol: token.symbol,
      })
    })
    mapedTokensByAddresses.forEach((mappedToken) => {
      tokenMap.push(new WrappedTokenInfo(mappedToken, []))
    })
  })

  const groupedTokenMap: { [chainId: string]: WrappedTokenInfo[] } = groupBy(tokenMap, (tokenInfo) => tokenInfo.chainId)
  const tokenAddressMap = fromPairs(
    Object.entries(groupedTokenMap).map(([chainId, tokenInfoList]) => [
      chainId,
      fromPairs(tokenInfoList.map((tokenInfo) => [tokenInfo.address, { token: tokenInfo }])),
    ]),
  ) as TokenAddressMap

  return Object.keys(tokenAddressMap[chainId] ?? {}).reduce<{ [address: string]: Token }>((newMap, address) => {
    newMap[address] = tokenAddressMap[chainId][address].token
    return newMap
  }, {})
}
