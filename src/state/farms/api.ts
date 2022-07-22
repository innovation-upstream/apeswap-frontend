import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchFarmConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/farms.json`)
    const farmConfigResp = await response.data
    if (farmConfigResp.statusCode === 500) {
      return null
    }
    return farmConfigResp
  } catch (error) {
    return null
  }
}

export default fetchFarmConfig
