import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Flex, ButtonSquare, ButtonMenu, ButtonMenuItem, useMatchBreakpoints } from '@apeswapfinance/uikit'
import GlobalSettings from 'components/Menu/GlobalSettings'

interface Props {
  title?: string
  subtitle?: string
  noConfig?: boolean
  isChartDisplayed?: boolean
}

const CurrencyInputContainer = styled(Flex)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 25px 0px 20px;
  width: 100%;
  background: ${({ theme }) => theme.colors.navbar};
  margin-bottom: 20px;
`

const LinkWrapper = styled.a`
  color: inherit;
  display: inline-block;
  z-index: 20;
  width: 100%;
`

const CurrencyInputHeader: React.FC<Props> = () => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const path = useRouter()
  const swapActive = path.pathname.includes('swap')
  return (
    <CurrencyInputContainer>
      <ButtonMenu activeIndex={swapActive ? 0 : 1} size="mds" variant="yellow">
        <ButtonMenuItem fontSize="14px" isMobile={isMobile}>
          <Link href="/swap" passHref>
            <LinkWrapper>SWAP</LinkWrapper>
          </Link>
        </ButtonMenuItem>
        <ButtonMenuItem fontSize="14px" isMobile={isMobile}>
          <Link href="/pool" passHref>
            <LinkWrapper>LIQUIDITY</LinkWrapper>
          </Link>
        </ButtonMenuItem>
      </ButtonMenu>
      <Flex>
        <a href="https://app.multichain.org/" target="_blank" rel="noopener noreferrer">
          <ButtonSquare
            style={{
              fontSize: '15px',
              fontWeight: 700,
              marginRight: isMobile ? '15px ' : '25px',
              marginLeft: '15px',
              padding: 10,
            }}
          >
            BRIDGE
          </ButtonSquare>
        </a>
        <GlobalSettings />
      </Flex>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
