/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import { useFetchInfoBlock, useFetchInfoNativePrice, useFetchInfoTokensData } from 'state/info/hooks'
import TrendingTokens from './components/TrendingTokens/TrendingTokens'
import Overview from './components/Overview'
import VolumeChart from './components/VolumeChart'
import Tokens from './components/Tokens'
import Heading from './components/Heading'
import Pairs from './components/Pairs'
import Transactions from './components/Transactions'

const InfoPage = () => {
  useFetchInfoBlock()
  useFetchInfoNativePrice()
  useFetchInfoTokensData(20)

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Flex
        sx={{
          height: 'fit-content',
          width: 'fit-content',
          maxWidth: '1500px',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '40px 0px',
        }}
      >
        <Heading />
        <TrendingTokens />
        <Tokens />
        <Pairs />
        <Transactions />
      </Flex>
    </Flex>
  )
}

export default InfoPage
