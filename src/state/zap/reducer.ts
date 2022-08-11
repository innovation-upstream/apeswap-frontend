import { createReducer } from '@reduxjs/toolkit'
import { Field, replaceZapState, selectInputCurrency, selectOutputCurrency, setRecipient, typeInput } from './actions'

export interface ZapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currency1: string | undefined
    readonly currency2: string | undefined
  }
  readonly recipient: string | null
}

const initialState: ZapState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    currency1: '',
    currency2: '',
  },
  recipient: null,
}

export default createReducer<ZapState>(initialState, (builder) =>
  builder
    .addCase(replaceZapState, (state, { payload: { typedValue, recipient, inputCurrencyId, outputCurrencyId } }) => {
      return {
        [Field.INPUT]: {
          currencyId: inputCurrencyId,
        },
        [Field.OUTPUT]: outputCurrencyId,
        independentField: Field.INPUT,
        typedValue,
        recipient,
      }
    })
    .addCase(selectInputCurrency, (state, { payload: { currencyId } }) => {
      return {
        ...state,
        [Field.INPUT]: { currencyId },
      }
    })
    .addCase(selectOutputCurrency, (state, { payload: { currency1, currency2 } }) => {
      return {
        ...state,
        [Field.OUTPUT]: { currency1, currency2 },
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
    }),
)
