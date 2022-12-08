import { Pair, SmartRouter, Token, TokenAmount } from '@ape.swap/sdk'
import BigNumber from 'bignumber.js'
import { ERC20_ABI } from 'config/abi/erc20'
import { Erc20, MigratorBalanceChecker } from 'config/abi/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React, { useCallback, useMemo } from 'react'
import { Farm, Vault } from 'state/types'
import { getContract } from 'utils'
import { getMigratorBalanceCheckerAddress } from 'utils/addressHelper'
import migratorBalanceChecker from 'config/abi/migratorBalanceChecker.json'
import {
  ApeswapWalletLpInterface,
  MasterApeProductsInterface,
  MasterApeV2ProductsInterface,
  MigrateLpStatus,
  MigrateStatus,
  MigrationCompleteLog,
  ProductTypes,
} from './types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { CHEF_ADDRESSES } from 'config/constants/chains'
import { filterCurrentFarms, useUpdateApproveStakeStatus } from './utils'
import { PairState, usePairs } from 'hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { useFarms } from 'state/farms/hooks'
import { useVaults } from 'state/vaults/hooks'
import { useBananaPrice } from 'state/tokenPrices/hooks'
import { useFarmsV2 } from 'state/farmsV2/hooks'
import { useVaultsV3 } from 'state/vaultsV3/hooks'

/**
 * Hook to use handleMaximizerApprovalToggle callback which checks the allowance for each farm/vault and status state
 * @param farms List of ApeSwap farms
 * @param vaults List of ApeSwap vaults
 * @param lpStatus List of Migrate LPs status
 * @param setLpStatus Action to set the Migrate Lp Status state
 * @param setMigrateMaximizers Action to set the migrate maximizer flag state
 */
export const useHandleMaximizerApprovalToggle = (
  lpStatus: MigrateLpStatus[],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
  setMigrateMaximizers: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { chainId, account } = useActiveWeb3React()
  const { vaults } = useVaultsV3()
  const farms = useFarms(account)
  const handleMaximizerApprovalToggle = useCallback(
    (apeswapLps: MasterApeV2ProductsInterface[], migrateMaximizers: boolean) => {
      setMigrateMaximizers(migrateMaximizers)
      // apeswapLps.forEach(({ lp, id }) => {
      //   const matchedVault = vaults.find((vault) => vault.stakeToken.address[chainId].toLowerCase() === lp)
      //   const matchedFarm = farms.find((farm) => farm.lpAddresses[chainId].toLowerCase() === lp)
      //   const migrateVaultAvailable = migrateMaximizers && matchedVault
      //   const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.lp === id)
      //   const lpToUpdate = {
      //     ...lpStatus[lpToUpdateIndex],
      //     status: {
      //       ...lpStatus[lpToUpdateIndex].status,
      //       approveStake: migrateVaultAvailable
      //         ? new BigNumber(matchedVault?.userData?.allowance).gt(0)
      //           ? MigrateStatus.COMPLETE
      //           : MigrateStatus.INCOMPLETE
      //         : new BigNumber(matchedFarm?.userData?.allowance).gt(0)
      //         ? MigrateStatus.COMPLETE
      //         : MigrateStatus.INCOMPLETE,
      //     },
      //   }
      //   updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      // })
      // setLpStatus([...updatedMigrateLpStatus])
    },
    [vaults, farms, lpStatus, chainId, setLpStatus, setMigrateMaximizers],
  )
  return handleMaximizerApprovalToggle
}

/**
 * Hook to set a callback to update the users migrate balances
 * This is used after a migration action has been completed
 * @param farms List of ApeSwap farms
 * @param migrateLpBalances List of Migrate LPs balances
 * @param setMigrateWalletBalances Action to set the migrate wallet balances
 * @param setMigrateStakedBalances Action to set the migrate staked balances
 */
export const useHandleUpdateMigratorResults = (
  farms: Farm[],
  migrateLpBalances: MigrateResult[],
  setMigrateWalletBalances: React.Dispatch<React.SetStateAction<MigrateResult[]>>,
  setMigrateStakedBalances: React.Dispatch<React.SetStateAction<MigrateResult[]>>,
) => {
  const { chainId, library, account } = useActiveWeb3React()
  const handleUpdateMigratorResults = useCallback(async () => {
    let result = []
    const migratorAddress = getMigratorBalanceCheckerAddress(chainId)
    const migratorContract = getContract(
      migratorAddress,
      migratorBalanceChecker,
      library,
      account,
    ) as MigratorBalanceChecker
    try {
      result = await migratorContract.getBalance(account)
    } catch {
      console.warn('Something went wrong fetching migrate balances')
    }

    const balanceData = result.flatMap((b, i) => {
      const chef = CHEF_ADDRESSES[chainId][b.stakingAddress] as SmartRouter
      return b.balances.map(([pid, lp, token0, token1, total, wallet, staked]) => {
        return {
          id: migrateLpBalances.find((b) => b.lpAddress.toLowerCase() === lp.toLowerCase())?.id,
          smartRouter: chef,
          chefAddress: b.stakingAddress,
          lpAddress: lp,
          totalSupply: migrateLpBalances.find((b) => b.lpAddress.toLowerCase() === lp.toLowerCase())?.totalSupply,
          token0: {
            address: token0,
            symbol: migrateLpBalances.find((b) => b.token0.address.toLowerCase() === token0.toLowerCase())?.token0
              .symbol,
            decimals: null,
            reserves: migrateLpBalances.find(
              (b) =>
                b.token0.address.toLowerCase() === token0.toLowerCase() &&
                b.lpAddress.toLowerCase() === lp.toLowerCase(),
            )?.token0.reserves,
          },
          token1: {
            address: token1,
            symbol: migrateLpBalances.find((b) => b.token1.address.toLowerCase() === token1.toLowerCase())?.token1
              .symbol,
            decimals: null,
            reserves: migrateLpBalances.find(
              (b) =>
                b.token1.address.toLowerCase() === token1.toLowerCase() &&
                b.lpAddress.toLowerCase() === lp.toLowerCase(),
            )?.token1.reserves,
          },
          pid: parseInt(pid.toString()),
          walletBalance: getFullDisplayBalance(new BigNumber(wallet.toString())),
          stakedBalance: getFullDisplayBalance(new BigNumber(staked.toString())),
          totalBalance: getFullDisplayBalance(new BigNumber(total.toString())),
        }
      })
    })
    const updatedMigrateWalletBalances = balanceData.filter(
      (bal) => parseFloat(bal.walletBalance) > 0.0,
    ) as MigrateResult[]
    const updatedMigrateStakedBalances = balanceData.filter(
      (bal) => parseFloat(bal.stakedBalance) > 0.0,
    ) as MigrateResult[]

    // We need to filter the results to remove non farms
    setMigrateWalletBalances(filterCurrentFarms(farms, updatedMigrateWalletBalances, chainId))
    setMigrateStakedBalances(filterCurrentFarms(farms, updatedMigrateStakedBalances, chainId))
  }, [chainId, account, library, migrateLpBalances, farms, setMigrateWalletBalances, setMigrateStakedBalances])
  return handleUpdateMigratorResults
}

/**
 * Hook the set a callback to handle updating lp status state
 * @param lpStatus List of Migrate LP status
 * @param setLpStatus Action to set the state of LP Status
 */
export const useHandleUpdateMigrateLp = (
  lpStatus: MigrateLpStatus[],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
) => {
  const handleUpdateMigrateLp = useCallback(
    (id, type, status, statusText) => {
      const updatedMigrateLpStatus = lpStatus
      const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.id === id)
      const lpToUpdate = {
        ...lpStatus[lpToUpdateIndex],
        status: { ...lpStatus[lpToUpdateIndex].status, [type]: status },
        statusText: statusText,
      }
      updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      setLpStatus([...updatedMigrateLpStatus])
    },
    [setLpStatus, lpStatus],
  )

  return handleUpdateMigrateLp
}

/**
 * Hook the set a callback to handle updating lp status state
 * @param lpStatus List of Migrate LP status
 * @param setLpStatus Action to set the state of LP Status
 */
export const useHandleUpdateAndMergeMigrateUnstake = (
  lpStatus: MigrateLpStatus[],
  migrateMaximizers: boolean,
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
) => {
  const { account, chainId } = useActiveWeb3React()
  const farms = useFarmsV2(account)
  const { vaults } = useVaultsV3()
  const handleUpdateAndMergeMigrateUnstake = useCallback(
    (id, lp, type, status, statusText) => {
      const allowance = migrateMaximizers
        ? vaults.find((vault) => vault.stakeToken.address[chainId].toLowerCase() === lp)?.userData.allowance
        : farms.find((farm) => farm.lpAddresses[chainId].toLowerCase() === lp)?.userData.allowance
      const updatedMigrateLpStatus = lpStatus
      const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.id === id)
      const lpToUpdate = {
        ...lpStatus[lpToUpdateIndex],
        id: lp,
        status: {
          ...lpStatus[lpToUpdateIndex].status,
          [type]: status,
          // TODO: REMOVE BANANA LOGIC
          approveStake:
            lp === '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'.toLowerCase()
              ? MigrateStatus.COMPLETE
              : new BigNumber(allowance).gt(0)
              ? MigrateStatus.COMPLETE
              : MigrateStatus.INCOMPLETE,
        },
        statusText: statusText,
      }
      updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      setLpStatus([...updatedMigrateLpStatus])
    },
    [setLpStatus, lpStatus, farms, vaults, chainId, migrateMaximizers],
  )

  return handleUpdateAndMergeMigrateUnstake
}

/**
 * Hook the set a callback to handle updating the migration completion state
 * @param setMigrationCompleteLog Action to add a completed migration to the completion state
 */
export const useHandleAddMigrationCompleteLog = (
  setMigrationCompleteLog: React.Dispatch<React.SetStateAction<MigrationCompleteLog[]>>,
) => {
  const handleAddMigrationCompleteLog = useCallback(
    (migrationLog: MigrationCompleteLog) => {
      setMigrationCompleteLog((prev) => [...prev, migrationLog])
    },
    [setMigrationCompleteLog],
  )

  return handleAddMigrationCompleteLog
}

/**
 * Hook to get the users ApeSwap LPs for the migration
 */
export const usePullAndMergeV1Products = () => {
  const { account, chainId } = useActiveWeb3React()
  const farms = useFarms(account)
  // We want to pull the new farms to get corresponding user info and pid info
  const { vaults, userDataLoaded } = useVaults()
  // Since vaults have to use a farm we can grab token values from just farms to avoid duplicates
  // Grab all staked and wallet balances for current farms / vaults
  const userV1Farms = useMemo(
    () =>
      farms?.filter(
        ({ userData }) =>
          (userData && new BigNumber(userData.stakedBalance).isGreaterThan(0)) ||
          new BigNumber(userData?.tokenBalance).isGreaterThan(0),
      ),
    [farms],
  )
  const userV1StakedVaults = useMemo(
    () => vaults?.filter(({ userData }) => userData && new BigNumber(userData.stakedBalance).isGreaterThan(0)),
    [vaults],
  )

  console.log(userV1StakedVaults)

  // Standardize both farm and vaults to the same type interface to make flow easier
  const mergedProducts: MasterApeProductsInterface[] = useMemo(
    () => [
      ...userV1Farms.map((farm) => {
        const singleStakeAsset = farm.pid === 0
        const lp = farm.lpAddresses[chainId].toLowerCase()
        return {
          id: `${ProductTypes.FARM}-${lp}`,
          lp,
          pid: farm.pid,
          type: ProductTypes.FARM,
          singleStakeAsset,
          token0: {
            address: farm.tokenAddresses[chainId].toLowerCase(),
            symbol: !singleStakeAsset ? farm.tokenSymbol : farm.lpSymbol,
          },
          token1: {
            address: farm.quoteTokenAdresses[chainId].toLowerCase(),
            symbol: farm.quoteTokenSymbol,
          },
          stakedAmount: getFullDisplayBalance(new BigNumber(farm.userData.stakedBalance)),
          walletBalance: getFullDisplayBalance(new BigNumber(farm.userData.tokenBalance)),
          allowance: farm.userData.allowance.toString(),
          lpValueUsd: farm.lpValueUsd,
        }
      }),
      ...userV1StakedVaults.map((vault) => {
        const singleStakeAsset = !vault.quoteToken
        const productType = vault.version === 'V1' ? ProductTypes.VAULT_V1 : ProductTypes.VAULT
        const lp = vault.stakeToken.address[chainId].toLowerCase()

        return {
          // Since there is a BANANA single stake vault one LP could be the BANANA address
          id: `${productType}-${lp}`,
          lp,
          pid: vault.pid,
          type: productType,
          singleStakeAsset,
          token0: {
            address: vault.token.address[chainId].toLowerCase(),
            symbol: vault.token.symbol,
          },
          token1: {
            address: !singleStakeAsset ? vault.quoteToken.address[chainId].toLowerCase() : '',
            symbol: !singleStakeAsset ? vault.quoteToken.symbol : '',
          },
          stakedAmount: getFullDisplayBalance(new BigNumber(vault.userData.stakedBalance)),
          walletBalance: getFullDisplayBalance(new BigNumber(vault.userData.tokenBalance)),
          allowance: vault.userData.allowance.toString(),
          lpValueUsd: vault.stakeTokenPrice,
        }
      }),
    ],
    [userV1Farms, userV1StakedVaults, chainId],
  )
  const loaded = !!vaults?.[0]?.userData && !!farms?.[0]?.userData
  return { mergedProducts, loaded }
}

/**
 * Hook to get the users ApeSwap LPs for the migration
 */
export const usePullAndMergeV2Products = (migrateMaximizers: boolean) => {
  const { account, chainId } = useActiveWeb3React()
  const farms = useFarmsV2(account)
  // We want to pull the new farms to get corresponding user info and pid info

  const { vaults } = useVaultsV3()

  // Since vaults have to use a farm we can grab token values from just farms to avoid duplicates
  // Grab all staked and wallet balances for current farms / vaults
  const userV2Farms = useMemo(
    () => farms?.filter(({ userData }) => new BigNumber(userData?.tokenBalance).isGreaterThan(0)),
    [farms],
  )

  const userV3Vaults = useMemo(
    () => vaults?.filter(({ userData }) => userData && new BigNumber(userData?.tokenBalance).isGreaterThan(0)),
    [vaults],
  )

  console.log(userV3Vaults)

  // Standardize both farm and vaults to the same type interface to make flow easier
  const mergedProducts: MasterApeProductsInterface[] = useMemo(
    () => [
      ...userV2Farms.map((farm) => {
        // This should be updated once we know the pid for single staking
        const singleStakeAsset = farm.pid === 0
        const lp = farm.lpAddresses[chainId].toLowerCase()
        return {
          id: `${ProductTypes.FARM}-${lp}`,
          lp,
          pid: farm.pid,
          type: ProductTypes.FARM,
          singleStakeAsset,
          token0: {
            address: farm.tokenAddresses[chainId].toLowerCase(),
            symbol: !singleStakeAsset ? farm.tokenSymbol : farm.lpSymbol,
          },
          token1: {
            address: farm.quoteTokenAdresses[chainId].toLowerCase(),
            symbol: farm.quoteTokenSymbol,
          },
          stakedAmount: getFullDisplayBalance(new BigNumber(farm.userData.stakedBalance)),
          walletBalance: getFullDisplayBalance(new BigNumber(farm.userData.tokenBalance)),
          allowance: farm.userData.allowance.toString(),
          lpValueUsd: farm.lpValueUsd,
        }
      }),
      ...userV3Vaults.map((vault) => {
        const singleStakeAsset = !vault.quoteToken
        const lp = vault.stakeToken.address[chainId].toLowerCase()
        return {
          // Since there is a BANANA single stake vault one LP could be the BANANA address
          id: `${ProductTypes.VAULT}-${lp}`,
          lp,
          pid: vault.pid,
          type: ProductTypes.VAULT,
          singleStakeAsset,
          token0: {
            address: vault.token.address[chainId].toLowerCase(),
            symbol: vault.token.symbol,
          },
          token1: {
            address: !singleStakeAsset ? vault.quoteToken.address[chainId].toLowerCase() : '',
            symbol: !singleStakeAsset ? vault.quoteToken.symbol : '',
          },
          stakedAmount: getFullDisplayBalance(new BigNumber(vault.userData.stakedBalance)),
          walletBalance: getFullDisplayBalance(new BigNumber(vault.userData.tokenBalance)),
          allowance: vault.userData.allowance.toString(),
          lpValueUsd: vault.stakeTokenPrice,
        }
      }),
    ],
    [userV2Farms, userV3Vaults, chainId],
  )

  // TODO: Make usememo
  // We need to get the unique farms with no vaults because these will always be displayed even when the user chooses to stake into vaults
  const uniqueFarmsWithNoVaults = useMemo(
    () =>
      userV2Farms.filter(
        (farm) =>
          !userV3Vaults.find(
            (vault) => vault.stakeToken.address[chainId].toLowerCase() === farm.lpAddresses[chainId].toLowerCase(),
          ),
      ),
    [userV2Farms, chainId, userV3Vaults],
  )
  const filterMergedUniqueFarms = useMemo(
    () =>
      mergedProducts.filter((product) =>
        uniqueFarmsWithNoVaults.find(
          (farm) => product.type === ProductTypes.FARM && product.lp === farm.lpAddresses[chainId].toLowerCase(),
        ),
      ),
    [uniqueFarmsWithNoVaults, mergedProducts, chainId],
  )
  // Filter the products by which vault boolean
  const filteredProducts = useMemo(
    () =>
      mergedProducts.filter((product) =>
        migrateMaximizers ? product.type === ProductTypes.VAULT : product.type === ProductTypes.FARM,
      ),
    [mergedProducts, migrateMaximizers],
  )
  console.log([...filterMergedUniqueFarms, ...filteredProducts])
  const loaded = !!vaults?.[0]?.userData && !!farms?.[0]?.userData && mergedProducts
  return {
    mergedProducts: useMemo(
      () => (migrateMaximizers ? [...filterMergedUniqueFarms, ...filteredProducts] : filteredProducts),
      [filterMergedUniqueFarms, filteredProducts, migrateMaximizers],
    ),
    loaded,
  }
}

export const useMergedV2Products = () => {
  const { account, chainId } = useActiveWeb3React()
  const farms = useFarmsV2(account)
  // We want to pull the new farms to get corresponding user info and pid info
  const { vaults } = useVaultsV3()
  const userV2Farms = useMemo(
    () => farms?.filter(({ userData }) => new BigNumber(userData?.tokenBalance).isGreaterThan(0)),
    [farms],
  )

  const mergedProducts: MasterApeV2ProductsInterface[] = useMemo(() => {
    return userV2Farms?.map(
      ({
        lpAddresses,
        tokenAddresses,
        tokenSymbol,
        lpSymbol,
        quoteTokenAdresses,
        quoteTokenSymbol,
        userData,
        pid,
        lpValueUsd,
      }) => {
        const matchedVault: Vault = vaults.find(
          (vault) => vault.stakeToken.address[chainId].toLowerCase() === lpAddresses[chainId].toLowerCase(),
        )
        const singleStakeAsset = pid === 0
        return {
          id: lpAddresses[chainId].toLowerCase(),
          lp: lpAddresses[chainId].toLowerCase(),
          singleStakeAsset,
          walletBalance: getFullDisplayBalance(new BigNumber(userData.tokenBalance)),
          lpValueUsd,
          farm: {
            pid: pid,
            token0: {
              address: tokenAddresses[chainId].toLowerCase(),
              symbol: !singleStakeAsset ? tokenSymbol : lpSymbol,
            },
            token1: {
              address: quoteTokenAdresses[chainId].toLowerCase(),
              symbol: quoteTokenSymbol,
            },
            stakedAmount: getFullDisplayBalance(new BigNumber(userData.stakedBalance)),
            allowance: userData.allowance.toString(),
          },
          vault: matchedVault
            ? {
                pid: matchedVault.pid,
                token0: {
                  address: matchedVault.token.address[chainId].toLowerCase(),
                  symbol: matchedVault.token.symbol,
                },
                token1: {
                  address: !singleStakeAsset ? matchedVault.quoteToken.address[chainId].toLowerCase() : '',
                  symbol: !singleStakeAsset ? matchedVault.quoteToken.symbol : '',
                },
                stakedAmount: getFullDisplayBalance(new BigNumber(matchedVault.userData.stakedBalance)),
                allowance: matchedVault.userData.allowance.toString(),
              }
            : null,
        }
      },
    )
  }, [userV2Farms, vaults, chainId])
  const loaded = !!vaults?.[0]?.userData && !!farms?.[0]?.userData && mergedProducts
  console.log(loaded)
  console.log(mergedProducts)

  return { mergedProducts, loaded }
}
