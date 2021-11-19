import React, { Suspense, lazy } from 'react'
import styled from 'styled-components'
import { Text, Skeleton } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import nfts from 'config/constants/nfts'

const OwnedNfts = lazy(() => import('./components/OwnedNft'))
const SortNfts = lazy(() => import('./components/SortNfts'))

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Nft = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledHero>
        <img src="/images/ape-banner.png" alt="lottery intro" />
        <Text style={{ color: 'subtle', paddingTop: '10px', textDecoration: 'underline' }}>
          <a href="https://github.com/ApeSwapFinance/non-fungible-apes" target="_blank" rel="noopener noreferrer">
            {TranslateString(999, 'More Info')}
          </a>
        </Text>
        <Suspense fallback={<Skeleton width="100%" height="52px" />}>
          <OwnedNfts />
        </Suspense>
        <Text fontSize="25px" style={{ textDecoration: 'underline', marginTop: '25px', color: 'subtle' }}>
          <a href="https://nftkey.app/collections/nfas/?nfasTab=forSale" target="_blank" rel="noopener noreferrer">
            {TranslateString(999, 'Checkout the NFA aftermarket on NFTKEY!')}
          </a>
        </Text>
      </StyledHero>
      <Suspense fallback={<Skeleton width="100%" height="52px" />}>
        <SortNfts nftSet={nfts} />
      </Suspense>
    </Page>
  )
}

export default Nft
