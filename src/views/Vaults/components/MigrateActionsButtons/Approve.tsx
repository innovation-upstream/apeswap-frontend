/** @jsxImportSource theme-ui */
import { Button } from '@ape.swap/uikit'
import { ERC20_ABI } from 'config/abi/erc20'
import { Erc20 } from 'config/abi/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useContract, { useVaultApeV3 } from 'hooks/useContract'
import React, { useState } from 'react'
import { useAppDispatch } from 'state'
import { updateFarmV2UserAllowances } from 'state/farmsV2'
import { updateVaultV3UserAllowance } from 'state/vaultsV3'
import { approve } from 'utils/callHelpers'

const Approve = ({ pid, lpAddress }: { pid: number; lpAddress: string }) => {
  const [txPending, setTxPending] = useState(false)
  const { chainId, account } = useActiveWeb3React()
  const vaultApeV3 = useVaultApeV3()
  const dispatch = useAppDispatch()
  const tokenContract = useContract(ERC20_ABI, lpAddress) as Erc20

  return (
    <Button
      fullWidth
      disabled={txPending}
      load={txPending}
      onClick={() => {
        setTxPending(true)
        approve(tokenContract, vaultApeV3)
          .then(() => {
            setTxPending(false)
            dispatch(updateVaultV3UserAllowance(account, chainId, pid))
          })
          .catch(() => {
            setTxPending(false)
          })
      }}
    >
      Approve
    </Button>
  )
}

export default Approve
