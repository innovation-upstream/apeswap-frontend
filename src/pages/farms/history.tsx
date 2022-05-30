import React from 'react'
import { GetServerSideProps } from 'next'
import BigNumber from 'bignumber.js'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Farms from 'views/Farms'
import DualFarms from 'views/DualFarms'
import { setFarmsPublicData } from 'state/farms'
import fetchFarmLpAprs from 'state/stats/getFarmLpAprs'
import fetchLpPrices from 'state/lpPrices/fetchLpPrices'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchFarms from 'state/farms/fetchFarms'
import fetchDualFarms from 'state/dualFarms/fetchDualFarms'
import { CHAIN_ID } from 'config/constants/chains'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const chainId = initialProps?.props?.chainId

  let farmData = []
  try {
    const tokenPrices = await fetchPrices(chainId)
    const bananaPrice = (
      new BigNumber(tokenPrices?.find((token) => token.symbol === 'BANANA')?.price) || new BigNumber(0)
    ).toString()
    const [lpTokenPrices, farmLpAprs] = await Promise.all([fetchLpPrices(chainId), fetchFarmLpAprs(chainId)])
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      farmData = await fetchDualFarms(chainId, tokenPrices, new BigNumber(bananaPrice), farmLpAprs)
    } else {
      farmData = await fetchFarms(chainId, lpTokenPrices, new BigNumber(bananaPrice), farmLpAprs)
    }
  } catch (e) {
    console.warn(e)
  }
  store.dispatch(setFarmsPublicData(JSON.parse(JSON.stringify(farmData))))

  return initialProps
})

const FarmsPage: React.FC<{ chainId?: number; pid: any }> = ({ chainId, pid }) => {
  return chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET ? (
    <DualFarms pid={pid} showHistory />
  ) : (
    <Farms pid={pid} showHistory />
  )
}

export default FarmsPage
