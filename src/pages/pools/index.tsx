import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchPools from 'state/pools/fetchPools'
import Pools from '../../views/Pools'
import { wrapper } from '../../state'
import { setPoolsPublicData } from '../../state/pools'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  let poolData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolData = await fetchPools(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }
  store.dispatch(setPoolsPublicData(JSON.parse(JSON.stringify(poolData))))

  return initialProps
})

const PoolsPage: React.FC = () => {
  return <Pools />
}

export default PoolsPage
