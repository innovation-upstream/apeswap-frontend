/** @jsxImportSource theme-ui */
import React from 'react'
import Tokens from '../../components/Tokens/Tokens'
import TrendingTokens from '../../../Homepage/components/TrendingTokens/TrendingTokens'

const TokensPage: React.FC = () => {
  return (
    <>
      <TrendingTokens />
      <Tokens amount={100} />
    </>
  )
}

export default React.memo(TokensPage)
