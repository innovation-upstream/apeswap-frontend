import React, { useState } from 'react'
import { useToast } from 'state/hooks'
import { fetchVaultUserDataAsync } from 'state/vaults'
import { getEtherscanLink } from 'utils'
import useHarvestAllMaximizer from 'views/Vaults/hooks/useHarvestAllMaximizer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { StyledButtonSquare } from './styles'
import { useHistory } from 'react-router-dom'
import { useIsModalShown } from 'state/user/hooks'

interface HarvestActionsProps {
  pids: number[]
  disabled?: boolean
}

const HarvestAll: React.FC<HarvestActionsProps> = ({ pids, disabled }) => {
  const { account, chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onHarvestAll } = useHarvestAllMaximizer(pids)
  const { toastSuccess } = useToast()
  const history = useHistory()

  const { generalHarvest: isGHShown } = useIsModalShown()
  const displayGHCircular = () => isGHShown && history.push({ search: '?modal=circular-gh' })

  const handleHarvestAll = async () => {
    setPendingTrx(true)
    await onHarvestAll()
      .then((resp) => {
        resp.map((trx) => {
          console.log('trx:::', trx.transactionHash)
          if (trx.transactionHash) displayGHCircular()
          return toastSuccess('Harvest Successful', {
            text: 'View Transaction',
            url: getEtherscanLink(trx.transactionHash, 'transaction', chainId),
          })
        })
      })
      .catch((e) => {
        console.error(e)
        setPendingTrx(false)
      })
    dispatch(fetchVaultUserDataAsync(account, chainId))
    setPendingTrx(false)
  }

  return (
    <StyledButtonSquare
      height={36}
      minWidth={100}
      disabled={disabled || pendingTrx || pids.length <= 0}
      onClick={handleHarvestAll}
      load={pendingTrx}
    >
      HARVEST ALL ({pids.length})
    </StyledButtonSquare>
  )
}

export default React.memo(HarvestAll)
