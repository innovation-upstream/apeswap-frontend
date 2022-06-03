import { createAction } from '@reduxjs/toolkit'

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

interface TransactionArgs {
  data: string
  destination: string
  gas: any | null
  gasPrice: any | null
  maxFeePerGas: any | null
  maxPriorityFeePerGas: any | null
  nonce: any | null
  sender: string
  value: string
}

interface SearchSummary {
  expectedProfit: number
  expectedUsdProfit: number
  firstTokenAddress: string
  firstTokenAmount: number
}

export interface WallchainParams {
  pathFound: boolean
  summary: { searchSummary: SearchSummary | null }
  transactionArgs: TransactionArgs
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>('swap/selectCurrency')
export const switchCurrencies = createAction<void>('swap/switchCurrencies')
export const typeInput = createAction<{ field: Field; typedValue: string }>('swap/typeInput')
export const setSwapDelay = createAction<{ swapDelay: SwapDelay }>('swap/swapDelay')
export const setBestRoute = createAction<{ bestRoute: WallchainParams | null }>('swap/bestRoute')
export const replaceSwapState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: string
  recipient: string | null
  swapDelay: SwapDelay
  bestRoute: WallchainParams | null 
}>('swap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('swap/setRecipient')
