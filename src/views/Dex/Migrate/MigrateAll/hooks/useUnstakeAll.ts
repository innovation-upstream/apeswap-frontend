import { Masterchef } from 'config/abi/types'
import { Contract } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import masterChefAbi from 'config/abi/masterchef.json'
import { useCallback } from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { getProviderOrSigner } from 'utils'
import { unstake } from 'utils/callHelpers'
import { MigrateStatus, useMigrateAll } from '../provider'

const useUnstakeAll = () => {
  const { library, account } = useActiveWeb3React()
  const { handleUpdateMigrateLp } = useMigrateAll()
  const handleUnstakeAll = useCallback(
    (migrateLps: MigrateResult[]) => {
      migrateLps.map(async (migrateLp) => {
        const { pid, chefAddress, stakedBalance, lpAddress } = migrateLp
        const masterChefContract = new Contract(
          chefAddress,
          masterChefAbi,
          getProviderOrSigner(library, account),
        ) as Masterchef
        const trxHash = unstake(masterChefContract, pid, stakedBalance)
        handleUpdateMigrateLp(lpAddress, 'unstake', MigrateStatus.PENDING)
        trxHash.then(() => {
          handleUpdateMigrateLp(lpAddress, 'unstake', MigrateStatus.COMPLETE)
        })
      })
    },
    [account, handleUpdateMigrateLp, library],
  )
  return handleUnstakeAll
}

export default useUnstakeAll
