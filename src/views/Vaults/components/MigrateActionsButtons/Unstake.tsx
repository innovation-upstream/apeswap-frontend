/** @jsxImportSource theme-ui */
import { Button } from '@ape.swap/uikit'
import { VaultVersion } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useVaultApeV1, useVaultApeV2 } from 'hooks/useContract'
import React, { useState } from 'react'
import { useAppDispatch } from 'state'
import { updateVaultUserBalance, updateVaultUserStakedBalance } from 'state/vaults'
import { updateVaultV3UserBalance } from 'state/vaultsV3'
import { vaultUnstakeAll } from 'utils/callHelpers'

const Unstake = ({
  pid,
  vaultVersion,
  vaultV3Pid,
}: {
  pid: number
  vaultVersion: VaultVersion
  vaultV3Pid: number
}) => {
  const [txPending, setTxPending] = useState(false)
  const { chainId, account } = useActiveWeb3React()
  const vaultApeV2 = useVaultApeV2()
  const vaultApe = useVaultApeV1()
  const dispatch = useAppDispatch()

  return (
    <Button
      fullWidth
      disabled={txPending}
      load={txPending}
      onClick={() => {
        setTxPending(true)
        vaultUnstakeAll(vaultVersion === VaultVersion.V1 ? vaultApe : vaultApeV2, pid)
          .then(() => {
            setTxPending(false)
            dispatch(updateVaultV3UserBalance(account, chainId, vaultV3Pid))
            dispatch(updateVaultUserStakedBalance(account, chainId, pid))
            dispatch(updateVaultUserBalance(account, chainId, pid))
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
