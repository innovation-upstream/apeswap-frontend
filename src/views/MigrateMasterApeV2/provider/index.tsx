import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { activeIndexHelper, setMigrateLpStatus } from './utils'
import {
  useHandleAddMigrationCompleteLog,
  useHandleMaximizerApprovalToggle,
  useHandleUpdateAndMergeMigrateUnstake,
  useHandleUpdateMigrateLp,
  useMergedV2Products,
  usePullAndMergeV1Products,
} from './hooks'
import {
  MigrateLpStatus,
  MigrateProviderProps,
  MigrateContextData,
  MigrationCompleteLog,
  MasterApeProductsInterface,
  MasterApeV2ProductsInterface,
} from './types'
import { useFarmsV2 } from 'state/farmsV2/hooks'

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

/* eslint-disable react-hooks/exhaustive-deps */
export function MigrateProvider({ children }: MigrateProviderProps) {
  // Initial states
  const { account, chainId } = useActiveWeb3React()

  const [migrateMaximizers, setMigrateMaximizers] = useState<boolean>(false)
  const [v1Products, setV1Products] = useState<MasterApeProductsInterface[]>([])
  const [v2Products, setV2Products] = useState<MasterApeV2ProductsInterface[]>([])
  const [migrationCompleteLog, setMigrationCompleteLog] = useState<MigrationCompleteLog[]>([])
  const [lpStatus, setLpStatus] = useState<MigrateLpStatus[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  // const v2Farms = useFarmsV2(null)

  // // Helpful hooks used
  // const { mergedProducts: v1ApeProducts, loaded: v1ProductsLoaded } = usePullAndMergeV1Products()
  // const { mergedProducts: v2ApeProducts, loaded: v2ProductsLoaded } = useMergedV2Products()

  // V1 products
  // useEffect(() => {
  //   setV1Products(v1ApeProducts)
  // }, [v1ApeProducts])

  // // V2 products
  // useEffect(() => {
  //   setV2Products(v2ApeProducts)
  // }, [v2ApeProducts])

  // Value filters and needed variables
  // Callbacks that are used on user actions

  // const handleMaximizerApprovalToggle = useHandleMaximizerApprovalToggle(lpStatus, setLpStatus, setMigrateMaximizers)
  // const handleUpdateMigrateLp = useHandleUpdateMigrateLp(lpStatus, setLpStatus)
  // const handleUpdateAndMergeMigrateUnstake = useHandleUpdateAndMergeMigrateUnstake(
  //   lpStatus,
  //   migrateMaximizers,
  //   setLpStatus,
  // )
  // const handleAddMigrationCompleteLog = useHandleAddMigrationCompleteLog(setMigrationCompleteLog)
  // const handleActiveIndexCallback = useCallback((activeIndex: number) => setActiveIndex(activeIndex), [])

  // On load and value change hooks

  const loading = false
  // Monitor is status change for active index
  // TODO: Come back to this
  // useMemo(() => {
  //   const newActiveIndex = activeIndexHelper(lpStatus)
  //   // if (newActiveIndex !== activeIndex && !migrationLoading) {
  //   //   track({
  //   //     event: 'migrate_liq',
  //   //     chain: chainId,
  //   //     data: {
  //   //       cat: newActiveIndex,
  //   //     },
  //   //   })
  //   // }
  //   setActiveIndex(loading ? 0 : newActiveIndex)
  // }, [lpStatus, loading])

  // Set the initial status for each LP
  // useEffect(() => {
  //   setMigrateLpStatus([], [], v2Farms, setLpStatus, chainId)
  // }, [loading, account, chainId])

  // if (!apeBalancesLoading && liquidityTokens.length > 0 && timeReady) {
  //   if (migrationLoading) {
  //     setMigrationLoading(false)
  //   }
  // }

  return (
    <MigrateContext.Provider
      value={{
        activeIndex,
        migrateMaximizers,
        migrateLpStatus: lpStatus,
        migrationCompleteLog,
        migrationLoading: loading,
        v1Products,
        v2Products,
        handleActiveIndexCallback: null,
        handleUpdateMigrateLp: null,
        handleUpdateAndMergeMigrateUnstake: null,
        handleMaximizerApprovalToggle: null,
        handleAddMigrationCompleteLog: null,
      }}
    >
      {children}
    </MigrateContext.Provider>
  )
}

export function useMigrateAll() {
  const context = useContext(MigrateContext)
  return context
}
