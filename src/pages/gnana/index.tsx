import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import ApeZone from 'views/ApeZone'
import { wrapper } from 'state'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import { setPoolsPublicData } from 'state/pools'
import fetchPools from 'state/pools/fetchPools'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  const chainId = initialProps?.props?.chainId

  let poolData = [{}]
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolData = await fetchPools(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }
  store.dispatch(setPoolsPublicData(JSON.parse(JSON.stringify(poolData))))

  return initialProps
})

const ApeZonePage: React.FC = () => {
  return <ApeZone />
}

export default ApeZonePage
