import { useCallback } from 'react'
import { useVaultApeV1, useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { vaultUnstakeV1, vaultUnstakeV2, vaultUnstakeAll } from 'utils/callHelpers'
import track from 'utils/track'

// const dispatch = useAppDispatch()
// dispatch(updateVaultUserBalance(account, chainId, pid))
// dispatch(updateVaultUserStakedBalance(account, chainId, pid))

export const useVaultUnstake = (pid: number, version: 'V1' | 'V2') => {
  const { account, chainId } = useActiveWeb3React()
  const vaultApeContractV1 = useVaultApeV1()
  const vaultApeContractV2 = useVaultApeV2()

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const trxHash =
          version === 'V1'
            ? await vaultUnstakeV1(vaultApeContractV1, pid, amount)
            : await vaultUnstakeV2(vaultApeContractV2, pid, amount)
        track({
          event: 'vault',
          chain: chainId,
          data: {
            cat: 'unstake',
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
    [vaultApeContractV1, pid, version, vaultApeContractV2, chainId],
  )
  return { onUnstake: handleUnstake }
}

export const useVaultUnstakeAll = (pid: number) => {
  const { account, chainId } = useActiveWeb3React()
  const vaultApeContractV1 = useVaultApeV1()
  const vaultApeContractV2 = useVaultApeV2()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const trxHash = await vaultUnstakeAll(vaultApeContractV1, pid)
      track({
        event: 'vault',
        chain: chainId,
        data: {
          cat: 'unstakeAll',
          amount,
          pid,
        },
      })
      console.info(trxHash)
      return trxHash
    },
    [vaultApeContractV1, chainId, pid],
  )

  return { onUnstakeAll: handleUnstake }
}
