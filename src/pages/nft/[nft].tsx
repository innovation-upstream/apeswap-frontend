import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Nfa from '../../views/Nft/Nfa'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const initialProps = await getServerSideGenericProps(context)
  const { params } = context

  if (!params.nft) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  return {
    props: {
      ...initialProps?.props,
      nft: parseInt(params.nft as string),
    },
  }
}

const NftItemPage: React.FC<{ nft: number }> = ({ nft }) => {
  return <Nfa nft={nft} />
}

export default NftItemPage
