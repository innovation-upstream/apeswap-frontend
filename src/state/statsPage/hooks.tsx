import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { statsApi } from './api'

import { ApiResponse, ChainOption } from './types'
import { mapChain, rawToPortfolio, PortfolioData, rawToProjected, ProjectedData } from './mappings'
import { NftInfo, rawToNfts } from './mappings/rawToNfts'

interface StatsProviderProps {
  children: ReactNode
}

interface StatsContextData {
  stats: ApiResponse
  portfolioData: PortfolioData[]
  projectedData: ProjectedData[]
  nfts: NftInfo[]
  selectedChain: ChainOption
  handleChangeSelectedChain: (option: ChainOption) => void
  loading: boolean
}

const StatsContext = createContext<StatsContextData>({} as StatsContextData)

export function StatsProvider({ children }: StatsProviderProps) {
  const { account } = useActiveWeb3React()
  const [stats, setStats] = useState<ApiResponse>()
  const [portfolioData, setPortfolioData] = useState<PortfolioData[]>([])
  const [projectedData, setProjectedData] = useState<ProjectedData[]>([])
  const [nfts, setNfts] = useState<NftInfo[]>([])
  const [selectedChain, setSelectedChain] = useState<ChainOption>('all')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)

      const chain = mapChain(selectedChain)

      statsApi.get(`/${account}${chain ? `?chain=${chain}` : ''}`).then((response) => {
        setStats(response.data)
        setPortfolioData(rawToPortfolio(response.data))
        setProjectedData(rawToProjected(response.data))
        setNfts(rawToNfts(response.data))
        setLoading(false)
      })
    }

    if (account) {
      fetchStats()
    }
  }, [account, selectedChain])

  const handleChangeSelectedChain = (option: ChainOption) => {
    setSelectedChain(option)
  }

  return (
    <StatsContext.Provider
      value={{ stats, portfolioData, selectedChain, handleChangeSelectedChain, loading, projectedData, nfts }}
    >
      {children}
    </StatsContext.Provider>
  )
}

export function useStats() {
  const context = useContext(StatsContext)

  return context
}
