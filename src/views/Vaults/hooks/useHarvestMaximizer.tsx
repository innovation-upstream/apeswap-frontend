import { useCallback } from 'react'
import { useVaultApeV1, useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { harvestMaximizer, stakeVault } from 'utils/callHelpers'
import track from 'utils/track'

// dispatch(updateVaultUserBalance(account, chainId, pid))
// dispatch(updateVaultUserStakedBalance(account, chainId, pid))
const useHarvestMaximizer = (pid: number) => {
  const { account, chainId } = useActiveWeb3React()
  const vaultApeContractV2 = useVaultApeV2()

  const handleHarvest = useCallback(async () => {
    try {
      const txHash = await harvestMaximizer(vaultApeContractV2, pid)
      track({
        event: 'vault',
        chain: chainId,
        data: {
          cat: 'harvest',
          pid,
        },
      })
      console.info(txHash)
      return txHash
    } catch (e) {
      console.error(e)
    }
    return null
  }, [vaultApeContractV2, pid, chainId])

  return { onHarvest: handleHarvest }
}

export default useHarvestMaximizer
