import * as fc from 'fast-check'
import { tokenEarnedPerThousandDollarsCompounding, apyModalRoi } from '../utils/compoundApyHelpers'

const compoundInterest = (p: number, t: number, r: number, n: number) => {
  const amount = p * (1 + r / n) ** (n * t)
  const interest = amount - p
  console.log('interest', interest)
  return interest
}

test('value should be correct', () => {
  fc.assert(
    fc.property(
      fc.nat(),
      fc.nat(),
      fc.nat(),
      fc.nat(),
      fc.nat(),
      (numberOfDays, farmApr, tokenPrice, amountDollars, compoundFrequency) => {
        // Calling function
        const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
          numberOfDays,
          farmApr,
          tokenPrice,
          // Get the fraction of 1 day
          compoundFrequency: 1 / compoundFrequency,
          amountDollar: amountDollars,
        })

        // Checking with formula

        expect(tokenPrice).toEqual(
          (compoundInterest(amountDollars, numberOfDays, farmApr, compoundFrequency) + amountDollars) /
            (compoundROIRates + amountDollars / tokenPrice),
        )
      },
    ),
  )
})
