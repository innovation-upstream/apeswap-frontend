import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchJungleFarmConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/jungleFarms.json`)
    const jungleFarmConfigResp = await response.data
    if (jungleFarmConfigResp.statusCode === 500) {
      return null
    }
    return jungleFarmConfigResp
  } catch (error) {
    return null
  }
}

export default fetchJungleFarmConfig
