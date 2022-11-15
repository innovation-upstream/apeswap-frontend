import { MAINNET_CHAINS } from 'config/constants/chains'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { State } from 'state/types'
import { fetchBlock, fetchDaysData, fetchNativePrice, fetchPairs, fetchTokens, fetchTransactions, setLoading } from '.'
import { InfoStateTypes } from './types'

export const useFetchInfoPairs = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.PAIRS, chainId, loading: true }))
      dispatch(fetchPairs(chainId, 10))
    })
  }, [slowRefresh, dispatch])

  return useSelector((state: State) => state.info.pairs)
}

export const useFetchInfoTransactions = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.TRANSACTIONS, chainId, loading: true }))
      dispatch(fetchTransactions(chainId, 10))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.transactions)
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

export const useFetchInfoTokensData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.TOKENS, chainId, loading: true }))
      dispatch(fetchTokens(chainId, 10, 1231023))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.tokens)
}

export const useFetchInfoBlock = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    MAINNET_CHAINS.forEach((chainId) => {
      dispatch(setLoading({ stateType: InfoStateTypes.BLOCK, chainId, loading: true }))
      dispatch(fetchBlock(chainId, 123123213, 1231231231))
    })
  }, [slowRefresh, dispatch])
  return useSelector((state: State) => state.info.block)
}
