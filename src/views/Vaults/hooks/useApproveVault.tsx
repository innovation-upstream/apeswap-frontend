import { useCallback } from 'react'
import { ethers } from 'ethers'
import { useERC20 } from 'hooks/useContract'

// Approve a vault
const useApproveVault = (stakeTokenAddress: string, strategyAddress: string) => {
  const tokenContract = useERC20(stakeTokenAddress)
  const handleApprove = useCallback(async () => {
    const tx = await tokenContract.approve(strategyAddress, ethers.constants.MaxUint256).then((trx) => trx.wait())
    return tx
  }, [strategyAddress, tokenContract])
  return { onApprove: handleApprove }
}

export default useApproveVault
