import { Currency, Percent, Trade } from '@apeswapfinance/sdk'
import { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'

export interface DexActionProps {
  trade: Trade
  swapInputError: string
  isExpertMode: boolean
  showWrap: boolean
  wrapType: WrapType
  priceImpactWithoutFee: Percent
  swapCallbackError: string
  userHasSpecifiedInputOutput: boolean
  onWrap: () => void
  handleSwap: () => void
  onPresentConfirmModal: () => void
  setSwapState: React.Dispatch<
    React.SetStateAction<{
      tradeToConfirm: Trade | undefined
      attemptingTxn: boolean
      swapErrorMessage: string | undefined
      txHash: string | undefined
    }>
  >
}
