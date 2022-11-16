import { MAINNET_CHAINS } from 'config/constants/chains'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { State } from 'state/types'
import {
  fetchBlock,
  fetchChartData,
  fetchDaysData,
  fetchNativePrice,
  fetchPairs,
  fetchTokenDaysData,
  fetchTokens,
  fetchTransactions,
  fetchUniswapFactories,
  setLoading,
} from '.'
import { InfoStateTypes } from './types'

export const useFetchInfoPairs = (amount: number) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.PAIRS, chainId, loading: true }))
      dispatch(fetchPairs(chainId, amount))
    })
  }, [slowRefresh, dispatch])

  return useSelector((state: State) => state.info.pairs)
}

export const useFetchInfoTransactions = (amount: number) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.TRANSACTIONS, chainId, loading: true }))
      dispatch(fetchTransactions(chainId, amount))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.transactions)
}

export const useFetchInfoTokenDaysData = (chain: number, address: string) => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    dispatch(setLoading({ stateType: InfoStateTypes.TOKENDAYSDATA, chain, loading: true }))
    dispatch(fetchTokenDaysData(chain, address))
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.tokenDaysData)
}

export const useFetchInfoNativePrice = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.NATIVE_PRICE, chainId, loading: true }))
      dispatch(fetchNativePrice(chainId))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.nativePrice)
}

export const useFetchInfoDaysData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.DAYS_DATA, chainId, loading: true }))
      dispatch(fetchDaysData(chainId, 1))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.daysData)
}

export const useFetchInfoTokensData = (current?: boolean) => {
  const dispatch = useAppDispatch()
  const blocks = useSelector((state: State) => state.info.block)
  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      if (current === true) {
        dispatch(setLoading({ stateType: InfoStateTypes.TOKENS, chainId, loading: true }))
      } else {
        dispatch(setLoading({ stateType: InfoStateTypes.TOKENSDAYOLD, chainId, loading: true }))
      }

      if (blocks[chainId].initialized) {
        dispatch(fetchTokens(chainId, 10, current === true ? '0' : blocks[chainId].data.number))
      }
    })
  }, [blocks, dispatch])
  return useSelector((state: State) => (current === true ? state.info.tokens : state.info.tokensDayOld))
}

export const useFetchInfoBlock = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    const currentTime = Math.round(new Date().getTime() / 1000)
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.BLOCK, chainId, loading: true }))
      dispatch(fetchBlock(chainId, currentTime - 24 * 60 * 60, currentTime))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.block)
}

export const useFetchChartData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.CHARTDATA, chainId, loading: true }))
      dispatch(fetchChartData(chainId))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.chartData)
}

export const useFetchInfoUniswapFactories = (current?: boolean) => {
  const dispatch = useAppDispatch()
  const blocks = useSelector((state: State) => state.info.block)
  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      if (current === true) {
        dispatch(setLoading({ stateType: InfoStateTypes.CURRENTDAYFACTORIES, chainId, loading: true }))
      } else {
        dispatch(setLoading({ stateType: InfoStateTypes.DAYOLDFACTORIES, chainId, loading: true }))
      }

      if (blocks[chainId].initialized) {
        dispatch(fetchUniswapFactories(chainId, current === true ? '0' : blocks[chainId].data.number))
      }
    })
  }, [blocks, dispatch])

  return useSelector((state: State) => (current === true ? state.info.currentDayFactories : state.info.dayOldFactories))
}
