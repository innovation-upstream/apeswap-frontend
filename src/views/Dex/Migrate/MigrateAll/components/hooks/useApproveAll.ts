import { Erc20 } from 'config/abi/types'
import { Contract, ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useCallback } from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { getProviderOrSigner } from 'utils'
import { Status, useMigrateAll } from '../../provider'
import { ZAP_ADDRESS } from '@ape.swap/sdk'

const useApproveAll = () => {
  const { library, account, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp } = useMigrateAll()

  const handleApproveAll = useCallback(
    (migrateLps: MigrateResult[]) => {
      migrateLps.map(async (migrateLp) => {
        const { lpAddress } = migrateLp
        const lpContract = new Contract(lpAddress, IUniswapV2PairABI, getProviderOrSigner(library, account)) as Erc20
        const txHash = lpContract.approve(ZAP_ADDRESS[chainId], ethers.constants.MaxUint256)
        handleUpdateMigrateLp(lpAddress, 'approveMigrate', Status.PENDING)
        txHash
          .then(() => {
            handleUpdateMigrateLp(lpAddress, 'approveMigrate', Status.COMPLETE)
          })
          .catch(() => {
            handleUpdateMigrateLp(lpAddress, 'approveMigrate', Status.INVALID)
          })
      })
    },
    [account, handleUpdateMigrateLp, library, chainId],
  )
  return handleApproveAll
}

export default useApproveAll
