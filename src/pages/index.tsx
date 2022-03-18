import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import { setFarmsPublicData } from 'state/farms'
import { setDualFarmsPublicData } from 'state/dualFarms'
import { setPoolsPublicData } from 'state/pools'
import { setVaults } from 'state/vaults'
import { setHomepageStats } from 'state/stats'
import fetchPrices from 'state/tokenPrices/fetchPrices'
import fetchFarms from 'state/farms/fetchFarms'
import fetchDualFarms from 'state/dualFarms/fetchDualFarms'
import fetchPools from 'state/pools/fetchPools'
import fetchVaultData from 'state/vaults/fetchVaultData'
import { CHAIN_ID } from 'config/constants/chains'
import { HomeContextProvider } from 'contexts/SSRContext'
import { getFarmsHome, getPoolsHome, getNewsHome, getHeadersHome } from 'hooks/api'
import { wrapper } from 'state'
import Home from 'views/Home'
import getHomepageStats from 'state/stats/getHomepageStats'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  const chainId = initialProps?.props?.chainId

  let farmsHomeData = []
  let poolsHomeData = []
  let newsHomeData = []
  let farmData = []
  let dualFarmsData = []
  let poolData = []
  let vaultData = []
  let headerData = []
  let homepageStats = {}
  try {
    const tokenPrices = await fetchPrices(chainId)
    poolsHomeData = await getPoolsHome()
    newsHomeData = await getNewsHome()
    homepageStats = await getHomepageStats()
    headerData = await getHeadersHome()
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      dualFarmsData = await fetchDualFarms(tokenPrices, chainId)
      vaultData = await fetchVaultData(chainId, tokenPrices)
    } else {
      poolData = await fetchPools(chainId, tokenPrices)
      farmData = await fetchFarms(chainId)
      farmsHomeData = await getFarmsHome()
    }
  } catch (e) {
    console.warn(e)
  }
  store.dispatch(setVaults(vaultData))
  store.dispatch(setFarmsPublicData(JSON.parse(JSON.stringify(farmData))))
  store.dispatch(setDualFarmsPublicData(JSON.parse(JSON.stringify(dualFarmsData))))
  store.dispatch(setPoolsPublicData(JSON.parse(JSON.stringify(poolData))))
  store.dispatch(setHomepageStats(JSON.parse(JSON.stringify(homepageStats))))

  return {
    props: {
      ...initialProps,
      farmsHomeData,
      poolsHomeData,
      newsHomeData,
      headerData,
    },
  }
})

const PageContent: React.FC<any> = ({ farmsHomeData, poolsHomeData, newsHomeData, headerData }) => {
  return (
    <HomeContextProvider farms={farmsHomeData} pools={poolsHomeData} news={newsHomeData} header={headerData}>
      <Home />
    </HomeContextProvider>
  )
}

export default PageContent
