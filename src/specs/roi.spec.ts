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
      (numberOfDays, apr, lpApr, tokenPrice, amountDollars, inputValue, compoundFrequency) => {
        // Calling function
        const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
          numberOfDays,
          farmApr: apr + lpApr,
          tokenPrice,
          // Get the fraction of 1 day
          compoundFrequency: 1 / compoundFrequency,
          amountDollar: amountDollars || inputValue,
        })
        // Checking with formula
        expect(compoundROIRates).toEqual(
          compoundInterest(
            amountDollars / tokenPrice,
            numberOfDays * 365,
            (apr + lpApr) * 100,
            compoundFrequency * 365,
          ),
        )
      },
    ),
  )
})

test('percentage Should be correct ', () => {
  fc.assert(
    fc.property(fc.float(), fc.float(), (compoundROIRates, bananaWorthForDollarSelected) => {
      function percentage(partialValue, totalValue) {
        return ((100 * partialValue) / totalValue).toFixed(2).toString()
      }

      const percentageCompound = apyModalRoi({
        amountEarned: compoundROIRates,
        amountInvested: bananaWorthForDollarSelected,
      })
      expect(percentageCompound).toEqual(percentage(compoundROIRates, bananaWorthForDollarSelected))
    }),
  )
})
