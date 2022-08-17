import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { ApiResponse } from './types'

const baseURL = 'http://localhost:8000/stats'

export const statsApi = axios.create({ baseURL })

const initialState = { userHoldings: {}, userStats: [] }

const statsDataSlice = createSlice({
  name: 'StatsData',
  initialState,
  reducers: {
    setStatsUserData: (state, action) => {
      state = action.payload
    },
  },
})

export const fetchUserStatsAsync = (account: string) => async (dispatch) => {
  try {
    const statsData = (await axios.get<ApiResponse>(`${baseURL}/${account}`)).data
    dispatch(setStatsUserData(statsData))
  } catch (error) {
    console.warn(error)
  }
}

export const { setStatsUserData } = statsDataSlice.actions

export default statsDataSlice.reducer
