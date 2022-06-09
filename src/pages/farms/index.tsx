import React from 'react'
import { GetServerSideProps } from 'next'
import BigNumber from 'bignumber.js'
import { getServerSideGenericProps } from 'components/getServersideProps'
import Farms from 'views/Farms'
import DualFarms from 'views/DualFarms'
import { setFarmsPublicData } from 'state/farms'
import { setDualFarmsPublicData } from 'state/dualFarms'
import fetchFarmLpAprs from 'state/stats/getFarmLpAprs'
import fetchLpPrices from 'state/lpPrices/fetchLpPrices'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchFarms from 'state/farms/fetchFarms'
import fetchDualFarms from 'state/dualFarms/fetchDualFarms'
import { CHAIN_ID } from 'config/constants/chains'
import { wrapper } from 'state'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps(context)
  const { query } = context
  const chainId = initialProps?.props?.chainId

  let farmData = [{}]
  let dualFarmsData = [{}]

  try {
    const tokenPrices = await fetchPrices(chainId)
    const bananaPrice = (
      new BigNumber(tokenPrices?.find((token) => token.symbol === 'BANANA')?.price as number) || new BigNumber(0)
    ).toString()
    const [lpTokenPrices, farmLpAprs] = await Promise.all([fetchLpPrices(chainId), fetchFarmLpAprs(chainId)])
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      dualFarmsData = await fetchDualFarms(chainId, tokenPrices, new BigNumber(bananaPrice), farmLpAprs)
    } else {
      farmData = await fetchFarms(chainId, lpTokenPrices, new BigNumber(bananaPrice), farmLpAprs)
    }
  } catch (e) {
    console.warn(e)
  }

  store.dispatch(setFarmsPublicData(JSON.parse(JSON.stringify(farmData))))
  store.dispatch(setDualFarmsPublicData(JSON.parse(JSON.stringify(dualFarmsData))))

  return {
    props: JSON.parse(
      JSON.stringify({
        ...initialProps?.props,
        pid: query?.pid,
      }),
    ),
  }
})

const FarmsPage: React.FC<{ chainId?: number; view: any; pid: any }> = ({ chainId, view, pid }) => {
  return chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET ? <DualFarms pid={pid} /> : <Farms />
}

export default FarmsPage
