import { getSwapBanners } from 'hooks/api'
import React, { createContext, useEffect, useState } from 'react'

interface SwapContextProps {
  swap: {
    swapBannersData: any[]
    loading?: boolean
  }
}

interface SwapContextProviderProps {
  swapBanner?: any[]
}

export const SwapContext: React.Context<SwapContextProps> = createContext({
  swap: {
    swapBannersData: [],
  },
})

export const SwapContextProvider: React.FC<SwapContextProviderProps> = ({ swapBanner, children }) => {
  const [swapState, setSwapState] = useState({
    swapBannersData: swapBanner || [],
    loading: !swapBanner,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const swapBanners = await getSwapBanners()

        setSwapState({
          swapBannersData: swapBanners,
          loading: false,
        })
      } catch (error) {
        console.warn('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <SwapContext.Provider
      value={{
        swap: swapState,
      }}
    >
      {children}
    </SwapContext.Provider>
  )
}
