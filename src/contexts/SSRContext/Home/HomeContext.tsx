import React, { createContext, useEffect, useState } from 'react'
import { getFarmsHome, getPoolsHome, getNewsHome, getHeadersHome } from 'hooks/api'

interface HomeContextProps {
  farms: {
    farmsData: any[]
    loading?: boolean
  }
  pools: {
    poolsData: any[]
    loading?: boolean
  }
  news: {
    newsData: any[]
    loading?: boolean
  }
  header: {
    headersData: any[]
    loading?: boolean
  }
}

interface HomeContextProviderProps {
  farms?: any[]
  pools?: any[]
  news?: any[]
  header?: any[]
}

export const HomeContext: React.Context<HomeContextProps> = createContext({
  farms: {
    farmsData: [],
  },
  pools: {
    poolsData: [],
  },
  news: {
    newsData: [],
  },
  header: {
    headersData: [],
  },
})

export const HomeContextProvider: React.FC<HomeContextProviderProps> = ({ farms, pools, news, header, children }) => {
  const [farmsState, setFarmsState] = useState({
    farmsData: farms || [],
    loading: !farms,
  })

  const [poolsState, setPoolsState] = useState({
    poolsData: pools || [],
    loading: !pools,
  })

  const [newsState, setNewsState] = useState({
    newsData: news || [],
    loading: !news,
  })

  const [headerState, setHeaderState] = useState({
    headersData: header,
    loading: !header,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farmsData = await getFarmsHome()
        const poolsData = await getPoolsHome()
        const newsData = await getNewsHome()
        const headersData = await getHeadersHome()
        setFarmsState({
          farmsData,
          loading: false,
        })
        setPoolsState({
          poolsData,
          loading: false,
        })
        setNewsState({
          newsData,
          loading: false,
        })
        setHeaderState({
          headersData,
          loading: false,
        })
      } catch (error) {
        console.warn('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <HomeContext.Provider
      value={{
        farms: farmsState,
        pools: poolsState,
        news: newsState,
        header: headerState,
      }}
    >
      {children}
    </HomeContext.Provider>
  )
}
