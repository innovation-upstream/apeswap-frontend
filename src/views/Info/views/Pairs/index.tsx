/** @jsxImportSource theme-ui */
import React from 'react'
import Tokens from '../../components/Tokens/Tokens'
import TrendingTokens from '../../../Homepage/components/TrendingTokens/TrendingTokens'
import Pairs from '../../components/Pairs/Pairs'

const PairsPage: React.FC = () => {
  return (
    <>
      <Pairs amount={100} />
    </>
  )
}

export default React.memo(PairsPage)
