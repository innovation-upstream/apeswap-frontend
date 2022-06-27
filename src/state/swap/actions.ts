import { createAction } from '@reduxjs/toolkit'
import { RouterTypes } from 'config/constants'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export enum SwapDelay {
  INVALID = 'INVALID',
  INPUT_DELAY = 'INPUT_DELAY',
  INPUT_COMPLETE = 'INPUT_COMPLETE',
  LOADING_ROUTE = 'LOADING_ROUTE',
  VALID = 'VALID',
}

type SearchSummary = {
  expectedProfit?: number
  expectedUsdProfit?: number
  firstTokenAddress?: string
  firstTokenAmount?: number
  expectedKickbackProfit?: number
}

type TransactionArgs = {
  data: string
  destination: string
  sender: string
  value: string
  masterInput: string
}

export type DataResponse = {
  pathFound: boolean
  summary?: { searchSummary?: SearchSummary }
  transactionArgs: TransactionArgs
}

export interface RouterTypeParams {
  routerType: RouterTypes
  bonusRouter?: DataResponse
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>('swap/selectCurrency')
export const switchCurrencies = createAction<void>('swap/switchCurrencies')
export const typeInput = createAction<{ field: Field; typedValue: string }>('swap/typeInput')
export const setSwapDelay = createAction<{ swapDelay: SwapDelay }>('swap/swapDelay')
export const setBestRoute = createAction<{ bestRoute: RouterTypeParams }>('swap/bestRoute')
export const replaceSwapState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: string
  recipient: string | null
  swapDelay: SwapDelay
  bestRoute: RouterTypeParams
}>('swap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('swap/setRecipient')
