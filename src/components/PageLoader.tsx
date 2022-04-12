import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@apeswapfinance/uikit'

const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
    max-width: 992px;
  }
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  )
}

export default PageLoader
