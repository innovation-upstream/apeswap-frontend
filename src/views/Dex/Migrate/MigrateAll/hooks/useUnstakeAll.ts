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
  const { handleUpdateMigrateLp, handleUpdateMigratorResults } = useMigrateAll()
  const handleUnstakeAll = useCallback(
    (migrateLps: MigrateResult[]) => {
      migrateLps.map(async (migrateLp) => {
        const { pid, chefAddress, stakedBalance, id } = migrateLp
        const masterChefContract = new Contract(
          chefAddress,
          masterChefAbi,
          getProviderOrSigner(library, account),
        ) as Masterchef
        handleUpdateMigrateLp(id, 'unstake', MigrateStatus.PENDING, 'Unstake in progress')
        unstake(masterChefContract, pid, stakedBalance)
          .then((tx) =>
            library
              .waitForTransaction(tx.transactionHash)
              .then(() => {
                handleUpdateMigrateLp(id, 'unstake', MigrateStatus.COMPLETE, 'Unstake complete')
                handleUpdateMigratorResults()
              })
              .catch(() => handleUpdateMigrateLp(id, 'unstake', MigrateStatus.INVALID, 'Unstake failed')),
          )
          .catch(() => {
            handleUpdateMigrateLp(id, 'unstake', MigrateStatus.INVALID, 'Unstake failed')
          })
      })
    },
    [account, handleUpdateMigrateLp, handleUpdateMigratorResults, library],
  )
  return handleUnstakeAll
}

export default useUnstakeAll
