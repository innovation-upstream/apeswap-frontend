/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import BananaSupplyDistribution from './components/BananaSupplyDistribution'
import MarketCapToTvlRatio from './components/MarketCapToTvlRatio'
import ProtocolMetricsGraph from './components/ProtocolMetricGraph'
import ProtocolMetrics from './components/ProtocolMetrics'
import TotalTradeVolume from './components/TotalTradeVolume'
import TotalValueLocked from './components/TotalValueLocked'

const Overview: React.FC = () => {
  return (
    <Flex
      sx={{
        position: 'relative',
        maxWidth: '1200px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      <Flex
        sx={{
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'no-wrap',
          '@media screen and (max-width: 1075px)': {
            flexWrap: 'wrap',
          },
        }}
      >
        <TotalValueLocked />
        <TotalTradeVolume />
      </Flex>
      <MarketCapToTvlRatio />
      <BananaSupplyDistribution />
      <ProtocolMetrics />
      <ProtocolMetricsGraph />
    </Flex>
  )
}

export default Overview
