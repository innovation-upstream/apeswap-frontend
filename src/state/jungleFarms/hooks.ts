import { CHAIN_ID } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useNetworkChainId } from 'state/hooks'
import { useFetchTokenPrices, useTokenPrices } from 'state/tokenPrices/hooks'
import { JungleFarm, State, StatsState } from 'state/types'
import { fetchJungleFarmsPublicDataAsync, fetchJungleFarmsUserDataAsync, setInitialJungleFarmDataAsync } from '.'

export const usePollJungleFarms = () => {
  const chainId = useNetworkChainId()
  const { tokenPrices } = useTokenPrices()

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (chainId === CHAIN_ID.BSC) {
      dispatch(fetchJungleFarmsPublicDataAsync(chainId, tokenPrices))
    }
  }, [dispatch, tokenPrices, chainId])
}

export const useJungleFarms = (account): JungleFarm[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    if (account && (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET)) {
      dispatch(fetchJungleFarmsUserDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])

  const farms = useSelector((state: State) => state.jungleFarms.data)
  return farms
}

export const useSetJungleFarms = () => {
  useFetchTokenPrices()
  const dispatch = useAppDispatch()
  const jungleFarms = useJungleFarms(null)
  if (jungleFarms.length === 0) {
    dispatch(setInitialJungleFarmDataAsync())
  }
}

export const useJungleFarmTags = (chainId: number) => {
  const { Tags }: StatsState = useSelector((state: State) => state.stats)
  const jungleFarmTags = Tags?.[`${chainId}`]?.jungleFarms

  return { jungleFarmTags }
}

export const useJungleFarmOrderings = (chainId: number) => {
  const { Ordering }: StatsState = useSelector((state: State) => state.stats)
  const jungleFarmOrderings = Ordering?.[`${chainId}`]?.jungleFarms

  return { jungleFarmOrderings }
}
