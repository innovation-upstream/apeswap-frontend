import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { CHAIN_ID } from 'config/constants/chains'
import { useNetworkChainId } from 'state/hooks'
import FarmStakingCard from 'views/Home/components/FarmStaking/FarmStakingCard'
import ApeSwapStats from 'views/Home/components/ApeSwapStats'
import WelcomeCard from './components/WelcomeCard'
import Banner from './components/Header/Banner'
import HotFarms from './components/HotFarms/HotFarms'
import CoolPools from './components/CoolPools/CoolPools'
import WhenNewsSer from './components/WhenNewsSer/WhenNewsSer'
import DualHotFarms from './components/DualFarms/DualHotFarms'
import VauluableVaults from './components/ValuableVaults/ValuableVaults'
import styles from './home.module.css'

export interface GridWidth {
  spanFirst?: number
  spanLast?: number
}

const BannerContainer = styled.div.attrs({
  className: styles.bannerContainer,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 5px;
`

const PageContainer = styled.div.attrs({
  className: styles.pageContainer,
})`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: 50px;
`

const FrontRowWrapper = styled.div.attrs({
  className: styles.frontRowWrapper,
})`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
  margin-bottom: 40px;
`
const FarmAndPoolsWrapper = styled.div.attrs({
  className: styles.farmAndPoolsWrapper,
})`
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
`
const LeftSideFlexWrapper = styled.div.attrs({
  className: styles.leftSideFlexWrapper,
})`
  display: flex;
  width: auto;
  height: auto;
  flex-direction: column;
`

const RightSideFlexWrapper = styled.div.attrs({
  className: styles.rightSideFlexWrapper,
})`
  display: flex;
  width: auto;
  height: 950px;
  margin-top: 40px;
  flex-direction: column;
`

const Home: React.FC = () => {
  const appChainId = useNetworkChainId()

  const renderYieldCards = () => {
    if (appChainId === CHAIN_ID.MATIC || appChainId === CHAIN_ID.MATIC_TESTNET) {
      return (
        <>
          <DualHotFarms />
          <VauluableVaults />
        </>
      )
    }
    return (
      <>
        <HotFarms />
        <CoolPools />
      </>
    )
  }

  return (
    <>
      <Page width="1200px">
        <BannerContainer>
          <Banner />
        </BannerContainer>
        <PageContainer>
          <LeftSideFlexWrapper>
            <FrontRowWrapper>
              <WelcomeCard />
              <FarmStakingCard />
            </FrontRowWrapper>
            <FarmAndPoolsWrapper>{renderYieldCards()}</FarmAndPoolsWrapper>
          </LeftSideFlexWrapper>
          <RightSideFlexWrapper>
            <WhenNewsSer />
            <ApeSwapStats />
          </RightSideFlexWrapper>
        </PageContainer>
      </Page>
    </>
  )
}

export default Home
