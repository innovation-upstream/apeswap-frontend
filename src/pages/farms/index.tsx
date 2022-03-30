import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Farms from 'views/Farms'
import DualFarms from 'views/DualFarms'
import { ViewMode } from 'views/DualFarms/components/types'
import { setFarmsPublicData } from 'state/farms'
import { setDualFarmsPublicData } from 'state/dualFarms'
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
  let dualFarmsData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      dualFarmsData = await fetchDualFarms(tokenPrices, chainId)
    } else {
      farmData = await fetchFarms(chainId)
    }
  } catch (e) {
    console.warn(e)
  }
  store.dispatch(setFarmsPublicData(JSON.parse(JSON.stringify(farmData))))
  store.dispatch(setDualFarmsPublicData(JSON.parse(JSON.stringify(dualFarmsData))))

  let view = ViewMode.TABLE
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers['user-agent'])) {
    view = ViewMode.CARD
  }

  return {
    props: {
      ...initialProps?.props,
      view,
    },
  }
})

const FarmsPage: React.FC<{ chainId?: number; view: any }> = ({ chainId, view }) => {
  return chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET ? <DualFarms view={view} /> : <Farms />
}

export default FarmsPage
