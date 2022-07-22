import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchTokenPriceConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/tokens.json`)
    const tokenPriceConfigResp = await response.data
    if (tokenPriceConfigResp.statusCode === 500) {
      return null
    }
    return tokenPriceConfigResp
  } catch (error) {
    return null
  }
}

export default fetchTokenPriceConfig
