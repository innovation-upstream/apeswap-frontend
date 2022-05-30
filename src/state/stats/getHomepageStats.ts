import { apiBaseUrl } from 'hooks/api'
import { HomepageData } from 'state/types'

const getHomepageStats = async (): Promise<HomepageData> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/tvl`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null as any
    }
    return statRes
  } catch (error) {
    return null as any
  }
}

export default getHomepageStats
