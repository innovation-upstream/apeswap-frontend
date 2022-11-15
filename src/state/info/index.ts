import { InfoState } from '../types'
import { getInfoPairs } from './api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CHAINS } from '../../views/Info/config/config'

import { InfoPair } from '../../views/Info/types'

export const fetchInfoPairs = (amount: number) => async (dispatch) => {
  for (let i = 0; i < CHAINS.length; i++) {
    const chain = CHAINS[i].chain
    const data = await getInfoPairs(amount, CHAINS[i].graphAddress)
    console.log('--')
    console.log(data)
    console.log('--')

    const result = { chain: chain, data: data }
    dispatch(setInfoPairs(result))
  }
}

const initialState: InfoState = {
  isInitialized: false,
  isLoading: true,
  pairs: [],
}

export const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfoPairs: (state, action) => {
      for (let i = 0; i < action.payload.data.length; i++) {
        action.payload.data[i].chain = action.payload.chain
      }

      //Need a way to update instead of just adding to the array each time

      // @ts-ignore
      state.pairs.push(action.payload.data)
    },
  },
})

// Actions
export const { setInfoPairs } = infoSlice.actions

export default infoSlice.reducer
