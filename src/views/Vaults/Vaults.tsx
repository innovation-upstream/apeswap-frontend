import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Button } from '@ape.swap/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Heading, Text, Card, Checkbox, ArrowDropDownIcon, Flex } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import Banner from 'components/Banner'
import ListViewLayout from 'components/layout/ListViewLayout'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { useVaults, usePollVaultsData } from 'state/vaults/hooks'
import { Vault } from 'state/types'
import Page from 'components/layout/Page'
import MenuTabButtons from 'components/ListViewMenu/MenuTabButtons'
import SearchInput from './components/SearchInput'
import { ViewMode } from './components/types'
import DisplayVaults from './components/DisplayVaults'
import VaultMenu from './components/Menu'
import useCompound from './hooks/useCompound'

interface LabelProps {
  active?: boolean
}

const ControlContainer = styled(Card)`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: center;
  flex-direction: column;
  overflow: visible;
  padding-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 59px;
    padding: 0px;
    justify-content: flex-start;
    padding-left: 50px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  cursor: pointer;
  ${Text} {
    margin-left: 4px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 8px;
    }
  } ;
`

const ToggleContainer = styled.div`
  position: absolute;
  right: 5%;
  display: flex;
  flex-direction: column;
  height: 75px;
  margin-left: 15px;
  justify-content: space-between;
  transform: translateY(-25px);
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
    height: auto;
    margin-left: 0px;
    align-items: center;
    justify-content: space-between;
    width: 180px;
    transform: translateY(0px);
    flex-direction: row;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 200px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    width: 225px;
  }
`

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > ${Text} {
    font-size: 12px;
  }

  margin-left: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-left: 0px;
    align-items: center;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    align-items: center;
    width: auto;

    > div {
      padding: 0;
    }
  }
`
const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 15px !important;
  }
`

interface CheckboxProps {
  checked?: boolean
}

const StyledCheckbox = styled(Checkbox)<CheckboxProps>`
  height: 21px;
  width: 21px;
`

const ContainerLabels = styled.div`
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 16px;
  margin-top: 24px;
  height: 32px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 34px;
  }
`

const StyledLabelContainerHot = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 38px;
    margin: 0px;
  }
`

const StyledLabelContainerLP = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 169px;
    margin: 0px;
  }
`

const StyledLabelContainerYearlyAPY = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 500px;
    margin: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 565px;
  }
`

const StyledLabelContainerTotalStaked = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0px;
    position: absolute;
    top: 6px;
    left: 651px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 740px;
  }
`

const CardContainer = styled.div`
  margin-top: 17px;
`

const ButtonCheckWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
  margin-right: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: fit-content;
  }
`
const StyledPage = styled(Page)`
  padding-left: 5px;
  padding-right: 5px;
  width: 100vw;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

const StyledLabel = styled.div<LabelProps>`
  display: flex;
  color: ${({ theme, active }) => (active ? '#FFFFFF' : theme.colors.primary)};

  padding: 4px 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  border-radius: ${({ active }) => active && '50px'};
  background-color: ${({ active }) => active && '#FFB300'};
`

interface DropdownProps {
  down?: boolean
}

const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)<DropdownProps>`
  color: white;
  transform: ${({ down }) => (!down ? 'rotate(180deg)' : 'rotate(0)')};
  margin-left: 7px;
  margin-top: 2px;
  /* 'rotate(180deg)' : 'rotate(0)'; */
`

const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    width: 100%;
    margin-bottom: 32px;
  }
`

const StyledLabelContainerDailyAPY = styled.div`
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 365px;
    margin: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 389px;
  }
`

const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const Container = styled.div`
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const TableContainer = styled.div`
  position: relative;
`
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
  const stakedInactiveVaults = inactiveVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )
  const burnOnlyVaults = activeVaults.filter((vault) => vault?.burning)

  const burnOnlyVaultsInactiveVaults = inactiveVaults.filter((vault) => vault?.burning)
  const burnOnlyVaultsStakedVaults = activeVaults.filter(
    (vault) => vault?.userData && new BigNumber(vault?.userData?.stakedBalance).isGreaterThan(0) && vault?.burning,
  )

  const burnOnlyVaultsInactiveStakedVaults = inactiveVaults.filter(
    (vault) => vault?.userData && new BigNumber(vault?.userData?.stakedBalance).isGreaterThan(0) && vault?.burning,
  )

  const handleSortOptionChange = (option): void => {
    if (option !== sortOption) {
      setSortDirection('desc')
    } else if (sortDirection === 'desc') {
      setSortDirection('asc')
    } else {
      setSortDirection('desc')
    }
    setSortOption(option)
  }

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
            vaults={[]}
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
