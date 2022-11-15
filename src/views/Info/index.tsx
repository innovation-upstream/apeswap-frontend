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
import { IconBox, Container, SectionsWrapper, Section, SearchInput } from './styles'
import { Chain, CHAINS } from './config/config'
import { CenteredImage } from '../Ifos/components/HowItWorks/styles'
import PageLoader from '../../components/PageLoader'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import {
  useFetchInfoBlock,
  useFetchInfoDaysData,
  useFetchInfoNativePrice,
  useFetchInfoPairs,
  useFetchInfoTokensData,
  useFetchInfoTransactions,
} from 'state/info/hooks'
import { StyledInput } from 'views/Bills/components/Actions/styles'

let query = ''
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

const onHandleQueryChange = (input: string) => {
  query = input
  console.log(query)
}

const Info: React.FC = () => {
  const [state, setState] = useState({
    nativePrices: [],
    oneDayBlocks: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  // These return the data needed from the hook. Just adding the selector to show all state
  useFetchInfoBlock()
  useFetchInfoDaysData()
  useFetchInfoNativePrice()
  useFetchInfoPairs()
  useFetchInfoTokensData()
  useFetchInfoTransactions()
  console.log(useSelector((state: State) => state.info))

  // dispatch(fetchPairs(56, 10))
  // dispatch(fetchBlock(56, 1668452899, 1668539299))
  // dispatch(fetchDaysData(56, 10))
  // dispatch(fetchNativePrice(56))
  // dispatch(fetchTokens(56, 10, 23081639))
  // dispatch(fetchTransactions(56, 10))

  // console.log(infoPairs)
  // console.log(getInfoPairs(56, 10))
  // console.log(getTransactions(56, 10))
  // console.log(getNativePrices(56))
  // console.log(getDaysDataQuery(56, 10))
  // console.log(getBlocksQuery(56, 1668452899, 1668539299))
  // console.log(getUniswapFactoriesQuery(56, 23056202))
  // console.log(getGraphQuery(56))
  // console.log(getTokensQuery(56, 50, 23081639))

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
                <div className="search-wrapper">
                  <SearchInput
                    width="1000px"
                    // ref={inputEl}
                    // value={value}
                    // onChange={onChange}
                    // onBlur={() => setToggled(false)}
                    icon="search"
                  />
                </div>

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

          <OverallFigures nativePrices={state.nativePrices} oneDayBlocks={state.oneDayBlocks} />
          <TrendingTokens />
          <Tokens oneDayBlocks={state.oneDayBlocks} amount={10} nativePrices={state.nativePrices} />
          {/*<Pairs amount={10} nativePrices={state.nativePrices} />*/}
          <Transactions amount={10} />
        </div>
      ) : (
        <div>
          <PageLoader />
        </div>
      )}
      <br />
      <br />
    </>
  )
}

export default React.memo(Info)
