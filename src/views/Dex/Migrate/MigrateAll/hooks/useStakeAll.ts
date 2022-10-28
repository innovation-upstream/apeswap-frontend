import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { stake, stakeVaultV2 } from 'utils/callHelpers'
import { ApeswapWalletLpInterface, MigrateStatus, useMigrateAll } from '../provider'
import { useVaults } from 'state/vaults/hooks'
import { useMasterchef, useVaultApeV2 } from 'hooks/useContract'
import { useFarms } from 'state/farms/hooks'

const useStakeAll = () => {
  const { account, chainId, library } = useActiveWeb3React()
  const { handleUpdateMigrateLp, migrateMaximizers, handleAddMigrationCompleteLog } = useMigrateAll()
  const masterChefContract = useMasterchef()
  const vaultApeV2Contract = useVaultApeV2()
  const { vaults: fetchedVaults } = useVaults()
  // We need to filter out the innactive vaults
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)
  const farms = useFarms(account)

  const handleStakeAll = useCallback(
    (apeswapWalletLps: ApeswapWalletLpInterface[]) => {
      apeswapWalletLps.map(async ({ pair, balance, id }) => {
        const { address: lpAddress } = pair.liquidityToken
        // If maximizers is selected we need to check if one exists first. Otherwise approve the farm
        const matchedVault = vaults.find(
          (vault) => vault.stakeToken.address[chainId].toLowerCase() === lpAddress.toLowerCase(),
        )
        const matchedFarm = farms.find((farm) => farm.lpAddresses[chainId].toLowerCase() === lpAddress.toLowerCase())
        const call =
          migrateMaximizers && matchedVault
            ? vaultApeV2Contract.deposit(matchedVault.pid, balance.raw.toString())
            : masterChefContract.deposit(matchedFarm.pid, balance.raw.toString())
        handleUpdateMigrateLp(id, 'stake', MigrateStatus.PENDING, 'Staking in progress')
        call
          .then((tx) =>
            library
              .waitForTransaction(tx.hash)
              .then(() => {
                handleUpdateMigrateLp(id, 'stake', MigrateStatus.COMPLETE, 'Stake complete')
                handleAddMigrationCompleteLog({
                  lpSymbol: pair.liquidityToken.getSymbol(chainId),
                  location: migrateMaximizers && matchedVault ? 'maximizer' : 'farm',
                  stakeAmount: balance.toExact(),
                })
              })
              .catch(() => handleUpdateMigrateLp(id, 'stake', MigrateStatus.INVALID, 'Stake failed')),
          )
          .catch(() => {
            handleUpdateMigrateLp(id, 'stake', MigrateStatus.INVALID, 'Stake failed')
          })
      })
    },
    [
      handleUpdateMigrateLp,
      handleAddMigrationCompleteLog,
      chainId,
      masterChefContract,
      vaultApeV2Contract,
      migrateMaximizers,
      farms,
      library,
      vaults,
    ],
  )
  return handleStakeAll
}

export default useStakeAll
