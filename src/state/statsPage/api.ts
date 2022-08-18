import axios from 'axios'
import axiosRetry from 'axios-retry'
import { initialStatsData } from './mappings'

const baseUrl = {
  local: 'http://localhost:3333/stats',
  prod: 'https://jellyfish-app-vtrfw.ondigitalocean.app/stats',
}

let tries = 0
let cacheStats = []

export const fetchStatsData = async (params: string) => {
  try {
    if (tries === 0) {
      axiosRetry(axios, {
        retries: 5,
        retryCondition: () => true,
      })
      tries++
      const response = await axios.get(`${baseUrl.local}/${params}`)
      const statsResponse = await response.data
      if (statsResponse.statusCode === 500) {
        return initialStatsData
      }
      cacheStats = statsResponse
      return statsResponse
    }
    return cacheStats
  } catch (error) {
    tries = 0
    return initialStatsData
  }
}
