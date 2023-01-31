/** @jsxImportSource theme-ui */
import { Button } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useVaultApeV3 } from 'hooks/useContract'
import React, { useState } from 'react'
import { useAppDispatch } from 'state'
import { updateVaultV3UserBalance, updateVaultV3UserStakedBalance } from 'state/vaultsV3'
import { stakeVaultV2 } from 'utils/callHelpers'

const Stake = ({ pid, rawTokenBalance }: { pid: number; rawTokenBalance: string }) => {
  const [txPending, setTxPending] = useState(false)
  const { chainId, account } = useActiveWeb3React()
  const vaultApeV3 = useVaultApeV3()
  const dispatch = useAppDispatch()
  return (
    <Button
      fullWidth
      disabled={txPending}
      load={txPending}
      onClick={() => {
        setTxPending(true)
        stakeVaultV2(vaultApeV3, pid, rawTokenBalance)
          .then(() => {
            setTxPending(false)
            dispatch(updateVaultV3UserStakedBalance(account, chainId, pid))
            dispatch(updateVaultV3UserBalance(account, chainId, pid))
          })
          .catch(() => {
            setTxPending(false)
          })
      }}
    >
      Deposit
    </Button>
  )
}

export default Stake
