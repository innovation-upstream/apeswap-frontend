import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchPools from 'state/pools/fetchPools'
import Pools from 'views/Pools'
import { wrapper } from 'state'
import { setPoolsPublicData } from '../../state/pools'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { query } = context
  const initialProps = await getServerSideGenericProps({ ...context, ...store })
  const chainId = initialProps?.props?.chainId

  let poolData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolData = await fetchPools(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }
  store.dispatch(setPoolsPublicData(JSON.parse(JSON.stringify(poolData))))

  return {
    props: JSON.parse(
      JSON.stringify({
        ...initialProps?.props,
        id: query.id ? parseInt(query.id as string) : undefined,
      }),
    ),
  }
})

const PoolsPage: React.FC = ({ id }: any) => {
  return <Pools id={id} />
}

export default PoolsPage
