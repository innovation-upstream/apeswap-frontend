import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Auction from 'views/Auction'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => getServerSideGenericProps({ ...context, store }),
)

const AuctionPage: React.FC = () => {
  return <Auction />
}

export default AuctionPage
