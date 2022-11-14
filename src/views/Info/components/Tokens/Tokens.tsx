import React, { useEffect, useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import { useTranslation } from '../../../../contexts/Localization'
import { CHAINS } from '../../config/config'
import { Row, Column, HeadingWrapper, LeftArrowIcon, RightArrowIcon, FiguresWrapper, BodyWrapper } from '../../styles'
import { tokensQuery } from '../../queries'
import useTheme from '../../../../hooks/useTheme'

interface RowProps {
  background?: boolean
}

interface Token {
  id: string
  name: string
  symbol: string
  totalLiquidity: number
  derivedETH: number
  tradeVolumeUSD: number
}

interface TokensProps {
  amount: number
  nativePrices?: any
}

export const HeadingContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
  margin-bottom: 40px;
`

const Tokens: React.FC<TokensProps> = (props) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const [state, setState] = useState({
    tokens: [],
    nativePrice: 1,
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tokensQuery(props.amount)),
    }

    // Loop chains
    for (let i = 0; i < CHAINS.length; i++) {
      fetch(CHAINS[i].graphAddress, requestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          setState({ tokens: result.data.tokens, nativePrice: props.nativePrices[CHAINS[i].chain] })
        })
    }
    setIsLoading(false)
  }, [isLoading])

  return (
    <div>
      <HeadingContainer>
        <HeadingWrapper>
          <Text margin="20px 10px 5px 10px" className="heading">
            {t('Top Tokens')}
          </Text>
          <Text style={{ float: 'right' }}>
            <a href="tokens">
              See more <RightArrowIcon />
            </a>
          </Text>
        </HeadingWrapper>
      </HeadingContainer>
      <Container>
        <FiguresWrapper>
          <BodyWrapper>
            <Row>
              <Column width="18px">&nbsp;&nbsp;</Column>
              <Column width="18px">{t('#')}</Column>
              <Column flex="2">{t('Token Name')}</Column>
              <Column>{t('Price')}</Column>
              <Column>{t('Liquidity')}</Column>
              <Column>{t('Volume (24h)')}</Column>
            </Row>
            {state.tokens.map((token: Token, index: number) => {
              return (
                <Row key={token.id} background={index % 2 === 0}>
                  <Column width="35px">
                    <img width="16px" src={`/images/info/fav-no-${isDark ? 'dark' : 'light'}.svg`} />
                  </Column>
                  <Column width="18px">{index + 1}</Column>
                  <Column flex="2">
                    <img
                      width="24px"
                      className="logo"
                      src={`https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${token.symbol}.svg`}
                      onError={(e) => {
                        e.currentTarget.src = `/images/info/unknownToken.svg`
                      }}
                    />
                    {token.name} ({token.symbol})
                  </Column>
                  <Column>${(Math.round(token.derivedETH * state.nativePrice * 100) / 100).toLocaleString()}</Column>
                  <Column>
                    ${Math.round(token.totalLiquidity * state.nativePrice * token.derivedETH).toLocaleString()}
                  </Column>
                  <Column>${Math.round(token.tradeVolumeUSD).toLocaleString()}</Column>
                </Row>
              )
            })}
          </BodyWrapper>
        </FiguresWrapper>
      </Container>
    </div>
  )
}

export default Tokens
