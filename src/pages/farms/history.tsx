import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Farms from 'views/Farms'
import DualFarms from 'views/DualFarms'
import { setFarmsPublicData } from 'state/farms'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchFarms from 'state/farms/fetchFarms'
import fetchDualFarms from 'state/dualFarms/fetchDualFarms'
import { CHAIN_ID } from 'config/constants/chains'
import { wrapper } from '../../state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const { req } = context
  const chainId = initialProps?.props?.chainId

  let farmData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      farmData = await fetchDualFarms(tokenPrices, chainId)
    } else {
      farmData = await fetchFarms(chainId)
    }
  } catch (e) {
    console.warn(e)
  }
  store.dispatch(setFarmsPublicData(JSON.parse(JSON.stringify(farmData))))

  return initialProps
})

const FarmsPage: React.FC<{ chainId?: number }> = ({ chainId }) => {
  return chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET ? <DualFarms showHistory /> : <Farms />
}

export default FarmsPage
