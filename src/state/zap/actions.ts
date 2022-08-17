import { createAction } from '@reduxjs/toolkit'
import { Currency, Token } from '@apeswapfinance/sdk'
import { ParsedFarm } from 'components/DualLiquidityModal/types'

export const setZap = createAction<{ zapInto: ParsedFarm; zapFrom: Currency }>('zap/setZap')
export const selectToken = createAction<{ zapFrom: Currency }>('zap/selectToken')
export const selectLP = createAction<{ zapInto: ParsedFarm }>('zap/selectLP')
export const setInputList = createAction<{ zapInputList: { [symbol: string]: Token } }>('zap/setInputList')
export const setOutputList = createAction<{ zapOutputList: ParsedFarm[] }>('zap/setOutputList')
