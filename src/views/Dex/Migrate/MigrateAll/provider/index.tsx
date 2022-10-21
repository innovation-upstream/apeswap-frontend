import React, { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { MigrateResult, useMigratorBalances } from 'state/zapMigrator/hooks'
import useLpBalances from 'hooks/useLpBalances'
import { Pair, SmartRouter, TokenAmount } from '@ape.swap/sdk'
import { activeIndexHelper, setMigrateLpStatus } from './utils'
import { useFarms } from 'state/farms/hooks'
import { useVaults } from 'state/vaults/hooks'
import { getMigratorBalanceCheckerAddress } from 'utils/addressHelper'
import { ethers } from 'ethers'
import migratorBalanceChecker from 'config/abi/migratorBalanceChecker.json'
import { MigratorBalanceChecker } from 'config/abi/types'
import { getContract } from 'utils'
import { CHEF_ADDRESSES } from 'config/constants/chains'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

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
  setMigrateMaximizersCallback: (migrateMaximizers: boolean) => void
  handleUpdateMigratorResults: () => void
  handleUpdateMigrateLp: (
    lpAddress: string,
    type: 'unstake' | 'approveMigrate' | 'migrate' | 'approveStake' | 'stake',
    status: MigrateStatus,
    statusText?: string,
  ) => void
  migrateMaximizers: boolean
  migrateStakeLps: MigrateResult[]
  migrateWalletLps: MigrateResult[]
  apeswapWalletLps: { pair: Pair; balance: TokenAmount }[]
  migrateLpStatus: MigrateLpStatus[]
}

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

/* eslint-disable react-hooks/exhaustive-deps */
export function MigrateProvider({ children }: MigrateProviderProps) {
  const { account, chainId, library } = useActiveWeb3React()
  const [migrateMaximizers, setMigrateMaximizers] = useState<boolean>(false)
  const [migrateWalletBalances, setMigrateWalletBalances] = useState<MigrateResult[]>([])
  const [migrateStakedBalances, setMigrateStakedBalances] = useState<MigrateResult[]>([])
  const [lpStatus, setLpStatus] = useState<MigrateLpStatus[]>([])
  const { results: migrateLpBalances, syncing, loading } = useMigratorBalances()
  const [activeIndex, setActiveIndex] = useState(0)
  const apeswapLpBalances = useLpBalances()
  // Since we already need to pull farm and vault data for this page we can use the already fetched approved data
  const farms = useFarms(account)
  const { vaults } = useVaults()
  // Since each vault needs a farm we can filter by just farms
  const filteredLpsForStake = apeswapLpBalances?.filter((lp) =>
    farms?.find((farm) => lp.pair.liquidityToken.address.toLowerCase() === farm.lpAddresses[chainId].toLowerCase()),
  )
  const farmAndVaultUserDataLoaded = farms?.[0]?.userData !== undefined && vaults?.[0]?.userData !== undefined

  console.log(syncing)
  useMemo(() => {
    setMigrateWalletBalances([...migrateLpBalances?.filter((bal) => parseFloat(bal.walletBalance) > 0.0)])
    setMigrateStakedBalances([...migrateLpBalances?.filter((bal) => parseFloat(bal.stakedBalance) > 0.0)])
  }, [migrateLpBalances.length, loading, syncing])

  useMemo(() => {
    setMigrateLpStatus(
      migrateLpBalances,
      filteredLpsForStake,
      farms,
      vaults,
      migrateMaximizers,
      setLpStatus,
      account,
      chainId,
    )
  }, [
    migrateLpBalances.length,
    filteredLpsForStake.length,
    account,
    setLpStatus,
    migrateMaximizers,
    farmAndVaultUserDataLoaded,
    chainId,
  ])

  // Monitor is status change for active index
  useMemo(() => {
    setActiveIndex(activeIndexHelper(lpStatus))
  }, [lpStatus])

  const setActiveIndexCallback = useCallback((activeIndex: number) => setActiveIndex(activeIndex), [])
  const setMigrateMaximizersCallback = useCallback(
    (migrateMaximizers: boolean) => setMigrateMaximizers(migrateMaximizers),
    [],
  )
  const handleUpdateMigrateLp = useCallback(
    (lpAddress, type, status, statusText) => {
      const updatedMigrateLpStatus = lpStatus
      const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.lpAddress === lpAddress)
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

    console.log(migrateLpBalances)

    const balanceData = result.flatMap((b, i) => {
      const chef = CHEF_ADDRESSES[chainId][b.stakingAddress] as SmartRouter
      return b.balances.map(([pid, lp, token0, token1, total, wallet, staked]) => {
        return {
          smartRouter: chef,
          chefAddress: b.stakingAddress,
          lpAddress: lp,
          totalSupply: null,
          token0: {
            address: token0,
            symbol: migrateLpBalances.find((b) => b.token0.address.toLowerCase() === token0.toLowerCase())?.token0
              .symbol,
            decimals: null,
            reserves: null,
          },
          token1: {
            address: token1,
            symbol: migrateLpBalances.find((b) => b.token1.address.toLowerCase() === token1.toLowerCase())?.token1
              .symbol,
            decimals: null,
            reserves: null,
          },
          pid: parseInt(pid.toString()),
          walletBalance: getFullDisplayBalance(new BigNumber(wallet.toString())),
          stakedBalance: getFullDisplayBalance(new BigNumber(staked.toString())),
          totalBalance: getFullDisplayBalance(new BigNumber(total.toString())),
        }
      })
    })
    const updatedMigrateWalletBalances = balanceData.filter((bal) => parseFloat(bal.walletBalance) > 0.0)
    const updatedMigrateStakedBalances = balanceData.filter((bal) => parseFloat(bal.stakedBalance) > 0.0)
    console.log('Made it here')
    console.log(updatedMigrateWalletBalances, updatedMigrateStakedBalances)
    setMigrateWalletBalances(updatedMigrateWalletBalances)
    setMigrateStakedBalances(updatedMigrateStakedBalances)
  }, [chainId, account, library, migrateLpBalances])

  console.log({
    setActiveIndexCallback,
    handleUpdateMigrateLp,
    handleUpdateMigratorResults,
    setMigrateMaximizersCallback,
    activeIndex,
    migrateMaximizers,
    migrateWalletLps: migrateWalletBalances,
    migrateStakeLps: migrateStakedBalances,
    apeswapWalletLps: apeswapLpBalances,
    migrateLpStatus: lpStatus,
  })

  return (
    <MigrateContext.Provider
      value={{
        setActiveIndexCallback,
        handleUpdateMigrateLp,
        handleUpdateMigratorResults,
        setMigrateMaximizersCallback,
        activeIndex,
        migrateMaximizers,
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
