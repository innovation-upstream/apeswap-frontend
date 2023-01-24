/** @jsxImportSource theme-ui */
import { Button } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMasterchef } from 'hooks/useContract'
import React, { useState } from 'react'
import { useAppDispatch } from 'state'
import { updateUserBalance, updateUserStakedBalance } from 'state/pools'
import { unstake } from 'utils/callHelpers'

// Pid and sousId can be hardcoded since it will not change
const Unstake = ({ rawTokenAmount }: { rawTokenAmount: string }) => {
  const [txPending, setTxPending] = useState(false)
  const { chainId, account } = useActiveWeb3React()
  const masterChef = useMasterchef()
  const dispatch = useAppDispatch()

  return (
    <Button
      fullWidth
      disabled={txPending}
      load={txPending}
      onClick={() => {
        setTxPending(true)
        unstake(masterChef, 0, rawTokenAmount)
          .then(() => {
            setTxPending(false)
            dispatch(updateUserBalance(chainId, 999, account))
            dispatch(updateUserStakedBalance(chainId, 999, account))
          })
          .catch(() => {
            setTxPending(false)
          })
      }}
    >
      Withdraw
    </Button>
  )
}

export default Unstake
