import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import fetchPools from 'state/pools/fetchPools'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import Cookies from 'universal-cookie'
import Pools from '../../views/Pools'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context
  const cookies = new Cookies(req.cookies)
  const chainIdStr = cookies.get('chainIdStatus')
  const chainId = parseInt(chainIdStr)

  let poolData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolData = await fetchPools(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      poolData: JSON.parse(JSON.stringify(poolData)),
    },
  }
}
const PoolsPage: React.FC<{ poolData: any[] }> = ({ poolData }) => {
  return <Pools poolData={poolData} />
}

export default PoolsPage
