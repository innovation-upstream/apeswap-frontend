import React, { useEffect, useState, useMemo } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import { Heading, RowType, Text, Card, Checkbox, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { usePriceBananaBusd, useDualFarms, usePollDualFarms } from 'state/hooks'
import useTheme from 'hooks/useTheme'
import useWindowSize, { Size } from 'hooks/useDimensions'
import { DualFarm } from 'state/types'
import { orderBy } from 'lodash'
import useI18n from 'hooks/useI18n'
import FarmCard from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Table from './components/FarmTable/FarmTable'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import styles from './dualfarms.module.css'
import globalStyle from '../../style/global.module.css'

interface LabelProps {
  active?: boolean
}

const ControlContainer = styled(Card).attrs({
  className: styles.controlContainer,
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
  className: styles.ToggleText,
})``

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;

  ${ToggleText} {
    margin-left: 4px;
  }
`

const LabelWrapper = styled.div.attrs({
  className: styles.labelWrapper,
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
  className: styles.viewControls,
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
  className: styles.header,
})`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/farm-polygon-night.svg)' : 'url(/images/farm-polygon-day.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;
`

const StyledText = styled(Text).attrs({
  className: styles.styledText,
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

const StyledImage = styled.img.attrs({
  className: styles.styledImage,
})`
  height: 187px;
  width: 134px;
  position: absolute;
  right: 0px;
  bottom: 51px;
`

const ContainerLabels = styled.div.attrs({
  className: styles.containerLabels,
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
  className: styles.styledLabelContainerHot,
})`
  cursor: pointer;
`

const StyledLabelContainerLP = styled.div.attrs({
  className: styles.styledLabelContainerLP,
})``

const StyledLabelContainerAPR = styled.div.attrs({
  className: styles.styledLabelContainerAPR,
})`
  cursor: pointer;
`

const StyledLabelContainerLiquidity = styled.div.attrs({
  className: styles.styledLabelContainerLiquidity,
})`
  cursor: pointer;
`

const StyledLabelContainerEarned = styled.div.attrs({
  className: styles.styledLabelContainerEarned,
})`
  cursor: pointer;
`

const CardContainer = styled.div.attrs({
  className: `${styles.cardContainer} ${globalStyle.smallToMidOnly}`,
})`
  margin-top: 17px;

  transform: translateY(-85px);
`

const ButtonCheckWrapper = styled.div.attrs({
  className: styles.buttonCheckWrapper,
})`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
  margin-right: 30px;
`

const StyledHeading = styled(Heading).attrs({
  className: styles.styledHeading,
})`
  font-size: 30px;
  max-width: 176px !important;
  color: white;
`

const StyledPage = styled(Page).attrs({
  className: styles.styledPage,
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

const DualFarms: React.FC = () => {
  usePollDualFarms()
  const size: Size = useWindowSize()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const bananaPrice = usePriceBananaBusd()
  const { account } = useWeb3React()
  const farmsLP = useDualFarms()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(null)
  const [sortOption, setSortOption] = useState('hot')
  const [sortDirection, setSortDirection] = useState<boolean | 'desc' | 'asc'>('desc')

  useEffect(() => {
    if (size.width !== undefined) {
      if (size.width < 968) {
        setViewMode(ViewMode.CARD)
      } else {
        setViewMode(ViewMode.TABLE)
      }
    }
  }, [size])

  const [stakedOnly, setStakedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP.filter((farm) => farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const { isDark } = useTheme()

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []
    let tempFarmsStaked = []

    const sortFarms = (farms: DualFarm[]): DualFarm[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: DualFarm) => farm.apr, sortDirection)
        case 'multiplier':
          return orderBy(
            farms,
            (farm: DualFarm) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            sortDirection,
          )
        case 'earned':
          return orderBy(
            farms,
            (farm: DualFarm) => (farm.userData ? Number(farm.userData?.miniChefEarnings) : 0),
            sortDirection,
          )
        case 'liquidity':
          return orderBy(farms, (farm: DualFarm) => Number(farm.totalStaked), sortDirection)
        default:
          return farms
      }
    }

    if (isActive) {
      tempFarmsStaked = stakedOnly ? stakedOnlyFarms : activeFarms
    } else {
      tempFarmsStaked = stakedOnly ? stakedInactiveFarms : inactiveFarms
    }

    if (query) {
      farmsStaked = tempFarmsStaked.filter((farm) =>
        `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      )
    } else {
      farmsStaked = tempFarmsStaked
    }

    return sortFarms(farmsStaked)
  }, [
    sortOption,
    activeFarms,
    inactiveFarms,
    isActive,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    sortDirection,
    query,
  ])

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const rowData = farmsStakedMemoized.map((farm) => {
    const lpLabel = `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
    const miniChefRewardTokens = getBalanceNumber(
      farm?.userData?.miniChefEarnings,
      farm?.rewardTokens?.token0?.decimals,
    )
    const rewarderTokens = getBalanceNumber(farm?.userData?.rewarderEarnings, farm?.rewardTokens?.token1?.decimals)
    const dollarsEarned = miniChefRewardTokens * farm?.rewardToken0Price + rewarderTokens * farm?.rewardToken1Price

    const row: RowProps = {
      apr: {
        value: farm.apr?.toFixed(2),
        multiplier: farm.multiplier,
        lpLabel,
        bananaPrice,
        originalValue: farm.apr,
      },
      farm: {
        stakeTokens: farm?.stakeTokens,
        rewardTokens: farm?.rewardTokens,
        label: `${farm?.stakeTokens?.token1?.symbol}-${farm?.stakeTokens?.token0?.symbol}`,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? dollarsEarned : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: new BigNumber(farm.totalStaked),
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }
    return row
  })

  const getColumns = (): any[] => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }
              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return columns
    }

    return []
  }

  const renderContent = (): JSX.Element => {
    const columns = getColumns()
    const isSnap = navigator.userAgent === 'ReactSnap'

    return (
      <>
        {(isSnap || (viewMode === ViewMode.TABLE && rowData.length)) && <Table data={rowData} columns={columns} />}
        {(isSnap || viewMode !== ViewMode.TABLE) && (
          <CardContainer>
            <FlexLayout>
              <Route exact path={`${path}`}>
                {farmsStakedMemoized.map((farm) => (
                  <FarmCard key={farm.pid} farm={farm} bananaPrice={bananaPrice} account={account} removed={false} />
                ))}
              </Route>
              <Route exact path={`${path}/history`}>
                {farmsStakedMemoized.map((farm) => (
                  <FarmCard key={farm.pid} farm={farm} bananaPrice={bananaPrice} account={account} removed />
                ))}
              </Route>
            </FlexLayout>
          </CardContainer>
        )}
      </>
    )
  }

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

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0} fontFamily="Titan One">
            {TranslateString(999, 'Stake LP tokens to earn Rewards')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <StyledPage width="1130px">
        <ControlContainer>
          <ViewControls>
            {size.width > 968 && viewMode !== null && (
              <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            )}
            <LabelWrapper>
              <StyledText mr="15px">Search</StyledText>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
            <ButtonCheckWrapper>
              <FarmTabButtons />
              <ToggleWrapper onClick={() => setStakedOnly(!stakedOnly)}>
                <StyledCheckbox checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} />
                <StyledText> {TranslateString(1116, 'Staked')}</StyledText>
              </ToggleWrapper>
            </ButtonCheckWrapper>
            {isDark ? (
              <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
            ) : (
              <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
            )}
          </ViewControls>
        </ControlContainer>
        <ContainerLabels>
          <StyledLabelContainerHot>
            <StyledLabel active={sortOption === 'hot'} onClick={() => handleSortOptionChange('hot')}>
              Hot
            </StyledLabel>
          </StyledLabelContainerHot>
          <StyledLabelContainerLP>
            <StyledLabel>LP</StyledLabel>
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
            <StyledLabel active={sortOption === 'liquidity'} onClick={() => handleSortOptionChange('liquidity')}>
              Liquidity
              {sortOption === 'liquidity' ? (
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
        {viewMode === null ? null : renderContent()}
      </StyledPage>
    </>
  )
}

export default DualFarms
