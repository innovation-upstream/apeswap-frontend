import { Currency } from '@apeswapfinance/sdk'
import { Field } from 'state/swap/actions'

export interface InputPanelProps {
  value: string
  fromToken?: Currency
  toToken?: Currency
  panelText: string
  disabled?: boolean
  onUserInput: (value: string) => void
  handleMaxInput?: (field: any) => void
  setTradeValueUsd?: (val: number) => void
  fieldType?: Field
  independentField?: Field
  fullBalance?: string
}
