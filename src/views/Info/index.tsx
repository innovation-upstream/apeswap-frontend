/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'

import OverallFigures from './components/OverallFigures/OverallFigures'
import TrendingTokens from '../Homepage/components/TrendingTokens/TrendingTokens'
import Transactions from './components/Transactions/Transactions'
import Pairs from './components/Pairs/Pairs'
import Tokens from './components/Tokens/Tokens'
import { blocksQuery, nativePricesQuery } from './queries'
import moment from 'moment'
import { Loader } from 'react-feather'
import styled from '@emotion/styled'
import { IconBox } from './styles'
import { Chain, CHAINS } from './config/config'
import { CenteredImage } from '../Ifos/components/HowItWorks/styles'

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

export const SectionsWrapper = styled.div`
  position: relative;
  max-width: 1412px;
  width: 100%;
  z-index: 1;
  align-items: center;
  @media screen and (min-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 0px;
  }
`

export const Section = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  z-index: 1;
  padding: 15px 20px 0px 20px;

  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-rows: 50px 150px 20px;
    width: 100vw;
    padding: 20px calc(40% - 200px);
  }
  @media screen and (min-width: 1200px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
  }

  .figure {
    flex: 0 0 50px;
    padding: 10px 0px;
    margin-right: 0px;
  }
`

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
  const [state, setState] = useState({
    nativePrices: [],
    oneDayBlocks: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const currentTimestamp = moment().unix()
    const startTimestamp = moment().subtract(1, 'd').unix()

    const pricesRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nativePricesQuery),
    }

    const blocksRequestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blocksQuery(startTimestamp, currentTimestamp)),
    }

    // Loop chains
    for (let i = 0; i < CHAINS.length; i++) {
      const chain = CHAINS[i].chain

      //Prices
      fetch(CHAINS[i].graphAddress, pricesRequestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          const temp = state.nativePrices
          temp[chain] = result.data.bundles[0].ethPrice

          setState({ nativePrices: temp, oneDayBlocks: state.oneDayBlocks })
        })

      //Blocks
      fetch(CHAINS[i].blockGraph, blocksRequestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          const temp = state.oneDayBlocks
          temp[chain] = result.data.blocks[0].number

          setState({ nativePrices: state.nativePrices, oneDayBlocks: temp })
        })
    }
    setIsLoading(false)
  }, [isLoading])

  return (
    <>
      {Object.keys(state.nativePrices).length === CHAINS.length &&
      Object.keys(state.oneDayBlocks).length === CHAINS.length ? (
        <div>
          <Container>
            <SectionsWrapper>
              <Section>
                {CHAINS.map((chain: Chain) => {
                  return (
                    <div key={chain.id} className="figure">
                      <Icon name={chain.chain} />
                    </div>
                  )
                })}
              </Section>
            </SectionsWrapper>
          </Container>

          <OverallFigures nativePrices={state.nativePrices} oneDayBlocks={state.oneDayBlocks} />
          <TrendingTokens />
          <Tokens amount={10} nativePrices={state.nativePrices} />
          <Pairs amount={10} nativePrices={state.nativePrices} />
          <Transactions amount={10} />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
      <br />
      <br />
    </>
  )
}

export default React.memo(Info)
