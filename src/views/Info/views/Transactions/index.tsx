/** @jsxImportSource theme-ui */
import React from 'react'
import Transactions from '../../components/Transactions/Transactions'
import TrendingTokens from '../../../Homepage/components/TrendingTokens/TrendingTokens'

const TransactionsPage: React.FC = () => {
  return (
    <>
      <TrendingTokens />
      <Transactions amount={100} />
    </>
  )
}

export default React.memo(TransactionsPage)
