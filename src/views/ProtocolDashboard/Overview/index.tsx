/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import BananaSupplyDistribution from './components/BananaSupplyDistribution'
import MarketCapToTvlRatio from './components/MarketCapToTvlRatio'
import ProtocolMetrics from './components/ProtocolMetrics'
import ProtocolMetricsGraph from './components/ProtocolMetricsGraph'
import TotalTradeVolume from './components/TotalTradeVolume'
import TotalValueLocked from './components/TotalValueLocked'

const Overview: React.FC = () => {
  return (
    <Flex
      sx={{
        maxWidth: '1200px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <TotalValueLocked />
      <TotalTradeVolume />
      <MarketCapToTvlRatio />
      <BananaSupplyDistribution />
      <ProtocolMetrics />
      <ProtocolMetricsGraph />
    </Flex>
  )
}

export default Overview
