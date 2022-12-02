import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import {
  fetchFarmV2UserEarnings,
  fetchFarmV2UserAllowances,
  fetchFarmV2UserTokenBalances,
  fetchFarmV2UserStakedBalances,
} from './fetchFarmV2User'
import { Farm, LpTokenPrices, FarmLpAprsType, AppThunk, FarmsV2State } from '../types'
import fetchFarmsV2 from './fetchFarmsV2'
import fetchFarmV2Config from './api'

const initialState: FarmsV2State = {
  data: [],
}

export const farmsV2Slice = createSlice({
  name: 'FarmsV2',
  initialState,
  reducers: {
    setInitialFarmV2Data: (state, action) => {
      state.data = action.payload
    },
    setFarmsV2PublicData: (state, action) => {
      const liveFarmsData: Farm[] = action.payload
      state.data = state.data.map((farm) => {
        const liveFarmData = liveFarmsData.find((f) => f.pid === farm.pid)
        return { ...farm, ...liveFarmData }
      })
    },
    setFarmV2UserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
    updateFarmV2UserData: (state, action) => {
      const { field, value, pid } = action.payload
      const index = state.data.findIndex((p) => p.pid === pid)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setInitialFarmV2Data, setFarmsV2PublicData, setFarmV2UserData, updateFarmV2UserData } =
  farmsV2Slice.actions

// Thunks
export const fetchFarmsV2PublicDataAsync =
  (chainId: number, lpPrices: LpTokenPrices[], bananaPrice: BigNumber, farmLpAprs: FarmLpAprsType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const farmsConfig = getState().farmsV2.data
      const farms = await fetchFarmsV2(chainId, lpPrices, bananaPrice, farmLpAprs, farmsConfig)
      dispatch(setFarmsV2PublicData(farms))
    } catch (error) {
      console.warn(error)
    }
  }
export const fetchFarmV2UserDataAsync =
  (chainId: number, account: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const farms = getState().farmsV2.data
      const userFarmAllowances = await fetchFarmV2UserAllowances(chainId, account, farms)
      const userFarmTokenBalances = await fetchFarmV2UserTokenBalances(chainId, account, farms)
      const userStakedBalances = await fetchFarmV2UserStakedBalances(chainId, account, farms)

      // TODO: Figure out why this was erroring out. Probably a new call
      const userFarmEarnings = await fetchFarmV2UserEarnings(chainId, account, farms)
      // console.log('past here 4', userFarmEarnings)

      const arrayOfUserDataObjects = userFarmAllowances.map((_, index) => {
        return {
          index,
          allowance: userFarmAllowances[index],
          tokenBalance: userFarmTokenBalances[index],
          stakedBalance: userStakedBalances[index],
          earnings: userFarmEarnings[index],
        }
      })
      dispatch(setFarmV2UserData({ arrayOfUserDataObjects }))
    } catch (error) {
      console.warn(error)
    }
  }

export const setInitialFarmV2DataAsync = (): AppThunk => async (dispatch) => {
  try {
    const initialFarmState: Farm[] = await fetchFarmV2Config()
    dispatch(setInitialFarmV2Data(initialFarmState || []))
  } catch (error) {
    console.error(error)
  }
}

export const updateFarmV2UserAllowances =
  (chainId: number, pid, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farmsV2.data
    const allowances = await fetchFarmV2UserAllowances(chainId, account, farms)
    dispatch(updateFarmV2UserData({ pid, field: 'allowance', value: allowances[pid] }))
  }

export const updateFarmV2UserTokenBalances =
  (chainId: number, pid, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farmsV2.data
    const tokenBalances = await fetchFarmV2UserTokenBalances(chainId, account, farms)
    dispatch(updateFarmV2UserData({ pid, field: 'tokenBalance', value: tokenBalances[pid] }))
  }

export const updateFarmV2UserStakedBalances =
  (chainId: number, pid, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farmsV2.data
    const stakedBalances = await fetchFarmV2UserStakedBalances(chainId, account, farms)
    dispatch(updateFarmV2UserData({ pid, field: 'stakedBalance', value: stakedBalances[pid] }))
  }

export const updateFarmV2UserEarnings =
  (chainId: number, pid, account: string): AppThunk =>
  async (dispatch, getState) => {
    const farms = getState().farmsV2.data
    const pendingRewards = await fetchFarmV2UserEarnings(chainId, account, farms)
    dispatch(updateFarmV2UserData({ pid, field: 'earnings', value: pendingRewards[pid] }))
  }

export default farmsV2Slice.reducer
