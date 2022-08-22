import { Currency, Token, ZapType } from '@ape.swap/sdk'
import { createReducer } from '@reduxjs/toolkit'
import {
  Field,
  replaceZapState,
  selectInputCurrency,
  selectLP,
  selectOutputCurrency,
  selectToken,
  setInputList,
  setOutputList,
  setRecipient,
  setZap,
  setZapSlippage,
  setZapType,
  typeInput,
} from './actions'
import BigNumber from 'bignumber.js'

export interface ParsedFarm {
  lpSymbol: string
  lpAddress: string
  lpValueUsd: string
  currency1: string
  currency1Symbol: string
  currency2: string
  currency2Symbol: string
  userData: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface ZapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly zapType: ZapType
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: ParsedFarm | undefined
  readonly shareOfPool: string | undefined
  readonly recipient: string | null
  readonly zapInputList: { [symbol: string]: Token } | null
  readonly zapOutputList: ParsedFarm[] | null
  readonly zapSlippage: number
}

const initialState: ZapState = {
  independentField: Field.INPUT,
  zapType: ZapType.ZAP,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    lpSymbol: '',
    lpAddress: '',
    lpValueUsd: '',
    currency1: '',
    currency1Symbol: '',
    currency2: '',
    currency2Symbol: '',
    userData: {
      allowance: undefined,
      tokenBalance: undefined,
      stakedBalance: undefined,
      earnings: undefined,
    },
  },
  shareOfPool: '',
  recipient: null,
  zapInputList: null,
  zapOutputList: null,
  zapSlippage: 100,
}

export default createReducer<ZapState>(initialState, (builder) =>
  builder
    .addCase(
      replaceZapState,
      (state, { payload: { typedValue, recipient, inputCurrencyId, outputCurrencyId, zapType } }) => {
        return {
          ...state,
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            ...state[Field.OUTPUT],
            currency1: outputCurrencyId.currency1,
            currency2: outputCurrencyId.currency2,
          },
          independentField: Field.INPUT,
          zapType,
          typedValue,
          recipient,
        }
      },
    )
    .addCase(selectInputCurrency, (state, { payload: { currencyId } }) => {
      return {
        ...state,
        [Field.INPUT]: { currencyId },
      }
    })
    .addCase(selectOutputCurrency, (state, { payload: { currency1, currency2 } }) => {
      return {
        ...state,
        [Field.OUTPUT]: { ...state[Field.OUTPUT], currency1, currency2 },
      }
    })
    .addCase(typeInput, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        independentField: Field.INPUT,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    })
    .addCase(setZapType, (state, { payload: { zapType } }) => {
      state.zapType = zapType
    })
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
    .addCase(selectLP, (state, { payload: { outPut } }) => {
      return {
        ...state,
        [Field.OUTPUT]: outPut,
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
    })
    .addCase(setZapSlippage, (state, { payload: { zapSlippage } }) => {
      return {
        ...state,
        zapSlippage,
      }
    }),
)
