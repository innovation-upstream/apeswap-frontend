import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchBillsConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/bills.json`)
    const billConfigResp = await response.data
    if (billConfigResp.statusCode === 500) {
      return null
    }
    return billConfigResp
  } catch (error) {
    return null
  }
}

export default fetchBillsConfig
