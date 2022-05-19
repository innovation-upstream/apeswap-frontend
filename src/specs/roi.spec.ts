import * as fc from 'fast-check'
import { tokenEarnedPerThousandDollarsCompounding, apyModalRoi } from '../utils/compoundApyHelpers'

const compoundInterest = (p: number, t: number, r: number, n: number) => {
  const amount = p * (1 + r / n) ** (n * t)
  const interest = amount - p
  return interest
}

test('value should be correct', () => {
  fc.assert(
    fc.property(
      fc.nat(),
      fc.float(),
      fc.float(),
      fc.float(),
      fc.float(),
      fc.float(),
      fc.nat(),
      (data, a, b, c, d, e, f) => {
        const numberOfDays = data
        const apr = a
        const lpApr = b
        const tokenPrice = c
        const amountDollars = d
        const inputValue = e
        const compoundFrequency = f
        const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
          numberOfDays,
          farmApr: apr + lpApr,
          tokenPrice,
          // Get the fraction of 1 day
          compoundFrequency: 1 / compoundFrequency,
          amountDollar: amountDollars || inputValue,
        })
        expect(compoundROIRates).toEqual(compoundInterest(d / c, data * 365, (a + b) * 100, f * 365))
      },
    ),
  )
})

test('percentage Should be correct ', () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), (data, b) => {
      function percentage(partialValue, totalValue) {
        return ((100 * partialValue) / totalValue).toFixed(2).toString()
      }

      const compoundROIRates = data
      const bananaWorthForDollarSelected = b
      const percentageCompound = apyModalRoi({
        amountEarned: compoundROIRates,
        amountInvested: bananaWorthForDollarSelected,
      })
      expect(percentageCompound).toEqual(percentage(data, b))
    }),
  )
})
