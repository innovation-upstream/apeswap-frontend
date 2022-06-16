import { Currency, CurrencyAmount, Pair, Percent, Price, TokenAmount } from '@apeswapfinance/sdk'

export interface RemoveLiquidityModalProps {
  pair: Pair
  title: string
  poolTokenPercentage: Percent
  txHash: string
  attemptingTxn: boolean
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: TokenAmount
    CURRENCY_A?: CurrencyAmount
    CURRENCY_B?: CurrencyAmount
  }
  onDismiss: () => void
  onRemove: () => void
}
