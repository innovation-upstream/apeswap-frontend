import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
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
import { getContract, isAddress } from 'utils'
import { CHEF_ADDRESSES } from 'config/constants/chains'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import multicall, { multicallForBalances } from 'utils/multicall'
import ERC20_INTERFACE, { ERC20_ABI } from 'config/abi/erc20'
import { PairState } from 'hooks/usePairs'
import { Erc20, Erc20Interface } from 'config/abi/types/Erc20'

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
  id: number
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

export interface ApeswapWalletLpInterface {
  id: number
  pair: Pair
  balance: TokenAmount
}

interface MigrateContextData {
  activeIndex: number
  setActiveIndexCallback: (activeIndex: number) => void
  setMigrateMaximizersCallback: (migrateMaximizers: boolean) => void
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
}

const MigrateContext = createContext<MigrateContextData>({} as MigrateContextData)

/* eslint-disable react-hooks/exhaustive-deps */
export function MigrateProvider({ children }: MigrateProviderProps) {
  const { account, chainId, library } = useActiveWeb3React()
  const [migrateMaximizers, setMigrateMaximizers] = useState<boolean>(false)
  const [migrateWalletBalances, setMigrateWalletBalances] = useState<MigrateResult[]>([])
  const [migrateStakedBalances, setMigrateStakedBalances] = useState<MigrateResult[]>([])
  const [apeswapLpBalances, setApeswapLpBalances] = useState<ApeswapWalletLpInterface[]>([])
  const [lpStatus, setLpStatus] = useState<MigrateLpStatus[]>([])
  const { results: migrateLpBalances, syncing, loading } = useMigratorBalances(5)
  const [activeIndex, setActiveIndex] = useState(0)
  // TODO: Clean useLpBalances to be specific for the migration
  const { allPairs: liquidityTokens, pairAndBalances: userApeswapLpBalances } = useLpBalances()
  // Since we already need to pull farm and vault data for this page we can use the already fetched approved data
  const farms = useFarms(account)
  const { vaults } = useVaults()
  // Since each vault needs a farm we can filter by just farms
  const filteredLpsForStake = apeswapLpBalances?.filter((lp) =>
    farms?.find((farm) => lp.pair.liquidityToken.address.toLowerCase() === farm.lpAddresses[chainId].toLowerCase()),
  )
  const farmAndVaultUserDataLoaded = farms?.[0]?.userData !== undefined && vaults?.[0]?.userData !== undefined

  useMemo(() => {
    console.log('RUNNING')
    console.log(migrateLpBalances)
    setMigrateWalletBalances(migrateLpBalances?.filter((bal) => parseFloat(bal.walletBalance) > 0.0))
    setMigrateStakedBalances(migrateLpBalances?.filter((bal) => parseFloat(bal.stakedBalance) > 0.0))
  }, [migrateLpBalances.length, loading, syncing])

  useMemo(() => {
    setApeswapLpBalances(userApeswapLpBalances)
  }, [userApeswapLpBalances.length])

  useMemo(() => {
    console.log('SET STUFF RUNNING')
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
  }, [loading, liquidityTokens.length, account, setLpStatus, migrateMaximizers, farmAndVaultUserDataLoaded, chainId])

  console.log(lpStatus)

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
    console.log('Made it here')
    console.log(updatedMigrateWalletBalances, updatedMigrateStakedBalances)
    setMigrateWalletBalances(updatedMigrateWalletBalances)
    setMigrateStakedBalances(updatedMigrateStakedBalances)
  }, [chainId, account, library, migrateLpBalances])

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

  // TODO: Update to handle when a user has both ape lp and a migrate lp
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

      console.log(updatedApeswapLpBalances)
      console.log(checkIfApeLpExistsIndex)

      console.log(lpAddress)
      console.log(rawLpBalance)
      console.log(liquidityTokens)
      console.log(findPair)
      setApeswapLpBalances(updatedApeswapLpBalances)
    },
    [chainId, library, account, liquidityTokens, apeswapLpBalances, updateStatusId, setApeswapLpBalances],
  )

  // handleUpdateOfApeswapLpBalance(
  //   0,
  //   '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
  //   '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  // )

  const handleUpdateApeswapLpBalances = useCallback(async () => {
    let rawLpBalances = []
    const filteredPairs = liquidityTokens.filter(([pairState, pair]) => pairState === PairState.EXISTS)
    const calls = filteredPairs.map(([, pair]) => {
      return { address: pair?.liquidityToken.address.toLowerCase(), name: 'balanceOf', params: [account] }
    })
    console.log(chainId)
    console.log(calls)
    try {
      rawLpBalances = await multicallForBalances(chainId, ERC20_ABI, calls)
    } catch (e) {
      console.error(e)
    }
    console.log(rawLpBalances)
    const parsedBalances = rawLpBalances.map((bal, i) => {
      return {
        pair: filteredPairs[i][1],
        balance: new TokenAmount(filteredPairs[i][1].liquidityToken, bal ? bal[0].toString() : 0),
      }
    })

    const filterPairsWithBalances = parsedBalances.filter(({ balance }) => balance.greaterThan('0'))
    // setApeswapLpBalances(filterPairsWithBalances)

    console.log(parsedBalances)
    console.log(filterPairsWithBalances)
  }, [liquidityTokens, account, chainId])

  console.log({
    setActiveIndexCallback,
    handleUpdateMigrateLp,
    handleUpdateMigratorResults,
    setMigrateMaximizersCallback,
    handleUpdateApeswapLpBalances,
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
        handleUpdateOfApeswapLpBalance,
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
