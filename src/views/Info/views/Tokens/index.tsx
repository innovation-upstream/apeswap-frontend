/** @jsxImportSource theme-ui */
import React from 'react'
import Tokens from '../../components/Tokens/Tokens'

const TokensPage: React.FC = () => {
  return (
    <>
      <Tokens amount={100} showFull={true} />
    </>
  )
}

export default React.memo(TokensPage)
