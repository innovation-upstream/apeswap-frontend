import { Currency, CurrencyAmount, Pair, Percent, Price, TokenAmount, Trade } from '@apeswapfinance/sdk'
import { RouterTypes } from 'config/constants'
import { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'

export interface RemoveLiquidityActionProps {
  pair: Pair
  parsedAmounts: {
    LIQUIDITY_PERCENT: Percent
    LIQUIDITY?: TokenAmount
    CURRENCY_A?: CurrencyAmount
    CURRENCY_B?: CurrencyAmount
  }
  error: string
  poolTokenPercentage: Percent
}
