import { useCallback } from 'react'
import { useVaultApeV1, useVaultApeV2 } from 'hooks/useContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { harvestMaximizer, stakeVault } from 'utils/callHelpers'
import track from 'utils/track'

// dispatch(updateVaultUserBalance(account, chainId, pid))
// dispatch(updateVaultUserStakedBalance(account, chainId, pid))
const useCompound = () => {
  const { account, chainId } = useActiveWeb3React()
  const vaultApeContractV2 = useVaultApeV2()

  const handleCompound = useCallback(async () => {
    try {
      const txHash = await vaultApeContractV2.earnAll().then((trx) => trx.wait())
      return txHash
    } catch (e) {
      console.error(e)
    }
    return null
  }, [vaultApeContractV2])

  return { onCompound: handleCompound }
}

export default useCompound
