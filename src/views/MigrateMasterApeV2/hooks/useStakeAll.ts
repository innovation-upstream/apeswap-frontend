import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import {
  ApeswapWalletLpInterface,
  MasterApeProductsInterface,
  MasterApeV2ProductsInterface,
  MigrateStatus,
} from '../provider/types'
import { useMigrateAll } from '../provider'
import { useVaults } from 'state/vaults/hooks'
import { useMasterchef, useMasterChefV2Contract, useVaultApeV2, useVaultApeV3 } from 'hooks/useContract'
import { useFarms } from 'state/farms/hooks'
import { calculateGasMargin } from 'utils'
import track from 'utils/track'
import BigNumber from 'bignumber.js'
import { useVaultsV3 } from 'state/vaultsV3/hooks'

const useStakeAll = () => {
  const { account, chainId, library } = useActiveWeb3React()
  const { handleUpdateMigrateLp, migrateMaximizers, handleAddMigrationCompleteLog } = useMigrateAll()
  const masterChefV2Contract = useMasterChefV2Contract()
  const vaultApeV3Contract = useVaultApeV3()
  const { vaults: fetchedVaults } = useVaultsV3()
  // We need to filter out the innactive vaults
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)

  const handleStakeAll = useCallback(
    (apeswapWalletLps: MasterApeV2ProductsInterface[]) => {
      apeswapWalletLps.map(async ({ walletBalance, lp, id, vault, farm }) => {
        const { token0, token1, pid } = migrateMaximizers && vault ? vault : farm
        try {
          // If maximizers is selected we need to check if one exists first. Otherwise approve the farm
          const matchedVault = vaults.find((vault) => vault.stakeToken.address[chainId].toLowerCase() === lp)
          // Estimate gas to make sure transactions dont fail
          const gasEstimate =
            migrateMaximizers && matchedVault
              ? vaultApeV3Contract.estimateGas.deposit(
                  matchedVault.pid,
                  new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
                )
              : masterChefV2Contract.estimateGas.deposit(
                  pid,
                  new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
                )
          const call =
            migrateMaximizers && matchedVault
              ? vaultApeV3Contract.deposit(
                  matchedVault.pid,
                  new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
                  {
                    gasLimit: calculateGasMargin(await gasEstimate),
                  },
                )
              : masterChefV2Contract.deposit(
                  pid,
                  new BigNumber(walletBalance).times(new BigNumber(10).pow(18)).toString(),
                  {
                    gasLimit: calculateGasMargin(await gasEstimate),
                  },
                )
          handleUpdateMigrateLp(id, 'stake', MigrateStatus.PENDING, 'Staking in progress')
          call
            .then((tx) =>
              library
                .waitForTransaction(tx.hash)
                .then(() => {
                  handleUpdateMigrateLp(id, 'stake', MigrateStatus.COMPLETE, 'Stake complete')
                  handleAddMigrationCompleteLog({
                    lpSymbol: `${token0.symbol} - ${token1.symbol}`,
                    location: migrateMaximizers && matchedVault ? 'max' : 'farm',
                    stakeAmount: walletBalance,
                  })
                  // track({
                  //   event: 'migrate_stake',
                  //   chain: chainId,
                  //   data: {
                  //     cat: migrateMaximizers && matchedVault ? 'max' : 'farm',
                  //     symbol: `${token0} - ${token1}`,
                  //     amount: walletBalance,
                  //   },
                  // })
                })
                .catch((e) => handleUpdateMigrateLp(id, 'stake', MigrateStatus.INVALID, e.message)),
            )
            .catch((e) => {
              handleUpdateMigrateLp(id, 'stake', MigrateStatus.INVALID, e.message)
            })
        } catch {
          handleUpdateMigrateLp(id, 'stake', MigrateStatus.INVALID, 'Something went wrong please try refreshing')
        }
      })
    },
    [
      handleUpdateMigrateLp,
      handleAddMigrationCompleteLog,
      chainId,
      masterChefV2Contract,
      vaultApeV3Contract,
      migrateMaximizers,
      library,
      vaults,
    ],
  )
  return handleStakeAll
}

export default useStakeAll
