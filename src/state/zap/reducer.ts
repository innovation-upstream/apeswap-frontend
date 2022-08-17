import { createReducer } from '@reduxjs/toolkit'
import { setZap, selectToken, selectLP, setInputList, setOutputList } from './actions'
import { Currency, Token } from '@apeswapfinance/sdk'
import { ParsedFarm } from '../../components/DualLiquidityModal/types'

export interface ZapState {
  readonly zapInto: ParsedFarm
  readonly zapFrom: Currency
  readonly zapInputList: { [symbol: string]: Token }
  readonly zapOutputList: ParsedFarm[]
}

const initialState: ZapState = {
  zapInto: null,
  zapFrom: null,
  zapInputList: null,
  zapOutputList: null,
}

export default createReducer<ZapState>(initialState, (builder) =>
  builder
    .addCase(setZap, (state, { payload: { zapInto, zapFrom } }) => {
      return {
        ...state,
        zapInto,
        zapFrom,
      }
    })
    .addCase(selectToken, (state, { payload: { zapFrom } }) => {
      return {
        ...state,
        zapFrom,
      }
    })
    .addCase(selectLP, (state, { payload: { zapInto } }) => {
      return {
        ...state,
        zapInto,
      }
    })
    .addCase(setInputList, (state, { payload: { zapInputList } }) => {
      return {
        ...state,
        zapInputList,
      }
    })
    .addCase(setOutputList, (state, { payload: { zapOutputList } }) => {
      return {
        ...state,
        zapOutputList,
      }
    }),
)
