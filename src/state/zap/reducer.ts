import { Token, ZapType } from '@ape.swap/sdk'
import { createReducer } from '@reduxjs/toolkit'
import {
  Field,
  replaceZapState,
  selectInputCurrency,
  selectLP,
  selectOutputCurrency,
  setInputList,
  setRecipient,
  setZapOutputList,
  setZapSlippage,
  setZapType,
  typeInput,
} from './actions'

export interface ParsedFarm {
  lpSymbol: string
  lpAddress: string
  currency1: string
  currency1Symbol: string
  currency2: string
  currency2Symbol: string
  userBalance: string
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
  readonly zapInputList: { [symbol: string]: Token } | undefined
  readonly zapOutputList: ParsedFarm[] | undefined
  readonly zapSlippage: number
}

const initialState: ZapState = {
  independentField: Field.INPUT,
  zapType: ZapType.ZAP,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: 'ETH',
  },
  [Field.OUTPUT]: {
    lpSymbol: 'BANANA-BNB',
    lpAddress: '0xF65C1C0478eFDe3c19b49EcBE7ACc57BB6B1D713',
    currency1: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95',
    currency1Symbol: 'BANANA',
    currency2: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    currency2Symbol: 'BNB',
    userBalance: null,
  },
  shareOfPool: '',
  recipient: null,
  zapInputList: null,
  zapOutputList: [],
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
    .addCase(setZapOutputList, (state, { payload: { zapOutputList } }) => {
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
