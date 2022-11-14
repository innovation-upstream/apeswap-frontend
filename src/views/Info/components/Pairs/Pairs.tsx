import React, { useEffect, useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import { useTranslation } from '../../../../contexts/Localization'
import { CHAINS } from '../../config/config'
import { Row, Column, HeadingWrapper, LeftArrowIcon, RightArrowIcon, FiguresWrapper, BodyWrapper } from '../../styles'
import { pairsQuery, tokensQuery } from '../../queries'
import useTheme from '../../../../hooks/useTheme'

interface Pair {
  id: string
  token0: {
    symbol: string
    name: string
  }
  token1: {
    symbol: string
    name: string
  }
  reserveUSD: number
  volumeUSD: number
}

interface PairsProps {
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

const Tokens: React.FC<PairsProps> = (props) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()

  const [state, setState] = useState({
    pairs: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pairsQuery(props.amount)),
    }

    // Loop chains
    for (let i = 0; i < CHAINS.length; i++) {
      fetch(CHAINS[i].graphAddress, requestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          setState({ pairs: result.data.pairs })
        })
    }
    setIsLoading(false)
  }, [isLoading])

  return (
    <div>
      <HeadingContainer>
        <HeadingWrapper>
          <Text margin="20px 10px 5px 10px" className="heading">
            {t('Top Pairs')}
          </Text>
          <Text style={{ float: 'right' }}>
            <a href="tokens">
              See more <img src={`/images/info/arrow-right-${isDark ? 'dark' : 'light'}.svg`} alt="see more" />
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
              <Column flex="2">{t('Pair')}</Column>
              <Column>{t('Liquidity')}</Column>
              <Column>{t('Volume (24h)')}</Column>
              <Column>{t('Volume (7d)')}</Column>
            </Row>
            {state.pairs.map((pair: Pair, index: number) => {
              return (
                <Row key={pair.id} background={index % 2 === 0}>
                  <Column width="35px">
                    <img width="16px" src={`/images/info/fav-no-${isDark ? 'dark' : 'light'}.svg`} />
                  </Column>
                  <Column width="18px">{index + 1}</Column>
                  <Column flex="2">
                    <img
                      width="24px"
                      className="logo"
                      src={`https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${pair.token0.symbol}.svg`}
                      onError={(e) => {
                        e.currentTarget.src = `/images/info/unknownToken.svg`
                      }}
                    />
                    <img
                      width="24px"
                      className="logo logo-right"
                      src={`https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${pair.token1.symbol}.svg`}
                      onError={(e) => {
                        e.currentTarget.src = `/images/info/unknownToken.svg`
                      }}
                    />
                    {pair.token0.name}-{pair.token1.name}
                  </Column>
                  <Column>${Math.round(pair.reserveUSD).toLocaleString()}</Column>
                  <Column>${Math.round(pair.volumeUSD).toLocaleString()}</Column>
                  <Column>${Math.round(pair.volumeUSD).toLocaleString()}</Column>
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
