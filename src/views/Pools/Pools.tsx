/** @jsxImportSource theme-ui */
import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { PoolCategory } from 'config/constants/types'
import { useWeb3React } from '@web3-react/core'
import { Flex } from '@ape.swap/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePollPools, usePoolOrderings, usePools, usePoolTags } from 'state/pools/hooks'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import { Pool } from 'state/types'
import PoolMenu from './components/Menu'
import DisplayPools from './components/DisplayPools'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import ListView404 from 'components/ListView404'
import DisplayLegacyPool from './components/DisplayLegacyPool'
import DisplayDepositPoolV2 from './components/DisplayDepositPoolV2'
import { useMigrationPhase } from 'state/migrationTimer/hooks'
import { MigrationPhases } from 'state/migrationTimer/types'
import MigrationRequiredPopup from 'components/MigrationRequiredPopup'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  usePollPools()
  const currentPhase = useMigrationPhase()
  const { chainId } = useActiveWeb3React()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [tokenOption, setTokenOption] = useState('allTokens')
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('all')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const allPools = usePools(account)
  const { poolTags } = usePoolTags(chainId)
  const { poolOrderings } = usePoolOrderings(chainId)
  const { t } = useTranslation()
  const currentBlock = useBlockNumber()
  const { search } = window.location
  const params = new URLSearchParams(search)
  const urlSearchedPool = parseInt(params.get('id'))
  const isActive = !pathname.includes('history')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const allNonAdminPools = allPools.filter(
    (pool) => !pool.forAdmins && pool?.poolCategory !== PoolCategory.JUNGLE && pool.sousId !== 999,
  )

  const legacyPool = allPools.find((pool) => pool.sousId === 999)
  const v2Pool = allPools.find((pool) => pool.sousId === 0)

  const curPools = allNonAdminPools.map((pool) => {
    return {
      ...pool,
      isFinished: pool.sousId === 0 || pool.sousId === 999 ? false : pool.isFinished || currentBlock > pool.endBlock,
    }
  })

  const [finishedPools, openPools] = partition(curPools, (pool) => pool.isFinished)

  const stakedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedInactivePools = finishedPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        return orderBy(poolsToSort, (pool: Pool) => pool.apr, 'desc')
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.rewardToken?.price) {
              return 0
            }
            return getBalanceNumber(pool.userData.pendingReward) * pool.rewardToken?.price
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => getBalanceNumber(pool.totalStaked) * pool.stakingToken?.price,
          'desc',
        )
      case 'hot':
        return poolTags
          ? orderBy(
              poolsToSort,
              (pool: Pool) => poolTags?.find((tag) => tag.pid === pool.sousId && tag.text.toLowerCase() === 'hot'),
              'asc',
            )
          : poolsToSort
      case 'new':
        return poolTags
          ? orderBy(
              poolsToSort,
              (pool: Pool) => poolTags?.find((tag) => tag.pid === pool.sousId && tag.text.toLowerCase() === 'new'),
              'asc',
            )
          : poolsToSort
      default:
        return poolOrderings
          ? orderBy(
              poolsToSort,
              (pool: Pool) => poolOrderings?.find((ordering) => ordering.pid === pool.sousId)?.order,
              'asc',
            )
          : poolsToSort
    }
  }

  const renderPools = () => {
    let chosenPools = isActive ? openPools : finishedPools
    if (urlSearchedPool) {
      const poolCheck =
        openPools?.find((pool) => {
          return pool.sousId === urlSearchedPool
        }) !== undefined
      if (poolCheck) {
        chosenPools = [
          openPools?.find((pool) => {
            return pool.sousId === urlSearchedPool
          }),
          ...openPools?.filter((pool) => {
            return pool.sousId !== urlSearchedPool
          }),
        ]
      }
    }

    if (stakedOnly) {
      chosenPools = isActive ? stakedOnlyPools : stakedInactivePools
    }
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool.tokenName.toLowerCase().includes(lowercaseQuery))
    }
    if (tokenOption !== 'allTokens') {
      chosenPools = chosenPools.filter((pool) => pool.stakingToken.symbol === tokenOption.toUpperCase())
    }

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  return (
    <>
      <MigrationRequiredPopup
        /* @ts-ignore */
        v2Farms={[{ userData: v2Pool?.userData, lpAddresses: v2Pool.stakingToken.address }]}
        /* @ts-ignore */
        farms={[{ userData: legacyPool?.userData, lpAddresses: legacyPool.stakingToken.address }]}
        vaults={[]}
      />
      <Flex
        sx={{
          position: 'relative',
          top: '30px',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          mb: '100px',
        }}
      >
        <ListViewLayout>
          <Banner banner="pools" link="?modal=tutorial" title={t('Staking Pools')} listViewBreak maxWidth={1130} />
          <PoolMenu
            onHandleQueryChange={handleChangeQuery}
            onSetSortOption={setSortOption}
            onSetStake={setStakedOnly}
            onSetTokenOption={setTokenOption}
            pools={[...stakedOnlyPools, ...stakedInactivePools]}
            activeOption={sortOption}
            activeTokenOption={tokenOption}
            stakedOnly={stakedOnly}
            query={searchQuery}
          />
          {!AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS.pools.includes(chainId) ? (
            <ListView404 product={LIST_VIEW_PRODUCTS.POOLS} />
          ) : (
            <>
              {currentPhase !== MigrationPhases.MIGRATE_PHASE_0 && isActive && (
                <>
                  {new BigNumber(legacyPool?.userData?.stakedBalance).gt(0) && (
                    <DisplayLegacyPool pools={[legacyPool]} openId={null} poolTags={null} />
                  )}
                  {new BigNumber(v2Pool?.userData?.stakingTokenBalance).gt(0) && (
                    <DisplayDepositPoolV2 pools={[v2Pool]} openId={null} poolTags={null} />
                  )}
                </>
              )}
              {currentPhase === MigrationPhases.MIGRATE_PHASE_1 || currentPhase === MigrationPhases.MIGRATE_PHASE_2 ? (
                <>
                  <DisplayPools
                    pools={isActive ? renderPools() : [legacyPool, ...renderPools()]}
                    openId={urlSearchedPool}
                    poolTags={poolTags}
                  />
                </>
              ) : (
                <DisplayPools
                  pools={isActive ? [legacyPool, ...renderPools().slice(1, renderPools().length)] : renderPools()}
                  openId={urlSearchedPool}
                  poolTags={poolTags}
                />
              )}
            </>
          )}
          <div ref={loadMoreRef} />
        </ListViewLayout>
      </Flex>
    </>
  )
}

export default React.memo(Pools)
