import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading, Text, Card, Checkbox, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePools } from 'state/hooks'
import { Pool } from 'state/types'
import useBlock from 'hooks/useBlock'
import Page from 'components/layout/Page'
import ToggleView from './components/ToggleView/ToggleView'
import SearchInput from './components/SearchInput'
import PoolTabButtons from './components/PoolTabButtons'
import PoolCard from './components/PoolCard/PoolCard'
import PoolTable from './components/PoolTable/PoolTable'
import { ViewMode } from './components/types'
import styles from './pools.module.css'

interface LabelProps {
  active?: boolean
}

const float = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  50% {transform: translate3d(50px, 0px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`
const floatSM = keyframes`
  0% {transform: translate3d(0px, 0px, 0px);}
  50% {transform: translate3d(10px, 0px, 0px);}
  100% {transform: translate3d(0px, 0px, 0px);}
`

const ControlContainer = styled(Card).attrs({
  className: styles.controlContainer
})`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: center;
  flex-direction: column;
  overflow: visible;
  padding-bottom: 10px;
  transform: translateY(-85px);
`

const ToggleText = styled(Text).attrs({
  className: styles.toggleText,
})``

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0px;
  cursor: pointer;
  ${ToggleText} {
    margin-left: 4px;
  }
`

const ToggleContainer = styled.div.attrs({
  className: styles.toggleContainer
})<{ size: number }>`
  position: absolute;
  right: 5%;
  display: flex;
  flex-direction: column;
  height: 75px;
  margin-left: 15px;
  justify-content: space-between;
  transform: translateY(-25px);
`

const LabelWrapper = styled.div.attrs({
  className: styles.labelWrapper
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > ${Text} {
    font-size: 12px;
  }

  margin-left: 30px;
`

const ViewControls = styled.div.attrs({
  className: styles.viewControls
})`
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  width: 100%;

  > div {
    padding: 8px 0px;
  }
`

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const Header = styled.div.attrs({
  className: styles.header
})`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/pool-background-night.svg)' : 'url(/images/pool-background-day.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;
`

const PoolMonkey = styled.div`
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/pool-ape-night.svg)' : 'url(/images/pool-ape.svg)')};
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
`

const MonkeyWrapper = styled.div.attrs({
  className: styles.monkeyWrapper
})`
  position: absolute;
  width: 225px;
  height: 275px;
  margin-left: auto;
  margin-right: auto;
  bottom: 0px;
  right: 0px;
  animation: 5s ${floatSM} linear infinite;
`

const StyledText = styled(Text).attrs({
  className: styles.styledText
})`
  font-weight: 700;
  font-size: 12px;
`

interface CheckboxProps {
  checked?: boolean
}

const StyledCheckbox = styled(Checkbox)<CheckboxProps>`
  height: 21px;
  width: 21px;
`

const ContainerLabels = styled.div.attrs({
  className: styles.containerLabels
})`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin-top: 24px;
  height: 32px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-85px);
`

const StyledLabelContainerHot = styled.div.attrs({
  className: styles.styledLabelContainerHot
})`
  cursor: pointer;
`

const StyledLabelContainerLP = styled.div.attrs({
  className: styles.styledLabelContainerLP
})``

const StyledLabelContainerAPR = styled.div.attrs({
  className: styles.styledLabelContainerAPR
})`
  cursor: pointer;
`

const StyledLabelContainerLiquidity = styled.div.attrs({
  className: styles.styledLabelContainerLiquidity
})`
  cursor: pointer;
`

const StyledLabelContainerEarned = styled.div.attrs({
  className: styles.styledLabelContainerEarned
})`
  cursor: pointer;
`

const CardContainer = styled.div.attrs({
  className: styles.cardContainer
})`
  margin-top: 17px;
  transform: translateY(-85px);
`

const ButtonCheckWrapper = styled.div.attrs({
  className: styles.buttonCheckWrapper
})`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
`

const StyledHeading = styled(Heading).attrs({
  className: styles.styledHeading
})`
  font-size: 32px;
  max-width: 176px !important;
`

const StyledPage = styled(Page).attrs({
  className: styles.styledPage
})`
  padding-left: 5px;
  padding-right: 5px;
  width: 100vw;
`

const StyledLabel = styled.div<LabelProps>`
  display: flex;
  color: ${({ theme, active }) => (active ? '#FFFFFF' : theme.colors.primary)};
  font-family: Poppins;
  padding: 4px 12px;
  font-weight: bold;
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

const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? 'black' : '#faf9fa')};
`

const Container = styled.div.attrs({
  className: styles.container
})`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;
  transform: translateY(-85px);
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
const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const [stakedOnly, setStakedOnly] = useState(false)
  const [gnanaOnly, setGnanaOnly] = useState(false)
  const [bananaOnly, setBananaOnly] = useState(false)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [viewMode, setViewMode] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()
  const { pathname } = useLocation()
  const size: Size = useWindowSize()
  const allPools = usePools(account)
  const TranslateString = useI18n()
  const block = useBlock()
  const isActive = !pathname.includes('history')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

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

  const allNonAdminPools = allPools.filter((pool) => !pool.forAdmins)
  const curPools = allNonAdminPools.map((pool) => {
    return { ...pool, isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock }
  })

  const [finishedPools, openPools] = partition(curPools, (pool) => pool.isFinished)

  const stakedOnlyPools = openPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedInactivePools = finishedPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0),
  )

  const gnanaOnlyPools = openPools.filter((pool) => pool.stakingToken?.symbol === 'GNANA')
  const bananaOnlyPools = openPools.filter((pool) => pool.stakingToken?.symbol === 'BANANA')

  const gnanaInactivePools = finishedPools.filter((pool) => pool.stakingToken?.symbol === 'GNANA')
  const bananaInactivePools = finishedPools.filter((pool) => pool.stakingToken?.symbol === 'BANANA')
  const gnanaStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'GNANA',
  )
  const bananaStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'BANANA',
  )

  const allStakedOnlyPools = openPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      (pool.stakingToken?.symbol === 'BANANA' || pool.stakingToken?.symbol === 'GNANA'),
  )

  const gnanaStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'GNANA',
  )

  const bananaStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      pool.stakingToken?.symbol === 'BANANA',
  )

  const allStakedInactivePools = finishedPools.filter(
    (pool) =>
      pool.userData &&
      new BigNumber(pool.userData.stakedBalance).isGreaterThan(0) &&
      (pool.stakingToken?.symbol === 'BANANA' || pool.stakingToken?.symbol === 'GNANA'),
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

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(poolsToSort, (pool: Pool) => pool.apr, sortDirection)
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.rewardToken?.price) {
              return 0
            }
            return getBalanceNumber(pool.userData.pendingReward) * pool.rewardToken?.price
          },
          sortDirection,
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => getBalanceNumber(pool.totalStaked) * pool.stakingToken?.price,
          sortDirection,
        )
      default:
        return orderBy(poolsToSort, (pool: Pool) => pool.sortOrder, 'asc')
    }
  }

  const poolsToShow = () => {
    let chosenPools = []

    if (stakedOnly && gnanaOnly && !bananaOnly) {
      chosenPools = isActive ? gnanaStakedOnlyPools : gnanaStakedInactivePools
    } else if (stakedOnly && bananaOnly && !gnanaOnly) {
      chosenPools = isActive ? bananaStakedOnlyPools : bananaStakedInactivePools
    } else if (stakedOnly && !gnanaOnly && !bananaOnly) {
      chosenPools = isActive ? stakedOnlyPools : stakedInactivePools
    } else if (!stakedOnly && gnanaOnly && !bananaOnly) {
      chosenPools = isActive ? gnanaOnlyPools : gnanaInactivePools
    } else if (!stakedOnly && bananaOnly && !gnanaOnly) {
      chosenPools = isActive ? bananaOnlyPools : bananaInactivePools
    } else if (stakedOnly && (bananaOnly || gnanaOnly)) {
      chosenPools = isActive ? allStakedOnlyPools : allStakedInactivePools
    } else {
      chosenPools = isActive ? openPools : finishedPools
    }

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool.tokenName.toLowerCase().includes(lowercaseQuery))
    }
    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  const cardLayout = (
    <CardContainer>
      <FlexLayout>
        {poolsToShow().map((pool) => (
          <PoolCard key={pool.sousId} pool={pool} removed={!isActive} />
        ))}
      </FlexLayout>
    </CardContainer>
  )

  const tableLayout = (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            {poolsToShow().map((pool) => (
              <PoolTable key={pool.sousId} pool={pool} removed={!isActive} />
            ))}
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Banana Pools')}
          </StyledHeading>
          {size.width > 968 && (
            <Text fontSize="22px" fontWeight={400} color="white">
              Stake BANANA to earn new tokens. <br /> You can unstake at any time. <br /> Rewards are calculated per
              block.
            </Text>
          )}
        </HeadingContainer>
        <MonkeyWrapper>
          <PoolMonkey />
        </MonkeyWrapper>
      </Header>
      <StyledPage width="1130px">
        <ControlContainer>
          <ViewControls>
            {size.width > 968 && viewMode !== null && (
              <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            )}
            <LabelWrapper>
              <StyledText mr="15px">Search</StyledText>
              <SearchInput onChange={handleChangeQuery} value={searchQuery} />
            </LabelWrapper>
            <ButtonCheckWrapper>
              <PoolTabButtons />
              <ToggleContainer size={size.width}>
                <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                  <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                  <StyledText>{TranslateString(1116, 'Staked')}</StyledText>
                </ToggleWrapper>
                <ToggleWrapper onClick={() => setGnanaOnly(!gnanaOnly)}>
                  <StyledCheckbox checked={gnanaOnly} onChange={() => setGnanaOnly(!gnanaOnly)} />
                  <StyledText> {TranslateString(1116, 'GNANA')}</StyledText>
                </ToggleWrapper>
                <ToggleWrapper onClick={() => setBananaOnly(!bananaOnly)}>
                  <StyledCheckbox checked={bananaOnly} onChange={() => setBananaOnly(!bananaOnly)} />
                  <StyledText> BANANA</StyledText>
                </ToggleWrapper>
              </ToggleContainer>
            </ButtonCheckWrapper>
          </ViewControls>
        </ControlContainer>
        <ContainerLabels>
          <StyledLabelContainerHot>
            <StyledLabel active={sortOption === 'hot'} onClick={() => handleSortOptionChange('hot')}>
              Hot
            </StyledLabel>
          </StyledLabelContainerHot>
          <StyledLabelContainerLP>
            <StyledLabel>Token</StyledLabel>
          </StyledLabelContainerLP>
          <StyledLabelContainerAPR>
            <StyledLabel active={sortOption === 'apr'} onClick={() => handleSortOptionChange('apr')}>
              APR
              {sortOption === 'apr' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerAPR>
          <StyledLabelContainerLiquidity>
            <StyledLabel active={sortOption === 'totalStaked'} onClick={() => handleSortOptionChange('totalStaked')}>
              Total Staked
              {sortOption === 'totalStaked' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerLiquidity>
          <StyledLabelContainerEarned>
            <StyledLabel active={sortOption === 'earned'} onClick={() => handleSortOptionChange('earned')}>
              Earned
              {sortOption === 'earned' ? (
                <StyledArrowDropDownIcon width="7px" height="8px" color="white" down={sortDirection === 'desc'} />
              ) : null}
            </StyledLabel>
          </StyledLabelContainerEarned>
        </ContainerLabels>
        {viewMode === ViewMode.CARD ? cardLayout : tableLayout}
        <div ref={loadMoreRef} />
      </StyledPage>
    </>
  )
}

export default Pools
