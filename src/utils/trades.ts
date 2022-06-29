import { Trade, Percent, currencyEquals } from '@apeswapfinance/sdk'
import { ZERO_PERCENT, ONE_HUNDRED_PERCENT } from '../config/constants/index'

// returns whether tradeB is better than tradeA by at least a threshold percentage amount
export function isTradeBetter(
  tradeA: Trade | undefined | null,
  tradeB: Trade | undefined | null,
  minimumDelta: Percent = ZERO_PERCENT,
): boolean | undefined {
  console.log(tradeA, tradeB, minimumDelta)
  if (tradeA && !tradeB) return false
  if (tradeB && !tradeA) return true
  if (!tradeA || !tradeB) return undefined
  console.warn('Made it past the first checks')

  if (
    tradeA.tradeType !== tradeB.tradeType ||
    !currencyEquals(tradeA.inputAmount.currency, tradeB.inputAmount.currency) ||
    !currencyEquals(tradeB.outputAmount.currency, tradeB.outputAmount.currency)
  ) {
    throw new Error('Trades are not comparable')
  }
  console.warn(tradeA.executionPrice.lessThan(tradeB.executionPrice))
  console.log(tradeB.priceImpact.toSignificant(6))
  console.warn(
    tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice),
  )
  if (minimumDelta.equalTo(ZERO_PERCENT)) {
    return tradeA.executionPrice.lessThan(tradeB.executionPrice)
  }
  return tradeA.executionPrice.raw.multiply(minimumDelta.add(ONE_HUNDRED_PERCENT)).lessThan(tradeB.executionPrice)
}

export default isTradeBetter
