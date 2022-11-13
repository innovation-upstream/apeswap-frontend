/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'

import OverallFigures from './components/OverallFigures/OverallFigures'
import TrendingTokens from '../Homepage/components/TrendingTokens/TrendingTokens'
import Transactions from './components/Transactions/Transactions'
import Pairs from './components/Pairs/Pairs'
import Tokens from './components/Tokens/Tokens'
import { nativePricesQuery } from './queries'
import { CHAINS } from './config/config'
const Info: React.FC = () => {
  const [state, setState] = useState({
    nativePrices: [],
  })

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nativePricesQuery),
    }
    // Loop chains
    for (let i = 0; i < CHAINS.length; i++) {
      const chain = CHAINS[i].chain

      fetch(CHAINS[i].graphAddress, requestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          const temp = state.nativePrices
          temp[chain] = result.data.bundles[0].ethPrice

          setState({ nativePrices: temp })
        })
    }
  })

  return (
    <>
      <OverallFigures />
      <TrendingTokens />
      <Tokens amount={10} nativePrices={state.nativePrices} />
      <Transactions amount={10} />
      <br />
      <br />
    </>
  )
}

export default React.memo(Info)
