import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import useRefresh from './useRefresh'

/*
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */
export const baseUrl = 'https://api.pancakeswap.com/api/v1'

export const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://ape-swap-api.herokuapp.com'

export const baseUrlStrapi = 'https://apeswap-strapi.herokuapp.com'
const EXCHANGE_SUBGRAPH_URL = 'https://graph.apeswap.finance/subgraphs/name/ape-swap/apeswap-subgraph'
const EXCHANGE_POLYGON_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/apeswapfinance/dex-polygon'

/* eslint-disable camelcase */

export interface TradePair {
  swap_pair_contract: string
  base_symbol: string
  quote_symbol: string
  last_price: number
  base_volume_24_h: number
  quote_volume_24_h: number
}

export interface ApiStatResponse {
  update_at: string
  '24h_total_volume': number
  total_value_locked: number
  total_value_locked_all: number
  trade_pairs: {
    [key: string]: TradePair
  }
}

export interface SaleHistory {
  from: string
  to: string
  tokenId: number
  value: string
  transactionHash: string
  blockNumber: number
}

export interface AuctionHistory {
  bidder: string
  amount: number
  tokenId: number
  transactionHash: string
  blockNumber: number
}

export const useGetNfaSales = (id: number) => {
  const [sale, setSale] = useState<SaleHistory[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/nfas/history/${id}`)
        const responsedata: SaleHistory[] = await response.json()

        setSale(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [setSale, id])
  return sale
}

export const useGetNfaAuctionHistory = () => {
  const [history, setHistory] = useState<AuctionHistory[] | null>(null)
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/nfas/latestBids`)
        const responsedata: AuctionHistory[] = await response.json()
        setHistory(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [setHistory, fastRefresh])
  return history
}

export const useGetStats = () => {
  const [data, setData] = useState<ApiStatResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/stat`)
        const responsedata: ApiStatResponse = await response.json()

        setData(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

const RESERVES_QUERY = (address) => {
  return `
  {
    pair(id: "${address.toLowerCase()}") {
      id
      token0 {
        id
        symbol
        derivedETH
      }
      token1 {
        id
        symbol
        derivedETH
      }
      token0Price
      token1Price
      reserve0
      reserve1
      totalSupply
      reserveETH
    }
  }`
}

const LIQUIDITY_QUERY = `{
      uniswapFactories(first: 1) {
        id
        totalVolumeUSD
        totalLiquidityUSD
        totalLiquidityETH
      }
    }`

// eslint-disable-next-line consistent-return
export const fetchReserveData = async (pairAddress) => {
  try {
    const query = RESERVES_QUERY(pairAddress)
    const response = await fetch(EXCHANGE_SUBGRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })
    const responsedata: any = await response.json()

    return responsedata?.data?.pair
  } catch (error) {
    console.error('Unable to fetch data:', error)
  }
}

// eslint-disable-next-line consistent-return
export const fetchLiquidityData = async () => {
  try {
    const query = LIQUIDITY_QUERY
    const responses = await Promise.all([
      fetch(EXCHANGE_SUBGRAPH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }),
      fetch(EXCHANGE_POLYGON_SUBGRAPH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }),
    ])
    const { data: bscData }: any = await responses[0].json()
    const { data: polyData }: any = await responses[1].json()

    const totalLiquidity =
      parseFloat(bscData.uniswapFactories[0].totalLiquidityUSD) +
      parseFloat(polyData.uniswapFactories[0].totalLiquidityUSD)
    return totalLiquidity
  } catch (error) {
    console.error('Unable to fetch data:', error)
  }
}

export const useLiquidityData = () => {
  const [data, setData] = useState<any | number>(null)
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLiquidityData()
        setData(response)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData, slowRefresh])

  return data
}

const PAIR_CONFIGS = {
  'BANANA/BUSD': {
    address: '0x7bd46f6da97312ac2dbd1749f82e202764c0b914',
    token: 'BANANA',
    base: 'BUSD',
  },
  'BANANA/BNB': {
    address: '0xF65C1C0478eFDe3c19b49EcBE7ACc57BB6B1D713',
    token: 'BANANA',
    base: 'WBNB',
  },
}

export const useChartData = (resolution = '60', pair = 'BANANA/BUSD') => {
  const [data, setData] = useState<any | null>(null)
  const currentPair = PAIR_CONFIGS[pair]
  const to = Math.floor(Date.now() / 1000)

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* const response = await fetch(
          `${priceBaseUrl}&address=${currentPair.address}&token=${currentPair.token}&base=${currentPair.base}&from=0&to=${to}&resolution=${resolution}`,
        )
        const responsedata = await response.json()
        const chartData = []
        for (let i = 0; i < responsedata.c.length; i++) {
          const candle = {
            x: new Date(responsedata.t[i] * 1000),
            y: [responsedata.o[i], responsedata.h[i], responsedata.l[i], responsedata.c[i]],
          }
          chartData.push(candle)
        }
        const volume = {
          data: responsedata.v,
          start: responsedata.t[0] * 1000,
          end: responsedata.t[responsedata.t.length - 1] * 1000,
        } */
        setData(null)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData, resolution, currentPair, to])

  return data
}

export const getPromosHome = async () => {
  const url = `${baseUrlStrapi}/homepages?_sort=order:ASC`
  const resp = await fetch(url)
  const data = await resp.json()

  const promos = data.map((promo) => {
    return {
      header: promo.title,
      text: promo.source,
      text2: promo.source2,
      link: promo.link_description,
      pageLink: promo.link,
      image: promo.image,
    }
  })

  return promos
}

let poolPromise

export const fetchPools = async () => {
  const url = `https://raw.githubusercontent.com/ApeSwapFinance/-apeswap-yields/main/config/pools.json?time=${Date.now()}`
  const resp = await fetch(url)
  const data = await resp.json()
  const poolsList = data.map((pool) => ({
    sousId: Number(pool.sousId),
    tokenName: pool.tokenName,
    image: pool.image,
    stakingToken: pool.stakingToken,
    rewardToken: pool.rewardToken,
    contractAddress: pool.contractAddress,
    poolCategory: 'CORE',
    projectLink: pool.projectLink,
    harvest: pool.harvest,
    sortOrder: pool.sortOrder,
    reflect: pool.reflect,
    isFinished: pool.isFinished,
    tokenDecimals: pool.tokenDecimals,
    tokenPerBlock: new BigNumber(Number(pool.rewardPerBlock))
      .dividedBy(new BigNumber(10).pow(new BigNumber(Number(pool.tokenDecimals))))
      .toString(),
  }))
  return poolsList
}

export const getPools = async () => {
  if (!poolPromise) poolPromise = fetchPools()

  return poolPromise
}
