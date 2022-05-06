import { useCallback } from 'react'
import { useVaultApeV1, useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { stakeVaultV1, stakeVaultV2 } from 'utils/callHelpers'
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
        const trxHash =
          version === 'V1'
            ? await stakeVaultV1(vaultApeContractV1, pid, amount)
            : await stakeVaultV2(vaultApeContractV2, pid, amount)
        track({
          event: 'vault',
          chain: chainId,
          data: {
            cat: 'stake',
            amount,
            pid,
          },
        })
        console.info(trxHash)
        return trxHash
      } catch (e) {
        console.error(e)
      }
      return null
    },
    [vaultApeContractV1, vaultApeContractV2, version, pid, chainId],
  )

  return { onStake: handleStake }
}
