/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import Tokens, { HeadingContainer } from '../../components/Tokens/Tokens'
import TrendingTokens from '../../../Homepage/components/TrendingTokens/TrendingTokens'
import { useFetchInfoNativePrice, useFetchInfoTokenDaysData } from '../../../../state/info/hooks'
import { useParams } from 'react-router-dom'
import { IconBox, Container, SectionsWrapper, Section, SearchInput, HeadingWrapper } from '../../styles'
import { Text } from '@apeswapfinance/uikit'
import Pairs from '../../components/Pairs/Pairs'
import Transactions from '../../components/Transactions/Transactions'

const TokenPage: React.FC = () => {
  const { chain, tokenId } = useParams<{ chain: string; tokenId: string }>()

  const tokenDaysData = useFetchInfoTokenDaysData(Number(chain), tokenId)

  const nativePrices = useFetchInfoNativePrice()

  return (
    <>
      {tokenDaysData[chain].data !== null && (
        <>
          <HeadingContainer>
            <HeadingWrapper>
              <img
                width="24px"
                className="logo"
                src={`https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenDaysData[chain].data[0].token.symbol}.svg`}
                onError={(e) => {
                  e.currentTarget.src = `/images/info/unknownToken.svg`
                }}
              />
              <Text margin="5px 10px 5px 10px" className="heading">
                {tokenDaysData[chain].data[0].token.name} ({tokenDaysData[chain].data[0].token.symbol})
              </Text>
            </HeadingWrapper>
          </HeadingContainer>
          <HeadingContainer>
            <HeadingWrapper>
              <Text margin="20px 10px 5px 10px" className="heading">
                ${(Math.round(tokenDaysData[chain].data[0].priceUSD * 100) / 100).toLocaleString()}
              </Text>
            </HeadingWrapper>
          </HeadingContainer>
          <Container>
            <SectionsWrapper>
              <Section>
                ${(Math.round(tokenDaysData[chain].data[0].totalLiquidityUSD * 100) / 100).toLocaleString()}
              </Section>
            </SectionsWrapper>
          </Container>
          <Pairs amount={100} filter={tokenId} />
          <Transactions amount={300} filter={tokenId} />
        </>
      )}
    </>
  )
}

export default React.memo(TokenPage)
