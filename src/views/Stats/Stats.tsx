import React from 'react'
import styled from 'styled-components'
import { Heading, BaseLayout } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import BananaStats from 'views/Stats/components/BananaStats'
import { useFetchStats, useFetchStatsOverall, useStats } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import CardStats from './components/CardStats'
import PageLoader from '../../components/PageLoader'
import styles from './stats.module.css'

const Cards = styled(BaseLayout).attrs({
  className: styles.cards
})`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/stats-night.svg)' : 'url(/images/banners/stats.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

const Stats: React.FC = () => {
  useFetchStatsOverall()
  useFetchStats()
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const yourStats = useStats()
  const stats = yourStats?.stats

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="8px" mt={0} color="white" fontFamily="Titan One">
            {TranslateString(999, 'Ape Stats')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <Page>
        {!account ? (
          <UnlockButton fullWidth fontSize="14px" />
        ) : (
          <div>
            {stats !== null ? (
              <div>
                <Cards>
                  <BananaStats stats={stats} />
                  {stats?.pools[0] && <CardStats data={stats.pools[0]} type="pool" forceDetails />}
                </Cards>
                <Cards>
                  {[...stats.incentivizedPools]
                    .sort((poolA, poolB) => poolB.stakedTvl - poolA.stakedTvl)
                    .map((pool) => {
                      return <CardStats data={pool} type="pool" />
                    })}
                  {[...stats.farms]
                    .sort((poolA, poolB) => poolB.stakedTvl - poolA.stakedTvl)
                    .map((farm) => {
                      return <CardStats data={farm} type="farm" />
                    })}
                </Cards>
              </div>
            ) : (
              <PageLoader />
            )}
          </div>
        )}
      </Page>
    </>
  )
}

export default Stats
