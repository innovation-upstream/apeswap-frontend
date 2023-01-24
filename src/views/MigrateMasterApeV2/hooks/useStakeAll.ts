import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback } from 'react'
import { useMasterChefV2Contract, useVaultApeV3 } from 'hooks/useContract'
import { calculateGasMargin } from 'utils'
import BigNumber from 'bignumber.js'
import { useVaultsV3 } from 'state/vaultsV3/hooks'
import { MasterApeV2ProductsInterface, MigrateStatus, MigrateTransaction } from 'state/masterApeMigration/types'
import { useMigrateMaximizer } from 'state/masterApeMigration/hooks'
import { setAddTransactions, updateMigrateStatus } from 'state/masterApeMigration/reducer'
import { useAppDispatch } from 'state'
import useIsMobile from 'hooks/useIsMobile'

const useStakeAll = () => {
  const isMobile = useIsMobile()
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const migrateMaximizers = useMigrateMaximizer()
  const masterChefV2Contract = useMasterChefV2Contract()
  const vaultApeV3Contract = useVaultApeV3()
  const { vaults: fetchedVaults } = useVaultsV3()
  // We need to filter out the innactive vaults
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)

  const handleStakeAll = useCallback(
    async (apeswapWalletLps: MasterApeV2ProductsInterface[]) => {
      if (apeswapWalletLps.length === 0 || undefined) return
      const migrateLp = apeswapWalletLps[0]
      const { walletBalance, lp, id, vault, farm } = migrateLp
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
        dispatch(updateMigrateStatus(id, 'stake', MigrateStatus.PENDING, 'Stake Pending'))
        call
          .then((tx) => {
            const transaction: MigrateTransaction = {
              hash: tx.hash,
              id,
              type: 'stake',
              lpAddress: lp,
              symbol: pid === 0 ? token0.symbol : `${token0.symbol} - ${token1.symbol}`,
              location: pid === 0 ? 'pool' : migrateMaximizers && matchedVault ? 'max' : 'farm',
              stakeAmount: walletBalance,
            }
            dispatch(setAddTransactions(transaction))
            if (isMobile) {
              return handleStakeAll(apeswapWalletLps.slice(1, apeswapWalletLps.length))
            }
          })
          .catch((e) => {
            dispatch(
              updateMigrateStatus(
                id,
                'stake',
                MigrateStatus.INVALID,
                e.message === 'MetaMask Tx Signature: User denied transaction signature.'
                  ? 'Transaction rejected in wallet'
                  : e.message,
              ),
            )
            if (isMobile) {
              return handleStakeAll(apeswapWalletLps.slice(1, apeswapWalletLps.length))
            }
          })
        if (!isMobile) {
          return handleStakeAll(apeswapWalletLps.slice(1, apeswapWalletLps.length))
        }
      } catch {
        dispatch(updateMigrateStatus(id, 'stake', MigrateStatus.INVALID, 'Something went wrong please try refreshing'))
      }
    },
    [chainId, masterChefV2Contract, vaultApeV3Contract, migrateMaximizers, isMobile, dispatch, vaults],
  )
  return handleStakeAll
}

export default useStakeAll
