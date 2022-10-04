import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { MigrateResult, useMigratorBalances } from 'state/zapMigrator/hooks'
import useLpBalances from 'hooks/useLpBalances'
import { Pair, TokenAmount } from '@ape.swap/sdk'
import { setMigrateLpStatus } from './utils'

export const MIGRATION_STEPS: { title: string; description: string }[] = [
  { title: 'Unstake', description: 'some description' },
  { title: 'Approve', description: 'some description' },
  { title: 'Migrate', description: 'some description' },
  { title: 'Approve', description: 'some description' },
  { title: 'Stake', description: 'some description' },
]

export const enum MigrateStatus {
  PENDING = 'pending',
  INCOMPLETE = 'incomplete',
  COMPLETE = 'complete',
  INVALID = 'invalid',
}

interface MigrateProviderProps {
  children: ReactNode
}

export interface MigrateLpStatus {
  lpAddress: string
  status: {
    unstake: MigrateStatus
    approveMigrate: MigrateStatus
    migrate: MigrateStatus
    approveStake: MigrateStatus
    stake: MigrateStatus
  }
  statusText: string
}

interface MigrateContextData {
  activeIndex: number
  setActiveIndexCallback: (activeIndex: number) => void
  handleUpdateMigrateLp: (
    lpAddress: string,
    type: 'unstake' | 'approveMigrate' | 'migrate' | 'approveStake' | 'stake',
    status: MigrateStatus,
  ) => void
  migrateStakeLps: MigrateResult[]
  migrateWalletLps: MigrateResult[]
  apeswapWalletLps: { pair: Pair; balance: TokenAmount }[]
  migrateLpStatus: MigrateLpStatus[]
}

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

export function MigrateProvider({ children }: MigrateProviderProps) {
  const { account, chainId } = useActiveWeb3React()
  const [activeIndex, setActiveIndex] = useState(0)
  const [lpStatus, setLpStatus] = useState<MigrateLpStatus[]>([])
  const { results: migrateLpBalances, valid } = useMigratorBalances()
  const migrateWalletBalances = valid ? migrateLpBalances.filter((bal) => parseFloat(bal.walletBalance) > 0.0) : []
  const migrateStakedBalances = valid ? migrateLpBalances.filter((bal) => parseFloat(bal.stakedBalance) > 0.0) : []
  const apeswapLpBalances = useLpBalances()
  useMemo(() => {
    setMigrateLpStatus(migrateLpBalances, apeswapLpBalances, setLpStatus, account, chainId)
  }, [migrateLpBalances.length, apeswapLpBalances.length, account, setLpStatus, chainId])

  const setActiveIndexCallback = useCallback((activeIndex: number) => setActiveIndex(activeIndex), [])
  const handleUpdateMigrateLp = useCallback(
    (
      lpAddress: string,
      type: 'unstake' | 'approveMigrate' | 'migrate' | 'approveStake' | 'stake',
      status: MigrateStatus,
    ) => {
      console.log(lpAddress)
      console.log(lpStatus)
      const updatedMigrateLpStatus = lpStatus
      const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.lpAddress === lpAddress)
      console.log(lpToUpdateIndex)
      const lpToUpdate = {
        ...lpStatus[lpToUpdateIndex],
        status: { ...lpStatus[lpToUpdateIndex].status, [type]: status },
        statusText: '',
      }
      console.log(lpToUpdate)
      updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      console.log(updatedMigrateLpStatus)
      setLpStatus(updatedMigrateLpStatus)
    },
    [setLpStatus, lpStatus],
  )

  console.log('yeeehhhaaaaaa', lpStatus)

  return (
    <MigrateContext.Provider
      value={{
        activeIndex,
        setActiveIndexCallback,
        handleUpdateMigrateLp,
        migrateWalletLps: migrateWalletBalances,
        migrateStakeLps: migrateStakedBalances,
        apeswapWalletLps: apeswapLpBalances,
        migrateLpStatus: lpStatus,
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
