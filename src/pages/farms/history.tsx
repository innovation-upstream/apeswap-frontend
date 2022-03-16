import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Farms from 'views/Farms'
import { ViewMode } from 'views/Farms/components/types'
import DualFarms from 'views/DualFarms'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchFarms from 'state/farms/fetchFarms'
import fetchDualFarms from 'state/dualFarms/fetchDualFarms'
import { CHAIN_ID } from 'config/constants/chains'

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
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

  let view = ViewMode.TABLE
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(req.headers.userAgent as string)) {
    view = ViewMode.CARD
  }

  return {
    props: {
      ...initialProps?.props,
      view,
      farmData: JSON.parse(JSON.stringify(farmData)),
    },
  }
}

const FarmsPage: React.FC<{ chainId?: number; farmData?: any[]; view: any }> = ({ chainId, farmData, view }) => {
  return chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET ? (
    <DualFarms showHistory farmData={farmData} view={view} />
  ) : (
    <Farms showHistory farmData={farmData} view={view} />
  )
}

export default FarmsPage
