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

/**
 * Hook to use handleMaximizerApprovalToggle callback which checks the allowance for each farm/vault and status state
 * @param farms List of ApeSwap farms
 * @param vaults List of ApeSwap vaults
 * @param lpStatus List of Migrate LPs status
 * @param setLpStatus Action to set the Migrate Lp Status state
 * @param setMigrateMaximizers Action to set the migrate maximizer flag state
 */
export const useHandleMaximizerApprovalToggle = (
  farms: Farm[],
  vaults: Vault[],
  lpStatus: MigrateLpStatus[],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
  setMigrateMaximizers: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const { chainId } = useActiveWeb3React()
  const handleMaximizerApprovalToggle = useCallback(
    (apeswapLps, migrateMaximizers) => {
      const updatedMigrateLpStatus = lpStatus
      setMigrateMaximizers(migrateMaximizers)
      apeswapLps.forEach(({ pair, id }) => {
        const matchedVault = vaults.find(
          (vault) => vault.stakeToken.address[chainId].toLowerCase() === pair.liquidityToken.address.toLowerCase(),
        )
        const matchedFarm = farms.find(
          (farm) => farm.lpAddresses[chainId].toLowerCase() === pair.liquidityToken.address.toLowerCase(),
        )
        const migrateVaultAvailable = migrateMaximizers && matchedVault
        const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.lp === id)
        const lpToUpdate = {
          ...lpStatus[lpToUpdateIndex],
          status: {
            ...lpStatus[lpToUpdateIndex].status,
            approveStake: migrateVaultAvailable
              ? new BigNumber(matchedVault?.userData?.allowance).gt(0)
                ? MigrateStatus.COMPLETE
                : MigrateStatus.INCOMPLETE
              : new BigNumber(matchedFarm?.userData?.allowance).gt(0)
              ? MigrateStatus.COMPLETE
              : MigrateStatus.INCOMPLETE,
          },
        }
        updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      })
      setLpStatus([...updatedMigrateLpStatus])
    },
    [vaults, farms, lpStatus, chainId, setLpStatus, setMigrateMaximizers],
  )
  return handleMaximizerApprovalToggle
}

/**
 * Hook to set a callback to update the users ApeSwap LP balances after compelting a migrate
 * @param apeswapLpBalances List of ApeSwap LP balances
 * @param lpStatus List of Migrate LPs status
 * @param liquidityTokens List of Pair and PairStates
 * @param setLpStatus Action to set the Migrate LP Status state
 * @param setApeswapLpBalances Action to set the ApeSwap LP Balances
 */
export const useHandleUpdateOfApeswapLpBalance = (
  apeswapLpBalances: ApeswapWalletLpInterface[],
  lpStatus: MigrateLpStatus[],
  liquidityTokens: [PairState, Pair][],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
  setApeswapLpBalances: React.Dispatch<React.SetStateAction<ApeswapWalletLpInterface[]>>,
) => {
  const { library, account, chainId } = useActiveWeb3React()
  const updateStatusId = 0
  const updateApproveStakeStatus = useUpdateApproveStakeStatus(lpStatus, setLpStatus)
  const handleUpdateOfApeswapLpBalance = useCallback(
    async (id, token0, token1) => {
      let rawLpBalance = null
      const updatedApeswapLpBalances = apeswapLpBalances
      // We can set decimals to 18 since they arent used for getting the LP address
      const token0Obj = new Token(chainId, token0, 18)
      const token1Obj = new Token(chainId, token1, 18)
      const lpAddress = Pair.getAddress(token0Obj, token1Obj, SmartRouter.APE)
      // Check to see if the lp address already exists with a different id
      const checkIfApeLpExistsIndex = apeswapLpBalances.findIndex(
        (lp) => lp.pair.liquidityToken.address.toLowerCase() === lpAddress.toLowerCase(),
      )
      const lpContract = getContract(lpAddress, ERC20_ABI, library, account) as Erc20
      const newId = parseInt(lpAddress)
      try {
        rawLpBalance = await lpContract.balanceOf(account)
      } catch (e) {
        console.error(e)
      }
      const findPair = liquidityTokens.find(
        ([, pair]) => pair?.liquidityToken?.address.toLowerCase() === lpAddress.toLowerCase(),
      )?.[1]

      const tokenAmount = new TokenAmount(findPair?.liquidityToken, rawLpBalance ? rawLpBalance.toString() : 0)
      const apeLpToUpdate = { id: newId, pair: findPair, balance: tokenAmount }
      if (checkIfApeLpExistsIndex >= 0) {
        updatedApeswapLpBalances[checkIfApeLpExistsIndex] = apeLpToUpdate
      } else {
        updatedApeswapLpBalances.push(apeLpToUpdate)
      }

      updateApproveStakeStatus(apeLpToUpdate)
      setApeswapLpBalances(updatedApeswapLpBalances)
    },
    [chainId, library, account, liquidityTokens, apeswapLpBalances, setApeswapLpBalances, updateApproveStakeStatus],
  )
  return handleUpdateOfApeswapLpBalance
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
        const productType = vault.version === 'V1' ? ProductTypes.VAULT_V1 : ProductTypes.VAULT_V2
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
export const usePullAndMergeV2Products = () => {
  const { account, chainId } = useActiveWeb3React()
  const farms = useFarmsV2(account)
  // We want to pull the new farms to get corresponding user info and pid info

  // const { vaults } = useVaults()

  // Since vaults have to use a farm we can grab token values from just farms to avoid duplicates
  // Grab all staked and wallet balances for current farms / vaults
  const userV2Farms = useMemo(
    () => farms?.filter(({ userData }) => new BigNumber(userData?.tokenBalance).isGreaterThan(0)),
    [farms],
  )

  // const userV1StakedVaults = useMemo(
  //   () => vaults?.filter(({ userData }) => userData && new BigNumber(userData.stakedBalance).isGreaterThan(0)),
  //   [vaults],
  // )

  // Standardize both farm and vaults to the same type interface to make flow easier
  const mergedProducts: MasterApeProductsInterface[] = useMemo(
    () => [
      ...userV2Farms.map((farm) => {
        // This should be updated once we know the pid for single staking
        const singleStakeAsset = false // farm.pid === 0
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
      // TOOD: Add vaults
      // ...userV1StakedVaults.map((vault) => {
      //   const singleStakeAsset = !vault.quoteToken
      //   const productType = vault.version === 'V1' ? ProductTypes.VAULT_V1 : ProductTypes.VAULT_V2
      //   const lp = vault.stakeToken.address[chainId].toLowerCase()

      //   return {
      //     // Since there is a BANANA single stake vault one LP could be the BANANA address
      //     id: `${productType}-${lp}`,
      //     lp,
      //     pid: vault.pid,
      //     type: productType,
      //     singleStakeAsset,
      //     token0: {
      //       address: vault.token.address[chainId].toLowerCase(),
      //       symbol: vault.token.symbol,
      //     },
      //     token1: {
      //       address: !singleStakeAsset ? vault.quoteToken.address[chainId].toLowerCase() : '',
      //       symbol: !singleStakeAsset ? vault.quoteToken.symbol : '',
      //     },
      //     stakedAmount: getFullDisplayBalance(new BigNumber(vault.userData.stakedBalance)),
      //     walletBalance: getFullDisplayBalance(new BigNumber(vault.userData.tokenBalance)),
      //     lpValueUsd: vault.stakeTokenPrice,
      //   }
      // }),
    ],
    [userV2Farms, chainId],
  )

  console.log(mergedProducts)
  const loaded = !!farms?.[0]?.userData && mergedProducts
  return { mergedProducts, loaded }
}
