import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import JunglePools from 'views/JunglePools'
import { CHAIN_ID } from 'config/constants/chains'
import { setPoolsPublicData } from 'state/pools'
import fetchPools from 'state/pools/fetchPools'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import { wrapper } from '../../state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  if (!chainId || chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  let poolData = [{}]
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolData = await fetchPools(chainId, tokenPrices)
  } catch (e) {
    console.error(e)
  }
  store.dispatch(setPoolsPublicData(JSON.parse(JSON.stringify(poolData))))

  return {
    props: {
      ...initialProps?.props,
    },
  }
})

const JungleFarmsPage: React.FC = () => {
  return <JunglePools />
}

export default JungleFarmsPage
