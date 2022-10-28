import { Erc20 } from 'config/abi/types'
import { Contract, ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useCallback } from 'react'
import { getProviderOrSigner } from 'utils'
import { ApeswapWalletLpInterface, MigrateStatus, useMigrateAll } from '../provider'
import { useVaults } from 'state/vaults/hooks'
import { useMasterChefAddress, useVaultApeAddressV2 } from 'hooks/useAddress'

const useStakeApproveAll = () => {
  const { library, account, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp, migrateMaximizers } = useMigrateAll()
  const masterChefAddress = useMasterChefAddress()
  const vaultAddress = useVaultApeAddressV2()
  const { vaults: fetchedVaults } = useVaults()
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)

  const handleApproveAll = useCallback(
    (apeswapWalletLps: ApeswapWalletLpInterface[]) => {
      apeswapWalletLps.map(async ({ pair, id }) => {
        const { address: lpAddress } = pair.liquidityToken
        // If maximizers is selected we need to check if one exists first. Otherwise approve the farm
        const matchedVault = vaults.find(
          (vault) => vault.stakeToken.address[chainId].toLowerCase() === lpAddress.toLowerCase(),
        )
        const lpContract = new Contract(lpAddress, IUniswapV2PairABI, getProviderOrSigner(library, account)) as Erc20
        handleUpdateMigrateLp(
          id,
          'approveStake',
          MigrateStatus.PENDING,
          `Pending ${migrateMaximizers && matchedVault ? 'Maximizer' : 'Farm'} Approval`,
        )
        lpContract
          .approve(migrateMaximizers && matchedVault ? vaultAddress : masterChefAddress, ethers.constants.MaxUint256)
          .then((tx) =>
            library
              .waitForTransaction(tx.hash)
              .then(() => handleUpdateMigrateLp(id, 'approveStake', MigrateStatus.COMPLETE, 'Approval complete'))
              .catch(() => handleUpdateMigrateLp(id, 'approveStake', MigrateStatus.INVALID, 'Approval failed')),
          )
          .catch(() => {
            handleUpdateMigrateLp(id, 'approveStake', MigrateStatus.INVALID, 'Approval failed')
          })
      })
    },
    [account, handleUpdateMigrateLp, library, chainId, masterChefAddress, vaults, vaultAddress, migrateMaximizers],
  )
  return handleApproveAll
}

export default useStakeApproveAll
