/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import Transactions from './components/Transactions/Transactions'
import Pairs from './components/Pairs/Pairs'
import Tokens from './components/Tokens/Tokens'
import { IconBox, Container, SectionsWrapper, Section, SearchInput } from './styles'
import { Chain, CHAINS } from './config/config'
import { CenteredImage } from '../Ifos/components/HowItWorks/styles'
import PageLoader from '../../components/PageLoader'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import { useFetchInfoBlock, useFetchInfoNativePrice, useFetchInfoTokensData } from 'state/info/hooks'
import OverallFigures from './components/OverallFigures/OverallFigures'
import TrendingTokens from '../Homepage/components/TrendingTokens/TrendingTokens'

interface IconProps {
  name: string
}

const Icon = ({ name }: IconProps) => {
  return (
    <IconBox>
      <CenteredImage src={`/images/chains/${name}.png`} alt={name} width="24px" />
    </IconBox>
  )
}

const Info: React.FC = () => {
  // These return the data needed from the hook. Just adding the selector to show all state
  useFetchInfoBlock()
  useFetchInfoTokensData()
  useFetchInfoNativePrice()

  return (
    <>
      <div>
        <Container>
          <SectionsWrapper>
            <Section>
              <div className="search-wrapper"></div>

              {CHAINS.map((chain: Chain) => {
                return (
                  <div key={chain.id} className="chain">
                    <Icon name={chain.chain} />
                  </div>
                )
              })}
            </Section>
          </SectionsWrapper>
        </Container>

        <OverallFigures />
        <TrendingTokens />
        <Tokens amount={10} showFull={false} />
        <Pairs amount={10} />
        <Transactions amount={10} />
      </div>

      {/*<div>*/}
      {/*  <PageLoader />*/}
      {/*</div>*/}

      <br />
      <br />
    </>
  )
}

export default React.memo(Info)
