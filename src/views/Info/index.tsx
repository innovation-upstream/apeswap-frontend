/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'

import OverallFigures from './components/OverallFigures/OverallFigures'
import TrendingTokens from '../Homepage/components/TrendingTokens/TrendingTokens'
import Transactions from './components/Transactions/Transactions'
import Pairs from './components/Pairs/Pairs'
import Tokens from './components/Tokens/Tokens'
import { blocksQuery, nativePricesQuery } from './queries'
import { CHAINS } from './config/config'
import moment from 'moment'
import { Loader } from 'react-feather'
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
      {state.nativePrices['bnb'] != null && state.oneDayBlocks['bnb'] != null ? (
        <div>
          <OverallFigures nativePrices={state.nativePrices} oneDayBlocks={state.oneDayBlocks} />
          <TrendingTokens />
          <Tokens amount={10} nativePrices={state.nativePrices} />
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
