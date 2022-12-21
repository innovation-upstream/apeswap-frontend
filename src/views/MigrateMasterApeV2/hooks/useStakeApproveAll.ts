import { Erc20 } from 'config/abi/types'
import { Contract, ethers } from 'ethers'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { useCallback } from 'react'
import { getProviderOrSigner } from 'utils'
import {
  ApeswapWalletLpInterface,
  MasterApeProductsInterface,
  MasterApeV2ProductsInterface,
  MigrateStatus,
} from '../provider/types'
import { useMigrateAll } from '../provider'
import { useVaults } from 'state/vaults/hooks'
import { useMasterChefV2Address, useVaultApeAddressV3 } from 'hooks/useAddress'
import track from 'utils/track'

const useStakeApproveAll = () => {
  const { library, account, chainId } = useActiveWeb3React()
  const { handleUpdateMigrateLp, migrateMaximizers } = useMigrateAll()
  const masterChefV2Address = useMasterChefV2Address()
  // TODO: Update vaults when ready
  const vaultAddress = useVaultApeAddressV3()
  const { vaults: fetchedVaults } = useVaults()
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)

  const handleApproveAll = useCallback(
    (apeswapWalletLps: MasterApeV2ProductsInterface[]) => {
      apeswapWalletLps.map(async ({ lp, id }) => {
        try {
          // If maximizers is selected we need to check if one exists first. Otherwise approve the farm
          const matchedVault = vaults.find((vault) => vault.stakeToken.address[chainId].toLowerCase() === lp)
          const lpContract = new Contract(lp, IUniswapV2PairABI, getProviderOrSigner(library, account)) as Erc20
          handleUpdateMigrateLp(
            id,
            'approveStake',
            MigrateStatus.PENDING,
            `Pending ${migrateMaximizers && matchedVault ? 'Maximizer' : 'Farm'} Approval`,
          )
          lpContract
            .approve(
              migrateMaximizers && matchedVault ? vaultAddress : masterChefV2Address,
              ethers.constants.MaxUint256,
            )
            .then((tx) =>
              library
                .waitForTransaction(tx.hash)
                .then(() => {
                  handleUpdateMigrateLp(id, 'approveStake', MigrateStatus.COMPLETE, 'Approval complete')
                  track({
                    event: 'migrate_stake_approve',
                    chain: chainId,
                    data: {
                      cat: migrateMaximizers && matchedVault ? 'max' : 'farm',
                    },
                  })
                })
                .catch((e) => handleUpdateMigrateLp(id, 'approveStake', MigrateStatus.INVALID, e.message)),
            )
            .catch((e) => {
              handleUpdateMigrateLp(
                id,
                'approveStake',
                MigrateStatus.INVALID,
                e.message === 'MetaMask Tx Signature: User denied transaction signature.'
                  ? 'Transaction rejected in wallet'
                  : e.message,
              )
            })
        } catch {
          handleUpdateMigrateLp(id, 'approveStake', MigrateStatus.INVALID, 'Something went wrong please try refreshing')
        }
      })
    },
    [account, handleUpdateMigrateLp, library, chainId, masterChefV2Address, vaults, vaultAddress, migrateMaximizers],
  )
  return handleApproveAll
}

export default useStakeApproveAll
