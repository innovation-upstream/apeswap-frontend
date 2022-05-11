import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Button } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import Banner from 'components/Banner'
import ListViewLayout from 'components/layout/ListViewLayout'
import partition from 'lodash/partition'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { useVaults, usePollVaultsData } from 'state/vaults/hooks'
import { Vault } from 'state/types'
import { ViewMode } from './components/types'
import DisplayVaults from './components/DisplayVaults'
import VaultMenu from './components/Menu'
import useCompound from './hooks/useCompound'

const NUMBER_OF_VAULTS_VISIBLE = 12

const Vaults: React.FC = () => {
  usePollVaultsData()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [burnOnly, setBurnOnly] = useState(false)
  const [vaultType, setVaultType] = useState('allTypes')
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [viewMode, setViewMode] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [numberOfVaultsVisible, setNumberOfVaultsVisible] = useState(NUMBER_OF_VAULTS_VISIBLE)
  const { pathname } = useLocation()
  const size: Size = useWindowSize()
  const { vaults: initVaults } = useVaults()
  console.log(initVaults)
  const [allVaults, setAllVaults] = useState(initVaults)
  const { chainId } = useActiveWeb3React()
  const isActive = !pathname.includes('history')
  const { onCompound } = useCompound()
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    setAllVaults(initVaults)
  }, [initVaults])

  useEffect(() => {
    if (size.width !== undefined) {
      if (size.width < 968) {
        setViewMode(ViewMode.CARD)
      } else {
        setViewMode(ViewMode.TABLE)
      }
    }
  }, [size])

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfVaultsVisible((vaultsCurrentlyVisible) => vaultsCurrentlyVisible + NUMBER_OF_VAULTS_VISIBLE)
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

  const [inactiveVaults, activeVaults] = partition(allVaults, (vault) => vault.inactive)

  const stakedOnlyVaults = activeVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  const vaultsHasRewards = stakedOnlyVaults.filter((vault) =>
    new BigNumber(vault.userData.pendingRewards).isGreaterThan(0),
  )

  const stakedInactiveVaults = inactiveVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  const sortVaults = (vaultsToSort: Vault[]) => {
    switch (sortOption) {
      case 'dailyApy':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(vaultsToSort, (vault: Vault) => vault?.apy?.daily, sortDirection)
      case 'yearlyApy':
        return orderBy(vaultsToSort, (vault: Vault) => vault?.apy?.daily, sortDirection)
      case 'totalstaked':
        return orderBy(vaultsToSort, (vault: Vault) => parseInt(vault?.totalStaked), sortDirection)
      default:
        return orderBy(vaultsToSort, (vault: Vault) => vault.platform, 'asc')
    }
  }

  const renderVaults = (): Vault[] => {
    let chosenVaults = isActive ? activeVaults : inactiveVaults

    if (stakedOnly) {
      chosenVaults = isActive ? stakedOnlyVaults : stakedInactiveVaults
    }

    if (vaultType !== 'allTypes') {
      chosenVaults = chosenVaults.filter((vault) => vault.type === vaultType.toUpperCase())
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenVaults = chosenVaults.filter((vault) =>
        `${vault?.stakeToken?.symbol.toLowerCase()}-${vault?.rewardToken?.symbol.toLowerCase()}`.includes(
          lowercaseQuery,
        ),
      )
    }
    return sortVaults(chosenVaults).slice(0, numberOfVaultsVisible)
  }

  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        mb="100px"
        style={{ position: 'relative', top: '30px', width: '100%' }}
      >
        <ListViewLayout>
          <Banner title="Vaults" banner="banana-maximizers" link="" maxWidth={1130} />
          <VaultMenu
            onHandleQueryChange={handleChangeQuery}
            onSetSortOption={setSortOption}
            onSetStake={setStakedOnly}
            onSetVaultType={setVaultType}
            vaults={vaultsHasRewards}
            activeOption={sortOption}
            activeVaultType={vaultType}
            stakedOnly={stakedOnly}
            query={searchQuery}
          />
          <DisplayVaults vaults={renderVaults()} />
        </ListViewLayout>
        <Button size="lg" sx={{ width: '300px', alignSelf: 'center', marginTop: '20px' }} onClick={onCompound}>
          COMPOUND ME
        </Button>
        <div ref={loadMoreRef} />
      </Flex>
    </>
  )
}

export default Vaults
