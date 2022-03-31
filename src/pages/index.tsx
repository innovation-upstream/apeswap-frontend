import React from 'react'
import { GetServerSideProps } from 'next'
import { getServerSideGenericProps } from 'components/getServersideProps'
import {
  setHomepageStats,
  setHomepageTokenStats,
  setHomepageNews,
  setHomepageServiceStats,
  setHomepageLaunchCalendar,
} from 'state/stats'
import { CHAIN_ID } from 'config/constants/chains'
import { wrapper } from 'state'
import Home from 'views/Homepage'
import getHomepageStats from 'state/stats/getHomepageStats'
import getHomepageTokenStats from 'state/stats/getHomepageTokenStats'
import getHomepageNews from 'state/stats/getHomepageNews'
import getHomepageServiceStats from 'state/stats/getHomepageService'
import getHomepageLaunchCalendar from 'state/stats/getHomepageLaunchCalendar'

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const initialProps = await getServerSideGenericProps({ ...context, store })
  const chainId = initialProps?.props?.chainId

  let homepageStats = {}
  let homepageTokenStats = []
  let homepageNews = []
  let homepageServiceStats = []
  let homepageLaunchCalendar = []
  try {
    homepageStats = await getHomepageStats()
    homepageNews = await getHomepageNews()
    homepageServiceStats = await getHomepageServiceStats()
    homepageLaunchCalendar = await getHomepageLaunchCalendar()
    homepageTokenStats = await getHomepageTokenStats(chainId === CHAIN_ID.MATIC ? 'polygon' : 'primary')
  } catch (e) {
    console.warn(e)
  }
  store.dispatch(setHomepageStats(JSON.parse(JSON.stringify(homepageStats))))
  store.dispatch(setHomepageNews(JSON.parse(JSON.stringify(homepageNews))))
  store.dispatch(setHomepageTokenStats(JSON.parse(JSON.stringify(homepageTokenStats))))
  store.dispatch(setHomepageServiceStats(JSON.parse(JSON.stringify(homepageServiceStats))))
  store.dispatch(setHomepageLaunchCalendar(JSON.parse(JSON.stringify(homepageLaunchCalendar))))

  return initialProps
})

const PageContent: React.FC<any> = () => {
  return <Home />
}

export default PageContent
