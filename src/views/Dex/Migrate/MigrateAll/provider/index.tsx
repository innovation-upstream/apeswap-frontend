import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { MigrateResult, useMigratorBalances } from 'state/zapMigrator/hooks'
import useLpBalances from 'hooks/useLpBalances'
import { Pair, SmartRouter, Token, TokenAmount } from '@ape.swap/sdk'
import { activeIndexHelper, setMigrateLpStatus } from './utils'
import { useFarms } from 'state/farms/hooks'
import { useVaults } from 'state/vaults/hooks'
import { getMigratorBalanceCheckerAddress } from 'utils/addressHelper'
import migratorBalanceChecker from 'config/abi/migratorBalanceChecker.json'
import { MigratorBalanceChecker } from 'config/abi/types'
import { getContract } from 'utils'
import { CHEF_ADDRESSES } from 'config/constants/chains'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { ERC20_ABI } from 'config/abi/erc20'
import { Erc20 } from 'config/abi/types/Erc20'

// TODO: Move everything to context folder

export const MIGRATION_STEPS: { title: string; description: string }[] = [
  { title: 'Unstake', description: 'some description' },
  { title: 'Approve', description: 'some description' },
  { title: 'Migrate', description: 'some description' },
  { title: 'Approve', description: 'some description' },
  { title: 'Stake', description: 'some description' },
]

// TODO: Move types to type folder

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
  id: number
  lpAddress: string
  status: {
    unstake: MigrateStatus
    approveMigrate: MigrateStatus
    migrate: MigrateStatus
    approveStake: MigrateStatus
    stake: MigrateStatus
  }
  statusText?: string
}

export interface ApeswapWalletLpInterface {
  id: number
  pair: Pair
  balance: TokenAmount
}

export interface MigrationCompleteLog {
  lpSymbol: string
  location: string
  stakeAmount: string
}

interface MigrateContextData {
  activeIndex: number
  setActiveIndexCallback: (activeIndex: number) => void
  handleMaximizerApprovalToggle: (apeswapLps: ApeswapWalletLpInterface[], migrateMaximizers: boolean) => void
  handleAddMigrationCompleteLog: (migrationLog: MigrationCompleteLog) => void
  handleUpdateMigratorResults: () => void
  handleUpdateOfApeswapLpBalance: (id: number, token0: string, token1: string) => void
  handleUpdateMigrateLp: (
    id: number,
    type: 'unstake' | 'approveMigrate' | 'migrate' | 'approveStake' | 'stake',
    status: MigrateStatus,
    statusText?: string,
  ) => void
  migrateMaximizers: boolean
  migrateStakeLps: MigrateResult[]
  migrateWalletLps: MigrateResult[]
  apeswapWalletLps: ApeswapWalletLpInterface[]
  migrateLpStatus: MigrateLpStatus[]
  migrationCompleteLog: MigrationCompleteLog[]
  migrationLoading: boolean
}

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

/* eslint-disable react-hooks/exhaustive-deps */
export function MigrateProvider({ children }: MigrateProviderProps) {
  const { account, chainId, library } = useActiveWeb3React()
  const [migrationLoading, setMigrationLoading] = useState<boolean>(true)
  const [migrateMaximizers, setMigrateMaximizers] = useState<boolean>(false)
  const [migrateWalletBalances, setMigrateWalletBalances] = useState<MigrateResult[]>([])
  const [migrateStakedBalances, setMigrateStakedBalances] = useState<MigrateResult[]>([])
  const [apeswapLpBalances, setApeswapLpBalances] = useState<ApeswapWalletLpInterface[]>([])
  const [migrationCompleteLog, setMigrationCompleteLog] = useState<MigrationCompleteLog[]>([])
  const [lpStatus, setLpStatus] = useState<MigrateLpStatus[]>([])
  // Making the load time minimum 3.5 seconds
  const timer = useRef(null)
  const [timeReady, setTimeReady] = useState<boolean>(false)
  const { results: migrateLpBalances, syncing, loading, valid } = useMigratorBalances(1)
  const [activeIndex, setActiveIndex] = useState(0)
  // TODO: Clean useLpBalances to be specific for the migration
  const { allPairs: liquidityTokens, pairAndBalances: userApeswapLpBalances } = useLpBalances()
  // Since we already need to pull farm and vault data for this page we can use the already fetched approved data
  const farms = useFarms(account)
  const { vaults: fetchedVaults } = useVaults()
  // Filter out innactive vaults and farms
  const vaults = fetchedVaults.filter((vault) => !vault.inactive)

  // Since each vault needs a farm we can filter by just farms
  const filteredLpsForStake = apeswapLpBalances?.filter((lp) =>
    farms?.find((farm) => lp.pair.liquidityToken.address.toLowerCase() === farm.lpAddresses[chainId].toLowerCase()),
  )
  const farmAndVaultUserDataLoaded = farms?.[0]?.userData !== undefined && vaults?.[0]?.userData !== undefined
  timer.current = setTimeout(() => {
    setTimeReady(true)
  }, 3500)

  if (!loading && valid && liquidityTokens.length > 0 && timeReady) {
    if (migrationLoading) {
      setMigrationLoading(false)
    }
  }

  useMemo(() => {
    setMigrateWalletBalances(migrateLpBalances?.filter((bal) => parseFloat(bal.walletBalance) > 0.0))
    setMigrateStakedBalances(migrateLpBalances?.filter((bal) => parseFloat(bal.stakedBalance) > 0.0))
  }, [migrateLpBalances.length, loading, syncing])

  useMemo(() => {
    setApeswapLpBalances(userApeswapLpBalances)
  }, [userApeswapLpBalances.length])

  // Set the initial statuses for each LP
  // TODO: Make this better
  useEffect(() => {
    console.log('run it')
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
  }, [valid, account, setLpStatus, farmAndVaultUserDataLoaded, chainId])
  console.log(valid, account, farmAndVaultUserDataLoaded, chainId)

  // Monitor is status change for active index
  useMemo(() => {
    setActiveIndex(activeIndexHelper(lpStatus))
  }, [lpStatus])

  const setActiveIndexCallback = useCallback((activeIndex: number) => setActiveIndex(activeIndex), [])

  const handleAddMigrationCompleteLog = useCallback(
    (migrationLog: MigrationCompleteLog) => {
      console.log(migrationLog)
      setMigrationCompleteLog((prev) => [...prev, migrationLog])
    },
    [setMigrationCompleteLog],
  )

  // TODO: Move to callbacks
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
        const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.id === id)
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
        console.log(new BigNumber(matchedFarm?.userData?.allowance).gt(0))
        updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
        console.log(migrateVaultAvailable)
      })
      console.log(migrateMaximizers)
      console.log(updatedMigrateLpStatus)
      setLpStatus([...updatedMigrateLpStatus])
    },
    [vaults, farms, lpStatus, setMigrateMaximizers],
  )

  // TODO: Move to callbacks
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
            reserves: migrateLpBalances.find((b) => b.token0.address.toLowerCase() === token0.toLowerCase())?.token0
              .reserves,
          },
          token1: {
            address: token1,
            symbol: migrateLpBalances.find((b) => b.token1.address.toLowerCase() === token1.toLowerCase())?.token1
              .symbol,
            decimals: null,
            reserves: migrateLpBalances.find((b) => b.token1.address.toLowerCase() === token1.toLowerCase())?.token1
              .reserves,
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
    setMigrateWalletBalances(updatedMigrateWalletBalances)
    setMigrateStakedBalances(updatedMigrateStakedBalances)
  }, [chainId, account, library, migrateLpBalances])

  // TODO: Move to utils
  const updateStatusId = useCallback(
    (id: number, newId: number) => {
      const updatedMigrateLpStatus = lpStatus
      const lpToUpdateIndex = lpStatus.findIndex((migrateLp) => migrateLp.id === id)
      const lpToUpdate = {
        ...lpStatus[lpToUpdateIndex],
        id: newId,
      }
      updatedMigrateLpStatus[lpToUpdateIndex] = lpToUpdate
      setLpStatus([...updatedMigrateLpStatus])
    },
    [setLpStatus, lpStatus],
  )

  // TODO: Move to callbacks
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

      updateStatusId(id, newId)
      setApeswapLpBalances(updatedApeswapLpBalances)
    },
    [chainId, library, account, liquidityTokens, apeswapLpBalances, updateStatusId, setApeswapLpBalances],
  )

  console.log(lpStatus)

  return (
    <MigrateContext.Provider
      value={{
        setActiveIndexCallback,
        handleUpdateMigrateLp,
        handleUpdateMigratorResults,
        handleUpdateOfApeswapLpBalance,
        handleMaximizerApprovalToggle,
        handleAddMigrationCompleteLog,
        activeIndex,
        migrateMaximizers,
        migrateWalletLps: migrateWalletBalances,
        migrateStakeLps: migrateStakedBalances,
        apeswapWalletLps: apeswapLpBalances,
        migrateLpStatus: lpStatus,
        migrationCompleteLog,
        migrationLoading,
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
