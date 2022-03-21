import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Nfa from 'views/Nft/Nfa'
import { wrapper } from 'state'
import { nfasFetchStart, nfasFetchSucceeded } from 'state/nfas'
import fetchNfas from 'state/nfas/fetchNfas'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, ...store })
  const { params } = context

  let nfas = []
  try {
    store.dispatch(nfasFetchStart())
    nfas = await fetchNfas()
    store.dispatch(nfasFetchSucceeded(nfas))
  } catch (error) {
    console.error(error)
  }

  const isNumber = /^-?\d+$/.test(params.nft as string)
  if (!params.nft || !isNumber || !nfas.some((n) => n.index === parseInt(params.nft as string))) {
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
})

const NftItemPage: React.FC<{ nft: number }> = ({ nft }) => {
  return <Nfa nft={nft} />
}

export default NftItemPage
