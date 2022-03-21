import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Nft from 'views/Nft'
import { wrapper } from 'state'
import { nfasFetchStart, nfasFetchSucceeded } from 'state/nfas'
import fetchNfas from 'state/nfas/fetchNfas'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = getServerSideGenericProps({ ...context, store })
  try {
    store.dispatch(nfasFetchStart())
    const nfas = await fetchNfas()
    store.dispatch(nfasFetchSucceeded(nfas))
  } catch (error) {
    console.error(error)
  }

  return initialProps
})

const NftPage: React.FC = () => {
  return <Nft />
}

export default NftPage
