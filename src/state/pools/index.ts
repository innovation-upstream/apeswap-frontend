/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import poolsConfig from 'config/constants/pools'
import { getPools } from 'hooks/api'
import { fetchPoolsBlockLimits, fetchPoolsTotalStatking, fetchPoolTokenStatsAndApr } from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { PoolsState, Pool, TokenPrices } from '../types'

const initialState: PoolsState = { data: [...poolsConfig], isLoading: true }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool.sousId)
        return { ...pool, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
    setPools: (state, action) => {
      state.data = action.payload
      state.isLoading = false
    },
    setPoolsFetchStart: (state) => {
      state.isLoading = true
    },
    setPoolsFetchFailed: (state) => {
      state.isLoading = false
    },
  },
})

// Actions
export const {
  setPoolsPublicData,
  setPoolsUserData,
  updatePoolsUserData,
  setPools,
  setPoolsFetchStart,
  setPoolsFetchFailed,
} = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = (tokenPrices: TokenPrices[], pools) => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits(pools)
  const totalStakings = await fetchPoolsTotalStatking(pools)
  const tokenStatsAndAprs = await fetchPoolTokenStatsAndApr(tokenPrices, totalStakings, pools)
  const liveData = await Promise.all(
    pools.map(async (pool) => {
      const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
      const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
      const tokenStatsAndApr = tokenStatsAndAprs.find((entry) => entry.sousId === pool.sousId)
      // const lpData = pool.lpStaking ? await fetchReserveData(pool.stakingTokenAddress[CHAIN_ID]) : null
      return {
        ...blockLimit,
        ...totalStaking,
        ...tokenStatsAndApr,
      }
    }),
  )
  dispatch(setPoolsPublicData(liveData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const pools = await getPools()
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)
  const userData = pools.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    pendingReward: pendingRewards[pool.sousId],
  }))
  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default PoolsSlice.reducer

export const fetchAndSetPools = () => async (dispatch) => {
  try {
    dispatch(setPoolsFetchStart())
    const pools = await getPools()
    dispatch(setPools(pools))
  } catch (error) {
    dispatch(setPoolsFetchFailed())
  }
}
