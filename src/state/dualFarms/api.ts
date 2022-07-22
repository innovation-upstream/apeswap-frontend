import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchDualFarmConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/dualFarms.json`)
    const dualFarmConfigResp = await response.data
    if (dualFarmConfigResp.statusCode === 500) {
      return null
    }
    return dualFarmConfigResp
  } catch (error) {
    return null
  }
}

export default fetchDualFarmConfig
