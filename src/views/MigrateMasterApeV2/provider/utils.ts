import React, { useCallback } from 'react'
import { MigrateResult } from 'state/zapMigrator/hooks'
import BigNumber from 'bignumber.js'
import {
  ApeswapWalletLpInterface,
  MasterApeProductsInterface,
  MasterApeV2ProductsInterface,
  MigrateLpStatus,
  MigrateStatus,
  ProductTypes,
} from './types'
import { Farm, Vault } from 'state/types'
import { MIGRATION_STEPS } from './constants'
import { useFarms } from 'state/farms/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useVaults } from 'state/vaults/hooks'
import { getBananaAddress } from 'utils/addressHelper'

/**
 * Helper function to set the initial status of both Migrate LPs and ApeSwap LPs if they exist
 * This function should only run on render and when user LPs have been loaded
 * @param migrateLps List of Migrate LPs
 * @param apeswapLps List of ApeSwap LPs
 * @param farms List of ApeSwap Farms to check allowances
 * @param vaults List of ApeSwap Vaults to check allowances
 * @param migrateMaximizers Flag to get the users preferred stake option
 * @param setLpStatus Action to set the LP status
 * @param account Users account address
 * @param chainId Current chain id the user is on
 */
export const setMigrateLpStatus = async (
  v1Products: MasterApeProductsInterface[],
  v2Products: MasterApeV2ProductsInterface[],
  v2Farms: Farm[],
  migrateMaximizers,
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
  chainId,
) => {
  // To make sure we dont have farms that wont be part of the migration we need to filter them out
  // TODO: Remove the two or conditions after testing! This is because farmaway is the banana farm
  const bananaAddress = getBananaAddress(chainId)
  const farmAway = v2Products?.find(({ singleStakeAsset }) => singleStakeAsset)

  // TODO: Remove all FARMAWAY and BANANA code.
  const filteredV1Products = v1Products.filter(({ lp, token0 }) =>
    v2Farms.find(({ lpAddresses }) => lpAddresses[chainId].toLowerCase() === lp || lp === bananaAddress?.toLowerCase()),
  )

  const apeswapLpStatus = filteredV1Products?.flatMap(({ stakedAmount, lp, id, token0 }) => {
    const matchedV2Product = v2Products?.find(({ lp: v2Lp }) => v2Lp === lp)
    console.log(filteredV1Products, matchedV2Product, v2Products)
    const idToUse = new BigNumber(stakedAmount).isGreaterThan(0) ? id : lp
    const isFarmAway = token0.symbol === 'FARMAWAY'
    // TODO: Remove when ready
    const isV1BananaFarm = lp === bananaAddress?.toLowerCase()
    return {
      id: idToUse,
      lp,
      status: {
        unstake: isFarmAway
          ? MigrateStatus.COMPLETE
          : new BigNumber(stakedAmount).isGreaterThan(0)
          ? MigrateStatus.INCOMPLETE
          : MigrateStatus.COMPLETE,
        approveStake: isV1BananaFarm
          ? MigrateStatus.COMPLETE
          : matchedV2Product
          ? new BigNumber(matchedV2Product.farm.allowance).isGreaterThan(0)
            ? MigrateStatus.COMPLETE
            : MigrateStatus.INCOMPLETE
          : MigrateStatus.INCOMPLETE,
        stake: isV1BananaFarm ? MigrateStatus.COMPLETE : MigrateStatus.INCOMPLETE,
      },
      statusText: 'Migration Initialized',
    }
  })

  const apeswapV2LpStatus = v2Products?.flatMap(({ walletBalance, id, lp, farm }) => {
    // If there is a matched V1 product that means we still need to unstake so make that incomplete
    const matchedV1ProductStaked = new BigNumber(
      filteredV1Products.find(({ lp: v1Lp }) => v1Lp === lp)?.stakedAmount || 0,
    )?.gt(0)
    return {
      id,
      lp,
      status: {
        unstake: matchedV1ProductStaked ? MigrateStatus.INCOMPLETE : MigrateStatus.COMPLETE,
        approveStake: new BigNumber(farm.allowance).gt(0) ? MigrateStatus.COMPLETE : MigrateStatus.INCOMPLETE,
        stake: MigrateStatus.INCOMPLETE,
      },
      statusText: 'Migration Initialized',
    }
  })
  // Get rid of duplicate status
  // v1 status gets priority over v2 status
  const mergedStatus = [...new Map([...apeswapV2LpStatus, ...apeswapLpStatus].map((item) => [item.lp, item])).values()]
  setLpStatus(mergedStatus)
}

/**
 * Helper function to get the correct step a user is on
 * @param migrateLpStatus List of LP Status to check complete status
 */
export const activeIndexHelper = (migrateLpStatus: MigrateLpStatus[]) => {
  const isComplete =
    migrateLpStatus?.map((item) =>
      Object.entries(item.status).map(([, status]) => status === MigrateStatus.COMPLETE),
    ) || []
  for (let i = 0; i < MIGRATION_STEPS.length; i++) {
    if (isComplete.filter((loFlag) => !loFlag[i]).length !== 0) {
      return i
    }
  }
  return MIGRATION_STEPS.length - 1
}

/**
 * Helper function to filter out migrate LPs that dont have a corresponding farm
 * @param farms List of ApeSwap farms
 * @param migrateLps List of Migrate LPs that will be filtered and returned
 * @param chainId Current chain id the user is on
 */
export const filterCurrentFarms = (farms: Farm[], migrateLps: MigrateResult[], chainId: number) => {
  const filteredLps = migrateLps?.filter((lp) => {
    return farms?.find(
      (farm) =>
        (farm.tokenAddresses[chainId].toLowerCase() === lp.token0.address.toLowerCase() ||
          farm.tokenAddresses[chainId].toLowerCase() === lp.token1.address.toLowerCase()) &&
        (farm.quoteTokenAdresses[chainId].toLowerCase() === lp.token0.address.toLowerCase() ||
          farm.quoteTokenAdresses[chainId].toLowerCase() === lp.token1.address.toLowerCase()),
    )
  })
  return filteredLps
}

/**
 * Helper callback to check if a farm is already approved and set the correct LP status
 * @param lpStatus List of Migrate LP Status
 * @param setLpStatus Action to set Migrate LP Status state
 */
export const useUpdateApproveStakeStatus = (
  lpStatus: MigrateLpStatus[],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
) => {
  const farms = useFarms(null)
  const { chainId } = useActiveWeb3React()
  const updateApproveStakeStatus = useCallback(
    (apeswapLp: ApeswapWalletLpInterface) => {
      const updatedMigrateLpStatus = lpStatus
      const { pair, id } = apeswapLp
      const matchedFarm = farms.find(
        (farm) => farm.lpAddresses[chainId].toLowerCase() === pair.liquidityToken.address.toLowerCase(),
      )
      const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.lp === id.toString())
      const lpToUpdate = {
        ...lpStatus[lpToUpdateIndex],
        status: {
          ...lpStatus[lpToUpdateIndex].status,
          approveStake: new BigNumber(matchedFarm?.userData?.allowance).gt(0)
            ? MigrateStatus.COMPLETE
            : MigrateStatus.INCOMPLETE,
        },
      }
      updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      setLpStatus([...updatedMigrateLpStatus])
    },
    [setLpStatus, lpStatus, farms, chainId],
  )
  return updateApproveStakeStatus
}
