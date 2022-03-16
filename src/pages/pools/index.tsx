import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import fetchPools from 'state/pools/fetchPools'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import Pools from '../../views/Pools'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  let poolData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolData = await fetchPools(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      ...initialProps?.props,
      poolData: JSON.parse(JSON.stringify(poolData)),
    },
  }
}

const PoolsPage: React.FC<{ poolData: any[] }> = ({ poolData }) => {
  return <Pools poolData={poolData} />
}

export default PoolsPage
