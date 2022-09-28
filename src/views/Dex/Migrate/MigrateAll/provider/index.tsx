import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { MigrateResult, useMigratorBalances } from 'state/zapMigrator/hooks'
import useLpBalances from 'hooks/useLpBalances'
import { Pair, TokenAmount } from '@ape.swap/sdk'

export const MIGRATION_STEPS: { title: string; description: string }[] = [
  { title: 'Unstake', description: 'some description' },
  { title: 'Migrate', description: 'some description' },
  { title: 'Approve', description: 'some description' },
  { title: 'Stake', description: 'some description' },
]

export const enum Status {
  PENDING = 'pending',
  INCOMPLETE = 'incomplete',
  COMPLETE = 'complete',
  INVALID = 'invalid',
}

interface MigrateProviderProps {
  children: ReactNode
}

interface MigrateLpStatus {
  lpAddress: string
  status: { unstake: Status; migrate: Status; approve: Status; stake: Status }
  statusText: string
}

interface MigrateContextData {
  activeIndex: number
  setActiveIndexCallback: (activeIndex: number) => void
  handleUpdateMigrateLp: (lpAddress: string, type: 'unstake' | 'migrate' | 'approve' | 'stake', status: Status) => void
  migrateStakeLps: MigrateResult[]
  migrateWalletLps: MigrateResult[]
  apeswapWalletLps: { pair: Pair; balance: TokenAmount }[]
  migrateLpStatus: MigrateLpStatus[]
}

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

export function MigrateProvider({ children }: MigrateProviderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [migrateLpStatus, setMigrateLpStatus] = useState<MigrateLpStatus[]>([])
  const { results: migrateLpBalances, valid } = useMigratorBalances()
  const migrateWalletBalances = valid ? migrateLpBalances.filter((bal) => parseFloat(bal.walletBalance) > 0.0) : []
  const migrateStakedBalances = valid ? migrateLpBalances.filter((bal) => parseFloat(bal.stakedBalance) > 0.0) : []
  const apeswapLpBalances = useLpBalances()
  const migrateLpsStatus = useSetMigrateLpStatus(migrateLpBalances)
  const apeswapLpStatus = useSetApeswapLpStatus(apeswapLpBalances)
  const mergedLpStatus = useMemo(() => {
    return [...migrateLpsStatus, ...apeswapLpStatus]
  }, [migrateLpsStatus, apeswapLpStatus])

  useEffect(() => {
    setMigrateLpStatus(mergedLpStatus)
  }, [mergedLpStatus.length])

  const setActiveIndexCallback = useCallback((activeIndex: number) => setActiveIndex(activeIndex), [])
  const handleUpdateMigrateLp = useCallback(
    (lpAddress: string, type: 'unstake' | 'migrate' | 'approve' | 'stake', status: Status) => {
      const updatedMigrateLpStatus = migrateLpStatus
      const lpToUpdateIndex = migrateLpStatus.findIndex((migrateLp) => migrateLp.lpAddress === lpAddress)
      const lpToUpdate = {
        ...migrateLpStatus[lpToUpdateIndex],
        status: { ...migrateLpStatus[lpToUpdateIndex].status, [type]: status },
        statusText: '',
      }
      console.log(lpToUpdate)
      updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      console.log(updatedMigrateLpStatus)
      setMigrateLpStatus(updatedMigrateLpStatus)
    },
    [migrateLpStatus],
  )

  console.log('yeeehhhaaaaaa', migrateLpStatus)

  return (
    <MigrateContext.Provider
      value={{
        activeIndex,
        setActiveIndexCallback,
        handleUpdateMigrateLp,
        migrateWalletLps: migrateWalletBalances,
        migrateStakeLps: migrateStakedBalances,
        apeswapWalletLps: apeswapLpBalances,
        migrateLpStatus: migrateLpStatus,
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

const useSetMigrateLpStatus = (migrateLps: MigrateResult[]): MigrateLpStatus[] => {
  const status = useMemo(() => {
    return migrateLps?.map((migrateLp) => {
      return {
        lpAddress: migrateLp.lpAddress,
        status: {
          unstake: parseFloat(migrateLp.stakedBalance) > 0 ? Status.INCOMPLETE : Status.COMPLETE,
          migrate: parseFloat(migrateLp.walletBalance) > 0 ? Status.INCOMPLETE : Status.COMPLETE,
          approve: Status.INCOMPLETE,
          stake: Status.INCOMPLETE,
        },
        statusText: 'Some shit',
      }
    })
  }, [migrateLps])
  return status
}

const useSetApeswapLpStatus = (apeswapLps: { pair: Pair; balance: TokenAmount }[]): MigrateLpStatus[] => {
  const status = useMemo(() => {
    return apeswapLps?.map(({ pair }) => {
      return {
        lpAddress: pair.liquidityToken.address,
        status: {
          unstake: Status.COMPLETE,
          migrate: Status.COMPLETE,
          approve: Status.INCOMPLETE,
          stake: Status.INCOMPLETE,
        },
        statusText: 'Some shit',
      }
    })
  }, [apeswapLps])
  return status
}
