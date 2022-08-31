import React, { useState } from 'react'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'

import { Box, ContributeButton } from './styles'
import useIAODeposit from '../../../hooks/useIAODeposit'
import TokenInput from './TokenInput'

interface Props {
  currency: string
  contract: any
  notLp?: boolean
  currencyAddress: string
  disabled?: boolean
  tokenBalance: BigNumber
}

const ContributeInputComponent: React.FC<Props> = ({ currency, contract, currencyAddress, disabled, tokenBalance }) => {
  const [value, setValue] = useState('')
  const balance = Number(getFullDisplayBalance(tokenBalance)).toFixed(4)
  const { t } = useTranslation()

  const { pendingTx, handleDeposit, isAmountValid } = useIAODeposit(contract, currencyAddress, tokenBalance)

  const useMax = () => {
    const bnbReduction = new BigNumber(0.01)
    const bigBalance = new BigNumber(balance)
    setValue(
      currency === 'BNB'
        ? (bigBalance > bnbReduction ? bigBalance.minus(bnbReduction).toFixed() : 0).toString()
        : balance,
    )
  }

  return (
    <Box>
      <table width="100%">
        <tbody>
          <tr>
            <td>
              <TokenInput
                value={value}
                onSelectMax={useMax}
                onChange={(e) => setValue(e.currentTarget.value)}
                max={parseFloat(balance).toFixed(2)}
                symbol={currency}
              />
            </td>
            <td>
              <ContributeButton
                disabled={disabled || pendingTx || !isAmountValid(value)}
                onClick={() => handleDeposit(value, currency)}
              >
                {t('CONTRIBUTE')}
              </ContributeButton>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}

export default ContributeInputComponent
