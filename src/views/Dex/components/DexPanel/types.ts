import { Currency } from '@apeswapfinance/sdk'
import { Field } from 'state/swap/actions'

export interface DexPanelProps {
  value: string
  currency: Currency
  otherCurrency: Currency
  onCurrencySelect: (field: Field, currency: Currency) => void
  onUserInput: (field: Field, val: string) => void
  fieldType?: Field
  showCommonBases?: boolean
}
