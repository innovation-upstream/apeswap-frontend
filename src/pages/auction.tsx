import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Auction from '../views/Auction'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const AuctionPage: React.FC = () => {
  return <Auction />
}

export default AuctionPage
