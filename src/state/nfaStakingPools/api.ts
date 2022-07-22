import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchNfaStakingConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/nfaStakingPools.json`)
    const nfaStakingPoolsConfigResp = await response.data
    if (nfaStakingPoolsConfigResp.statusCode === 500) {
      return null
    }
    return nfaStakingPoolsConfigResp
  } catch (error) {
    return null
  }
}

export default fetchNfaStakingConfig
