import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { MigrateResult, useMigratorBalances } from 'state/zapMigrator/hooks'
import useLpBalances from 'hooks/useLpBalances'
import { Pair, TokenAmount, ZAP_ADDRESS } from '@ape.swap/sdk'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'

export const MIGRATION_STEPS: { title: string; description: string }[] = [
  { title: 'Unstake', description: 'some description' },
  { title: 'Approve', description: 'some description' },
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
  status: { unstake: Status; approveMigrate: Status; migrate: Status; approveStake: Status; stake: Status }
  statusText: string
}

interface MigrateContextData {
  activeIndex: number
  setActiveIndexCallback: (activeIndex: number) => void
  handleUpdateMigrateLp: (
    lpAddress: string,
    type: 'unstake' | 'approveMigrate' | 'migrate' | 'approveStake' | 'stake',
    status: Status,
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
    (lpAddress: string, type: 'unstake' | 'approveMigrate' | 'migrate' | 'approveStake' | 'stake', status: Status) => {
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

const setMigrateLpStatus = async (
  migrateLps: MigrateResult[],
  apeswapLps: { pair: Pair; balance: TokenAmount }[],
  setLpStatus: React.Dispatch<React.SetStateAction<MigrateLpStatus[]>>,
  account,
  chainId,
) => {
  const getMigrateLpStatus = async () => {
    const calls = migrateLps?.map((migrateLp) => {
      return { address: migrateLp.lpAddress, name: 'allowance', params: [account, ZAP_ADDRESS[chainId]] }
    })
    const rawLpAllowances = await multicall(chainId, erc20ABI, calls)
    return migrateLps?.map((migrateLp, i) => {
      return {
        lpAddress: migrateLp.lpAddress,
        status: {
          unstake: parseFloat(migrateLp.stakedBalance) > 0 ? Status.INCOMPLETE : Status.COMPLETE,
          approveMigrate: new BigNumber(rawLpAllowances[i]).gt(0) ? Status.COMPLETE : Status.INCOMPLETE,
          migrate:
            parseFloat(migrateLp.walletBalance) > 0 || parseFloat(migrateLp.stakedBalance) > 0
              ? Status.INCOMPLETE
              : Status.COMPLETE,
          approveStake: Status.INCOMPLETE,
          stake: Status.INCOMPLETE,
        },
        statusText: 'Some shit',
      }
    })
  }
  const getApeswapLpStatus = async () => {
    return apeswapLps?.map(({ pair }) => {
      return {
        lpAddress: pair.liquidityToken.address,
        status: {
          unstake: Status.COMPLETE,
          approveMigrate: Status.COMPLETE,
          migrate: Status.COMPLETE,
          approveStake: Status.INCOMPLETE,
          stake: Status.INCOMPLETE,
        },
        statusText: 'Some shit',
      }
    })
  }
  const migrateLpStatus = await getMigrateLpStatus()
  const apeswapLpStatus = await getApeswapLpStatus()
  setLpStatus([...migrateLpStatus, ...apeswapLpStatus])
}
