import React, { useCallback, useEffect, useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import { useTranslation } from '../../../../contexts/Localization'
import { Row, Column, HeadingWrapper, FiguresWrapper, BodyWrapper } from '../../styles'
import useTheme from '../../../../hooks/useTheme'
import { InfoPair } from 'views/Info/types'
import { useSelector } from 'react-redux'
import { State } from '../../../../state/types'
import { useFetchInfoPairs } from '../../../../state/info/hooks'

interface PairsProps {
  amount: number
  nativePrices?: any
  filter?: string
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

const Pairs: React.FC<PairsProps> = (props) => {
  const { t } = useTranslation()
  const { isDark } = useTheme()
  const pairs = useFetchInfoPairs(props.amount)

  function processPairs() {
    const data = []
    for (let i = 0; i < Object.keys(pairs).length; i++) {
      const chain = Object.keys(pairs)[i]
      for (let j = 0; j < pairs[chain].data.length; j++) {
        data.push(pairs[chain].data[j])
      }
    }

    if (props.filter) {
      return data
        .filter((x) => x.token0.id === props.filter || x.token1.id === props.filter)
        .sort((a: InfoPair, b: InfoPair) => a.volumeUSD - b.volumeUSD)
        .reverse()
        .slice(0, props.amount)
    }

    return data
      .sort((a: InfoPair, b: InfoPair) => a.volumeUSD - b.volumeUSD)
      .reverse()
      .slice(0, props.amount)
  }

  const toggleFav = (pair: string) => {
    let currentFavs = JSON.parse(localStorage.getItem('infoFavPairs'))
    if (currentFavs === null) currentFavs = []

    const index = currentFavs.indexOf(pair, 0)
    if (index > -1) {
      currentFavs.splice(index, 1)
    } else {
      currentFavs.push(pair)
    }

    localStorage.setItem('infoFavPairs', JSON.stringify(currentFavs))
  }

  const favs = JSON.parse(localStorage.getItem('infoFavPairs'))

  const getFavs = () => {
    const favs = JSON.parse(localStorage.getItem('infoFavPairs'))
    return processPairs().filter((x) => favs.includes(x.id))
  }

  const getFavIcon = (pair: string) => {
    if (favs !== null && favs.filter((x) => x === pair).length > 0)
      return `/images/info/fav-yes-${isDark ? 'dark' : 'light'}.svg`

    return `/images/info/fav-no-${isDark ? 'dark' : 'light'}.svg`
  }

  return (
    <div>
      <HeadingContainer>
        <HeadingWrapper>
          <Text margin="20px 10px 5px 10px" className="heading">
            {t('Top Pairs')}
          </Text>
          {!props.filter && (
            <Text style={{ float: 'right' }}>
              <a href="/info/pairs">
                See more <img src={`/images/info/arrow-right-${isDark ? 'dark' : 'light'}.svg`} alt="see more" />
              </a>
            </Text>
          )}
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
            {processPairs().map((pair: InfoPair, index: number) => {
              return (
                <Row key={pair.id} background={index % 2 === 0}>
                  <Column width="35px">
                    <img className="fav" width="16px" src={getFavIcon(pair.id)} onClick={() => toggleFav(pair.id)} />{' '}
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

export default Pairs
