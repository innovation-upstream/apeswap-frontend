import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchTreasuryBreakdown = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`https://apeswap-api-development.herokuapp.com/dashboard/treasury`)
    const tokenPriceConfigResp = await response.data
    if (tokenPriceConfigResp.statusCode === 500) {
      return null
    }
    return tokenPriceConfigResp
  } catch (error) {
    return null
  }
}

export default fetchTreasuryBreakdown
