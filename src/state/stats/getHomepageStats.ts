import { apiV2BaseUrl } from 'hooks/api'
import { HomepageData } from 'state/types'

const getHomepageStats = async (): Promise<HomepageData> => {
  try {
    const response = await fetch(`${apiV2BaseUrl}/stats/overall`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export default getHomepageStats
