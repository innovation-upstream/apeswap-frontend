import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { State, TokenPricesState } from 'state/types'
import { fetchTokenPrices, setInitialTokensDataAsync } from '.'

const ZERO = new BigNumber(0)

export const useFetchTokenPrices = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  const { chainId } = useActiveWeb3React()
  const { tokens }: TokenPricesState = useSelector((state: State) => state.tokenPrices)
  if (tokens.length === 0) {
    dispatch(setInitialTokensDataAsync())
  }
  useEffect(() => {
    dispatch(fetchTokenPrices(chainId, tokens))
  }, [dispatch, slowRefresh, tokens, chainId])
}

export const useTokenPrices = () => {
  const { isInitialized, isLoading, data }: TokenPricesState = useSelector((state: State) => state.tokenPrices)
  return { tokenPrices: data, isInitialized, isLoading }
}

// Prices
export const usePriceBananaBusd = (): BigNumber => {
  const tokenPrices = useTokenPrices()
  const price = new BigNumber(tokenPrices?.tokenPrices?.find((token) => token.symbol === 'BANANA')?.price)
  return price || ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const tokenPrices = useTokenPrices()
  const price = new BigNumber(tokenPrices?.tokenPrices?.find((token) => token.symbol === 'BNB')?.price)
  return price || ZERO
}

export const usePriceGnanaBusd = (): BigNumber => {
  const bananaPrice = usePriceBananaBusd()
  return bananaPrice.times(1.3889)
}
