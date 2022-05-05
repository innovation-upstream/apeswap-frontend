import { apiBaseUrl } from 'hooks/api'
import { HomepageTokenStats } from 'state/types'

const getHomepageTokenStats = async (category: string): Promise<HomepageTokenStats[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/tokens/${category}`)
    const tokenRes = await response.json()
    if (tokenRes.statusCode === 500) {
      return null as any
    }
    return tokenRes
  } catch (error) {
    return null as any
  }
}

export default getHomepageTokenStats
