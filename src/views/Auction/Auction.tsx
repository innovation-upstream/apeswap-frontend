/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Flex, Spinner } from '@ape.swap/uikit'
import SwiperProvider from 'contexts/SwiperProvider'
import Banner from 'components/Banner'
import { useAuctions, useFetchAuctions } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import Positions from './components/Positions'
import History from './components/History'
import ListYourNfa from './components/Actions/ListYourNfa'
import { AuctionCardsWrapper, MoreInfoWrapper, PageWrapper, SplitWrapper } from './styles'
import ListViewLayout from '../../components/layout/ListViewLayout'

const Auction: React.FC = () => {
  useFetchAuctions()
  const { auctions } = useAuctions()
  const { t } = useTranslation()
  return (
    <SwiperProvider>
      <Flex
        sx={{
          position: 'relative',
          top: '30px',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItem: 'center',
          marginBottom: '30px',
        }}
      >
        <ListViewLayout>
          <Flex alignItems="center" justifyContent="center">
            <Flex alignSelf="center" style={{ width: '1200px' }}>
              <Banner
                banner="auction"
                link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/collect/nfa-auction-house"
                title={t('Nfa Auction')}
              />
            </Flex>
          </Flex>
          <PageWrapper>
            <Flex sx={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}>
              <MoreInfoWrapper>
                <Button size="sm" style={{ marginRight: '10px', height: '36px' }}>
                  <a
                    href="https://apeswap.gitbook.io/apeswap-finance/product-information/non-fungible-apes-nfas/nfa-auction-house"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('HOW IT WORKS')}
                  </a>
                </Button>
                <ListYourNfa />
              </MoreInfoWrapper>
            </Flex>
            {auctions ? (
              <SplitWrapper>
                <AuctionCardsWrapper>{auctions && <Positions auctions={auctions} />}</AuctionCardsWrapper>
              </SplitWrapper>
            ) : (
              <Flex sx={{ justifyContent: 'center' }}>
                <Spinner size={200} />
              </Flex>
            )}
            <History />
          </PageWrapper>
        </ListViewLayout>
      </Flex>
    </SwiperProvider>
  )
}

export default Auction
