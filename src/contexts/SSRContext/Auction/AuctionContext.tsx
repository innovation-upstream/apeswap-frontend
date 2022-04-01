import React, { createContext, useEffect, useState } from 'react'
import { apiBaseUrl, AuctionHistory } from 'hooks/api'

interface AuctionContextProps {
  history: {
    historyData: any[]
    loading?: boolean
  }
}

interface AuctionContextProviderProps {
  history?: any[]
}

export const AuctionContext: React.Context<AuctionContextProps> = createContext({
  history: {
    historyData: [],
  },
})

export const AuctionContextProvider: React.FC<AuctionContextProviderProps> = ({ history, children }) => {
  const [historyState, setHistoryState] = useState({
    historyData: history || [],
    loading: !history,
  })
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/nfas/latestBids`)
        const historyData: AuctionHistory[] = await response.json()

        setHistoryState({
          historyData,
          loading: false,
        })
      } catch (error) {
        console.warn('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <AuctionContext.Provider
      value={{
        history: historyState,
      }}
    >
      {children}
    </AuctionContext.Provider>
  )
}
