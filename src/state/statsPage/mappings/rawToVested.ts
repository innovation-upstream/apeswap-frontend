import { ApiResponse, Bill, Chain, Iao } from '../types'

export type Vested = (Bill | Iao) & { chain: Chain }

export function rawToVested({ userStats }: ApiResponse) {
  const vestedEarnings: Vested[] = []

  userStats.forEach((chainInfo) => {
    if (chainInfo.bills?.length)
      chainInfo.bills?.forEach((bill) => vestedEarnings.push({ ...bill, chain: chainInfo.chainId }))

    if (chainInfo.iaos?.length)
      chainInfo.iaos?.forEach((iao) => vestedEarnings.push({ ...iao, chain: chainInfo.chainId }))
  })

  return vestedEarnings.sort((a, b) => (a.vestingTimeRemaining > b.vestingTimeRemaining ? -1 : 1))
}
