import { VaultVersion } from '@ape.swap/apeswap-lists'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFarms } from 'state/farms/hooks'
import { useFarmsV2 } from 'state/farmsV2/hooks'
import { State, Vault } from 'state/types'
import { useVaults } from 'state/vaults/hooks'
import { useVaultsV3 } from 'state/vaultsV3/hooks'
import { getFullDisplayBalance } from 'utils/formatBalance'
import track from 'utils/track'
import {
  fetchV1Products,
  fetchV2Products,
  setActiveIndex,
  setInitializeMigrateStatus,
  setMigrationLoading,
  setV2Products,
} from './reducer'
import { MasterApeProductsInterface, MasterApeV2ProductsInterface, MigrateLpStatus, ProductTypes } from './types'
import { activeIndexHelper } from './utils'

/**
 * Hook to get the users ApeSwap LPs for the migration
 */
export const useMergedV1Products = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  const { userDataLoaded } = useIsMigrationLoading()
  useEffect(() => {
    if (userDataLoaded) {
      dispatch(fetchV1Products(chainId))
    }
  }, [chainId, userDataLoaded, dispatch])
  return useSelector((state: State) => state.masterApeMigration.v1Products)
}

export const useMergedV2Products = () => {
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  const { chainId } = useActiveWeb3React()
  const { userDataLoaded } = useIsMigrationLoading()
  useEffect(() => {
    if (userDataLoaded) {
      dispatch(fetchV2Products(chainId))
    }
  }, [chainId, userDataLoaded, dispatch])
  return useSelector((state: State) => state.masterApeMigration.v2Products)
}

export const useSetInitialMigrateStatus = () => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  const { mergedMigrationLoaded } = useIsMigrationLoading()
  console.log(mergedMigrationLoaded)
  useEffect(() => {
    if (mergedMigrationLoaded) {
      dispatch(setInitializeMigrateStatus(chainId))
    }
  }, [dispatch, mergedMigrationLoaded, chainId])
}

export const useSetMigrationLoading = () => {
  const dispatch = useAppDispatch()
  const { account } = useActiveWeb3React()
  const farmsV2 = useFarmsV2(account)
  const farms = useFarms(account)
  const { vaults } = useVaultsV3()
  const userDataSetFlag = !!farms?.[0]?.userData && !!farmsV2?.[0]?.userData && !!vaults?.[0]?.userData
  useEffect(() => {
    dispatch(setMigrationLoading({ userDataLoaded: userDataSetFlag }))
  }, [userDataSetFlag, dispatch])
}

export const useMonitorActiveIndex = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const migrateStatus = useMigrateStatus()
  const newActiveIndex = activeIndexHelper(migrateStatus)
  const { allDataLoaded } = useIsMigrationLoading()
  useEffect(() => {
    if (allDataLoaded) {
      dispatch(setActiveIndex(newActiveIndex))
      track({
        event: 'masterApeMigration',
        chain: chainId,
        data: {
          cat: newActiveIndex,
        },
      })
    }
  }, [newActiveIndex, allDataLoaded, chainId, dispatch])
}

// /**
//  * Hook the set a callback to handle updating lp status state
//  * @param lpStatus List of Migrate LP status
//  * @param setLpStatus Action to set the state of LP Status
//  */
// export const useHandleUpdateMigrateLp = (
//   lpStatus: MigrateLpStatus[],
//   setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
// ) => {
//   const handleUpdateMigrateLp = useCallback(
//     (id, type, status, statusText) => {
//       const updatedMigrateLpStatus = lpStatus
//       const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.id === id)
//       const lpToUpdate = {
//         ...lpStatus[lpToUpdateIndex],
//         status: { ...lpStatus[lpToUpdateIndex].status, [type]: status },
//         statusText: statusText,
//       }
//       updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
//       setLpStatus([...updatedMigrateLpStatus])
//     },
//     [setLpStatus, lpStatus],
//   )

//   return handleUpdateMigrateLp
// }

export const useIsMigrationLoading = () => {
  return useSelector((state: State) => state.masterApeMigration.migrationLoading)
}

export const useActiveIndex = () => {
  return useSelector((state: State) => state.masterApeMigration.activeIndex)
}

export const useMigrateStatus = (): MigrateLpStatus[] => {
  return useSelector((state: State) => state.masterApeMigration.migrateLpStatus)
}
