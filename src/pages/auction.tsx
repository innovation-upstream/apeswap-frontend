import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Auction from 'views/Auction'
import { wrapper } from 'state'
import { auctionsFetchSucceeded } from 'state/auction'
import fetchNfas from 'state/nfas/fetchNfas'
import { Auction as AuctionType } from 'state/types'
import { getAuctionAddress } from 'utils/addressHelper'
import { fetchAuctionDetails } from 'state/auction/fetchAllAuctions'
import BigNumber from 'bignumber.js'
import multicall from 'utils/multicall'
import auctionAbi from 'config/abi/auction.json'
import { ZERO_ADDRESS } from 'config'
import { apiBaseUrl, AuctionHistory } from 'hooks/api'
import { AuctionContextProvider } from 'contexts/SSRContext'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  const { req } = context
  const chainId = initialProps?.props?.chainId
  let auctionData
  let nfas
  let response

  try {
    nfas = await fetchNfas()

    const auctionContractAddress = getAuctionAddress(chainId)
    const [activeAuctionId, minIncrementAmount, minIncrementPercentage, auctionFeePercent, pushedAuctions] =
      await fetchAuctionDetails(auctionContractAddress, chainId)
    const getAuctionCalls = [...Array(new BigNumber(pushedAuctions).toNumber())].map((e, i) => {
      return {
        address: auctionContractAddress,
        name: 'getAuctionWithPosition',
        params: [i + 1],
      }
    })
    const allAuctions = await multicall(chainId, auctionAbi, getAuctionCalls)

    auctionData = {
      activeAuctionId: new BigNumber(activeAuctionId).toNumber(),
      auctionFeePercent: new BigNumber(auctionFeePercent).toNumber(),
      minIncrementAmount: new BigNumber(minIncrementAmount).toNumber(),
      minIncrementPercentage: new BigNumber(minIncrementPercentage).toNumber(),
      pushedAuctions: new BigNumber(pushedAuctions).toNumber(),
      auctionsRemovedCount: allAuctions.filter((auction) => auction.auction.seller === ZERO_ADDRESS).length,
      auctions: allAuctions
        .map((auction, i): AuctionType => {
          return {
            auctionId: i + 1,
            nfa: nfas.find((nft) => nft.index === auction.node.data.toNumber()),
            seller: auction.auction.seller,
            highestBidder: auction.auction.highestBidder,
            highestBid: auction.auction.highestBid.toString(),
            timeExtension: auction.auction.timeExtension.toNumber(),
            timeLength: auction.auction.timeLength.toNumber(),
            minToExtend: auction.auction.minToExtend.toNumber(),
            startTime: auction.auction.startTime.toNumber(),
            endTime: auction.auction.endTime.toNumber(),
          }
        })
        .filter(({ seller }) => seller !== ZERO_ADDRESS),
    }

    response = await fetch(`${apiBaseUrl}/nfas/latestBids`)
  } catch (e) {
    console.warn(e)
  }
  await store.dispatch(auctionsFetchSucceeded(auctionData))
  const historyData: AuctionHistory[] = await response.json()

  const isDesktopView = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    req.headers['user-agent'] as string,
  )

  return {
    props: {
      ...initialProps?.props,
      isDesktopView,
      historyData,
    },
  }
})

const AuctionPage: React.FC<{ isDesktopView: any; historyData: any }> = ({ isDesktopView, historyData }) => {
  return (
    <AuctionContextProvider history={historyData}>
      <Auction view={isDesktopView} />
    </AuctionContextProvider>
  )
}

export default AuctionPage
