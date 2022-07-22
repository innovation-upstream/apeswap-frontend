import { apeswapListUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const fetchVaultConfig = async () => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apeswapListUrl}/vaults.json`)
    const vaultConfigResp = await response.data
    if (vaultConfigResp.statusCode === 500) {
      return null
    }
    return vaultConfigResp
  } catch (error) {
    return null
  }
}

export default fetchVaultConfig
