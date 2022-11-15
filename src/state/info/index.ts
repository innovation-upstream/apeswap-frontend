/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { InfoState } from './types'
import { getInfoPairs, getBlocks, getDaysData, getNativePrices, getTokens, getTransactions } from './api'
import { MAINNET_CHAINS } from 'config/constants/chains'
import { ChainId } from '@ape.swap/sdk'

const dataAsListInitialState = {} as Record<ChainId, { data: []; loading: boolean; initialized: boolean }>
const dataAsNullInitialState = {} as Record<ChainId, { data: null; loading: boolean; initialized: boolean }>
MAINNET_CHAINS.forEach((chainId) => {
  dataAsListInitialState[chainId] = { data: [], loading: false, initialized: false }
  dataAsNullInitialState[chainId] = { data: null, loading: false, initialized: false }
})

const initialState: InfoState = {
  pairs: dataAsListInitialState,
  transactions: dataAsListInitialState,
  nativePrice: dataAsNullInitialState,
  daysData: dataAsListInitialState,
  tokens: dataAsListInitialState,
  block: dataAsNullInitialState,
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setPairs: (state, action) => {
      const { data, chainId, loading, initialized } = action.payload
      state.pairs[chainId] = { data, loading, initialized }
    },
    setTransactions: (state, action) => {
      const { data, chainId, loading, initialized } = action.payload
      state.transactions[chainId] = { data, loading, initialized }
    },
    setNativePrice: (state, action) => {
      const { data, chainId, loading, initialized } = action.payload
      state.nativePrice[chainId] = { data, loading, initialized }
    },
    setDaysData: (state, action) => {
      const { data, chainId, loading, initialized } = action.payload
      state.daysData[chainId] = { data, loading, initialized }
    },
    setTokens: (state, action) => {
      const { data, chainId, loading, initialized } = action.payload
      state.tokens[chainId] = { data, loading, initialized }
    },
    setBlock: (state, action) => {
      const { data, chainId, loading, initialized } = action.payload
      state.block[chainId] = { data, loading, initialized }
    },
    setLoading: (state, action) => {
      const { stateType, chainId, loading } = action.payload
      state[stateType][chainId] = { ...state[stateType][chainId], loading }
    },
  },
})

// Actions
export const { setPairs, setTransactions, setNativePrice, setDaysData, setTokens, setBlock, setLoading } =
  infoSlice.actions

// Thunks
export const fetchPairs = (chainId: ChainId, amount: number) => async (dispatch) => {
  const data = await getInfoPairs(chainId, amount)
  dispatch(setPairs({ data, chainId, loading: false, initialized: true }))
}

export const fetchTransactions = (chainId: ChainId, amount: number) => async (dispatch) => {
  const data = await getTransactions(chainId, amount)
  dispatch(setTransactions({ data, chainId, loading: false, initialized: true }))
}

export const fetchNativePrice = (chainId: ChainId) => async (dispatch) => {
  const data = await getNativePrices(chainId)
  dispatch(setNativePrice({ data, chainId, loading: false, initialized: true }))
}

export const fetchDaysData = (chainId: ChainId, oneDayBack: number) => async (dispatch) => {
  const data = await getDaysData(chainId, oneDayBack)
  dispatch(setDaysData({ data, chainId, loading: false, initialized: true }))
}

export const fetchTokens = (chainId: ChainId, amount: number, block: string) => async (dispatch) => {
  const data = await getTokens(chainId, amount, block)
  dispatch(setTokens({ data, chainId, loading: false, initialized: true }))
}

export const fetchBlock = (chainId: ChainId, startTimestamp: number, currentTimestamp: number) => async (dispatch) => {
  const data = await getBlocks(chainId, startTimestamp, currentTimestamp)
  dispatch(setBlock({ data, chainId, loading: false, initialized: true }))
}

export default infoSlice.reducer
