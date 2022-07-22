import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchPoolConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/pools.json`)
    const poolConfigResp = await response.data
    if (poolConfigResp.statusCode === 500) {
      return null
    }
    return poolConfigResp
  } catch (error) {
    return null
  }
}

export default fetchPoolConfig
