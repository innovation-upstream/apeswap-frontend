import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Nft from '../../views/Nft'

export const getServerSideProps: GetServerSideProps = getServerSideGenericProps

const NftPage: React.FC = () => {
  return <Nft />
}

export default NftPage
