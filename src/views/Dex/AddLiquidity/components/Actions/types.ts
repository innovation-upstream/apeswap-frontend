import { Currency, CurrencyAmount, Percent, Price, TokenAmount, Trade } from '@apeswapfinance/sdk'
import { RouterTypes } from 'config/constants'
import { WrapType } from 'hooks/useWrapCallback'
import { Field } from 'state/swap/actions'

export interface AddLiquidityActionsProps {
  currencies: { CURRENCY_A?: Currency; CURRENCY_B?: Currency }
  parsedAmounts: { CURRENCY_A?: CurrencyAmount; CURRENCY_B?: CurrencyAmount }
  error: string
  noLiquidity: boolean
  price: Price
  poolTokenPercentage: Percent
  liquidityMinted: TokenAmount
}
