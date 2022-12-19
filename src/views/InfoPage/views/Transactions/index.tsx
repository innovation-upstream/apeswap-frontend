/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import Transactions from '../../components/Transactions'
import TrendingTokens from '../../components/TrendingTokens/TrendingTokens'
import { useFetchInfoBlock } from '../../../../state/info/hooks'

const TransactionsPage = () => {
  useFetchInfoBlock()

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Flex
        sx={{
          height: 'fit-content',
          width: 'fit-content',
          maxWidth: '1200px',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '40px 0px',
        }}
      >
        <TrendingTokens />
        <Transactions headerText="All Transactions" amount={1000} pageSize={20} />
      </Flex>
    </Flex>
  )
}

export default TransactionsPage
