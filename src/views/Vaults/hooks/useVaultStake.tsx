import { useCallback } from 'react'
import { useVaultApeV1, useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { stakeVault } from 'utils/callHelpers'
import track from 'utils/track'

// dispatch(updateVaultUserBalance(account, chainId, pid))
// dispatch(updateVaultUserStakedBalance(account, chainId, pid))
export const useVaultStake = (pid: number, version: 'V1' | 'V2') => {
  const { account, chainId } = useActiveWeb3React()
  const vaultApeContractV1 = useVaultApeV1()
  const vaultApeContractV2 = useVaultApeV2()
  const dispatch = useAppDispatch()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stakeVault(version === 'V1' ? vaultApeContractV1 : vaultApeContractV2, pid, amount)
        track({
          event: 'vault',
          chain: chainId,
          data: {
            cat: 'stake',
            amount,
            pid,
          },
        })
        console.info(txHash)
        return txHash
      } catch (e) {
        console.error(e)
      }
      return null
    },
    [vaultApeContractV1, vaultApeContractV2, version, pid, chainId],
  )

  return { onStake: handleStake }
}
