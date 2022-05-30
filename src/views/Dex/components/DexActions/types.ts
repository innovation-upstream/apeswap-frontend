import { Currency, Trade } from '@apeswapfinance/sdk'
import { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'

export interface DexActionProps {
  trade: Trade
  swapInputError: string
  isExpertMode: boolean
  showWrap: boolean
  wrapType: WrapType
  onWrap: () => void
}
