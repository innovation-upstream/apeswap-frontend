import * as fc from 'fast-check'
import { tokenEarnedPerThousandDollarsCompounding } from '../../utils/compoundApyHelpers'

const compoundInterest = ({ principal, interestRate, numberOfDays, compoundFrequency }) => {
  const frequency = compoundFrequency * 365
  const rateAsDecimal = interestRate / 100
  const daysAsDecimalOfYear = numberOfDays / 365
  const gross = principal * (1 + rateAsDecimal / frequency) ** (frequency * daysAsDecimalOfYear)
  const roi = gross - principal

  return roi
}

test('value should be correct', () => {
  fc.assert(
    fc.property(
      fc.nat(),
      fc.float(),
      fc.float(),
      fc.float(),
      fc.float(),
      (numberOfDays, farmApr, tokenPrice, amountDollars, compoundFrequency) => {
        // Get result
        const compoundROIRates = tokenEarnedPerThousandDollarsCompounding({
          numberOfDays,
          farmApr,
          tokenPrice,
          compoundFrequency,
          amountDollar: amountDollars,
        })

        // Guaranteed cases with NAN
        if ((compoundFrequency === 0 && numberOfDays === 0) || tokenPrice === 0) {
          const received = Number.isNaN(compoundROIRates)
          expect(received).toBe(true)
          return
        }

        // Calculate expected result in dollars
        const roiInDollar = compoundInterest({
          principal: amountDollars,
          interestRate: farmApr,
          numberOfDays,
          compoundFrequency,
        })

        // Calculate expected result in tokens
        const roiInTokens = roiInDollar / tokenPrice

        // Compare results
        const absoluteDifference = Math.abs(compoundROIRates - roiInTokens)

        // If the difference is greater than or equal to 0.02, fail
        expect(absoluteDifference).toBeLessThan(0.02)
      },
    ),
  )
})
