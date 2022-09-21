import React, { useState } from 'react'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useToast } from 'state/hooks'
import { updateUserAllowance } from 'state/bills'
import { getEtherscanLink } from 'utils'
import { useAppDispatch } from 'state'
import { useTranslation } from 'contexts/Localization'
import useApproveBill from '../../hooks/useApproveBill'
import { StyledButton } from '../styles'
import { ActionProps } from './types'

const Approve: React.FC<ActionProps> = ({ bill }) => {
  const { lpToken, contractAddress, index } = bill
  const { chainId, account } = useActiveWeb3React()
  const { onApprove } = useApproveBill(lpToken.address[chainId], contractAddress[chainId])
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const handleApprove = async () => {
    setPendingTrx(true)
    await onApprove()
      .then((resp) => {
        const trxHash = resp.transactionHash
        toastSuccess(t('Approve Successful'), {
          text: t('View Transaction'),
          url: getEtherscanLink(trxHash, 'transaction', chainId),
        })
      })
      .catch((e) => {
        console.error(e)
        toastError(e?.data?.message || t('Error: Please try again.'))
        setPendingTrx(false)
      })
    dispatch(updateUserAllowance(chainId, index, account))
    setPendingTrx(false)
  }

  return (
    <StyledButton
      onClick={handleApprove}
      endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      disabled={pendingTrx}
    >
      {t('Enable')}
    </StyledButton>
  )
}

export default React.memo(Approve)
