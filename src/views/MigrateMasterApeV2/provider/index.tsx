import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { activeIndexHelper, setMigrateLpStatus } from './utils'
import {
  useHandleAddMigrationCompleteLog,
  useHandleUpdateMigrateLp,
  usePullAndMergeV1Products,
  usePullAndMergeV2Products,
} from './hooks'
import {
  MigrateLpStatus,
  MigrateProviderProps,
  MigrateContextData,
  MigrationCompleteLog,
  MasterApeProductsInterface,
} from './types'
import track from 'utils/track'
import { useFarmsV2 } from 'state/farmsV2/hooks'

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

/* eslint-disable react-hooks/exhaustive-deps */
export function MigrateProvider({ children }: MigrateProviderProps) {
  // Initial states

  const [migrationLoading, setMigrationLoading] = useState<boolean>(false)
  const [migrateMaximizers, setMigrateMaximizers] = useState<boolean>(false)
  const [v1Products, setV1Products] = useState<MasterApeProductsInterface[]>([])
  const [v2Products, setV2Products] = useState<MasterApeProductsInterface[]>([])
  const [migrationCompleteLog, setMigrationCompleteLog] = useState<MigrationCompleteLog[]>([])
  const [lpStatus, setLpStatus] = useState<MigrateLpStatus[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [timeReady, setTimeReady] = useState<boolean>(false)

  const v2Farms = useFarmsV2(null)

  // Helpful hooks used
  const { mergedProducts: v1ApeProducts, loaded: v1ProductsLoaded } = usePullAndMergeV1Products()
  const { mergedProducts: v2ApeProducts, loaded: v2ProductsLoaded } = usePullAndMergeV2Products()

  // V1 products
  useEffect(() => {
    setV1Products(v1ApeProducts)
  }, [v1ApeProducts])

  // V2 products
  useEffect(() => {
    setV2Products(v2ApeProducts)
  }, [v2ApeProducts])

  const timer = useRef(null)
  const { account, chainId } = useActiveWeb3React()

  // Value filters and needed variables
  // Callbacks that are used on user actions

  const handleMaximizerApprovalToggle = () => null // useHandleMaximizerApprovalToggle(lpStatus, setLpStatus, setMigrateMaximizers)
  const handleUpdateMigrateLp = useHandleUpdateMigrateLp(lpStatus, setLpStatus)
  const handleAddMigrationCompleteLog = useHandleAddMigrationCompleteLog(setMigrationCompleteLog)
  const handleActiveIndexCallback = useCallback((activeIndex: number) => setActiveIndex(activeIndex), [])

  // On load and value change hooks

  // Monitor is status change for active index
  // TODO: Come back to this
  useMemo(() => {
    const newActiveIndex = activeIndexHelper(lpStatus)
    // if (newActiveIndex !== activeIndex && !migrationLoading) {
    //   track({
    //     event: 'migrate_liq',
    //     chain: chainId,
    //     data: {
    //       cat: newActiveIndex,
    //     },
    //   })
    // }
    setActiveIndex(newActiveIndex)
  }, [lpStatus])

  const loaded = useMemo(() => {
    return !(v1ProductsLoaded && v2ProductsLoaded)
  }, [v1ProductsLoaded, v2ProductsLoaded])

  // Set the initial status for each LP
  useEffect(() => {
    setMigrateLpStatus(v1ApeProducts, v2ApeProducts, v2Farms, migrateMaximizers, setLpStatus, chainId)
  }, [loaded, account, chainId])

  // Migration loading logic

  timer.current = setTimeout(() => {
    setTimeReady(true)
  }, 4000)

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
        migrationLoading: loaded,
        v1Products,
        v2Products,
        handleActiveIndexCallback,
        handleUpdateMigrateLp,
        handleMaximizerApprovalToggle,
        handleAddMigrationCompleteLog,
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
