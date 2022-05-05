import { apiBaseUrl } from 'hooks/api'
import { IazoSocialInfo, IazoFeeInfo, IazoTimeInfo, IazoStatus, Iazo, IazoTokenInfo } from 'state/types'

const getIazosFromApi = async (chainId: number) => {
  const apiUrl = chainId === 97 ? 'https://apeswap-api-development.herokuapp.com' : apiBaseUrl
  try {
    const response = await fetch(`${apiUrl}/iazo`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    console.error(error)
    return null
  }
}

const getIazoFromApi = async (chainId: number, address: string) => {
  const apiUrl = chainId === 97 ? 'https://apeswap-api-development.herokuapp.com' : apiBaseUrl
  try {
    const response = await fetch(`${apiUrl}/iazo/${address}`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    console.error(error)
    return null
  }
}

const formatIazoData = (iazo): Iazo => {
  const iazoSocialInfo: IazoSocialInfo = {
    twitter: iazo.twitter,
    telegram: iazo.telegram,
    medium: iazo.medium,
    whitepaper: iazo.whitepaper,
    website: iazo.website,
    description: iazo.description,
    tokenImage: iazo.pathImage,
  }

  const timeInfo: IazoTimeInfo = {
    startTime: iazo.startDate,
    activeTime: iazo.duration,
    lockPeriod: iazo.lockTime,
  }

  const feeInfo: IazoFeeInfo = {
    feeAddress: null as any,
    baseFee: null as any,
    iazoTokenFee: null as any,
  }

  const status: IazoStatus = {
    lpGenerationComplete: false,
    forceFailed: false,
    totalBaseCollected: null as any,
    totalTokensSold: null as any,
    totalTokensWithdraw: null as any,
    totalBaseWithdraw: null as any,
    numBuyers: null as any,
  }

  const baseToken: IazoTokenInfo = {
    address: iazo.token2,
    name: null as any,
    symbol: null as any,
    decimals: null as any,
  }

  const iazoToken: IazoTokenInfo = {
    address: iazo.token1,
    name: null as any,
    symbol: null as any,
    decimals: null as any,
    totalSupply: null as any,
  }

  return {
    iazoContractAddress: iazo.iazoAddress,
    iazoOwnerAddress: iazo.owner,
    tokenPrice: iazo.pricePresale,
    amount: iazo.totalPresale,
    hardcap: iazo.hardcap,
    softcap: iazo.softcap,
    maxSpendPerBuyer: iazo.limitDefault,
    liquidityPercent: iazo.percentageLock,
    listingPrice: iazo.priceListing,
    burnRemain: iazo.burnRemaining,
    iazoTags: iazo.tags,
    iazoState: null as any,
    feeInfo,
    timeInfo,
    status,
    baseToken,
    iazoToken,
    socialInfo: iazoSocialInfo,
  }
}
const fetchIazosFromApi = async (chainId: number): Promise<Iazo[]> => {
  const iazos = await getIazosFromApi(chainId)

  const formattedIazos = iazos.map((iazo) => {
    return formatIazoData(iazo)
  })
  return formattedIazos
}

export const fetchIazoFromApi = async (chainId: number, address: string): Promise<Iazo[]> => {
  const iazos = await getIazoFromApi(chainId, address)
  const formattedIazos = iazos.map((iazo) => {
    return formatIazoData(iazo)
  })
  return formattedIazos
}

export default fetchIazosFromApi
