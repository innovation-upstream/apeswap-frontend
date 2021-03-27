import { apiBaseUrl } from 'hooks/api'
import { Stats } from 'state/types'

const getStats = async (address: string): Promise<Stats> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/${address}`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export function computeStats(pools, farms, statsOverall, bananasInWallet): Stats {
  const farmStats = getStatsForFarms(farms, statsOverall.farms)
  const incentivizedPoolsStats = getStatsForIncentivizedPools(pools, statsOverall.incentivizedPools)
  const poolStats = getStatsForPools([pools[0]], statsOverall.pools)
  const stats = {
    tvl: 0,
    bananaPrice: 0,
    aggregateApr: 0,
    aggregateAprPerDay: 0,
    aggregateAprPerWeek: 0,
    aggregateAprPerMonth: 0,
    dollarsEarnedPerDay: 0,
    dollarsEarnedPerWeek: 0,
    dollarsEarnedPerMonth: 0,
    dollarsEarnedPerYear: 0,
    bananasEarnedPerDay: 0,
    bananasEarnedPerWeek: 0,
    bananasEarnedPerMonth: 0,
    bananasEarnedPerYear: 0,
    bananasInWallet: bananasInWallet.toString(),
    pendingRewardUsd: 0,
    pendingRewardBanana: 0,
    pools: poolStats,
    farms: farmStats,
    incentivizedPools: incentivizedPoolsStats,
  }
  let totalApr = 0
  stats.pools.forEach((pool) => {
    stats.pendingRewardUsd += pool.pendingRewardUsd
    stats.pendingRewardBanana += pool.pendingReward
    stats.dollarsEarnedPerDay += pool.dollarsEarnedPerDay
    stats.dollarsEarnedPerWeek += pool.dollarsEarnedPerWeek
    stats.dollarsEarnedPerMonth += pool.dollarsEarnedPerMonth
    stats.dollarsEarnedPerYear += pool.dollarsEarnedPerYear
    stats.bananasEarnedPerDay += pool.tokensEarnedPerDay
    stats.bananasEarnedPerWeek += pool.tokensEarnedPerWeek
    stats.bananasEarnedPerMonth += pool.tokensEarnedPerMonth
    stats.bananasEarnedPerYear += pool.tokensEarnedPerYear
    stats.tvl += pool.stakedTvl
    totalApr += pool.stakedTvl * pool.apr
  })

  stats.farms.forEach((farm) => {
    stats.pendingRewardUsd += farm.pendingRewardUsd
    stats.pendingRewardBanana += farm.pendingReward
    stats.dollarsEarnedPerDay += farm.dollarsEarnedPerDay
    stats.dollarsEarnedPerWeek += farm.dollarsEarnedPerWeek
    stats.dollarsEarnedPerMonth += farm.dollarsEarnedPerMonth
    stats.dollarsEarnedPerYear += farm.dollarsEarnedPerYear
    stats.bananasEarnedPerDay += farm.tokensEarnedPerDay
    stats.bananasEarnedPerWeek += farm.tokensEarnedPerWeek
    stats.bananasEarnedPerMonth += farm.tokensEarnedPerMonth
    stats.bananasEarnedPerYear += farm.tokensEarnedPerYear
    stats.tvl += farm.stakedTvl
    totalApr += farm.stakedTvl * farm.apr
  })

  stats.incentivizedPools.forEach((incentivizedPool) => {
    stats.pendingRewardUsd += incentivizedPool.pendingRewardUsd
    stats.dollarsEarnedPerDay += incentivizedPool.dollarsEarnedPerDay
    stats.dollarsEarnedPerWeek += incentivizedPool.dollarsEarnedPerWeek
    stats.dollarsEarnedPerMonth += incentivizedPool.dollarsEarnedPerMonth
    stats.dollarsEarnedPerYear += incentivizedPool.dollarsEarnedPerYear
    stats.tvl += incentivizedPool.stakedTvl
    totalApr += incentivizedPool.stakedTvl * incentivizedPool.apr
  })

  stats.aggregateApr = stats.tvl ? totalApr / stats.tvl : 0
  stats.aggregateAprPerDay = stats.aggregateApr / 365
  stats.aggregateAprPerWeek = (stats.aggregateApr * 7) / 365
  stats.aggregateAprPerMonth = (stats.aggregateApr * 30) / 365
  return stats
}

// Get TVL info for Farms only given a wallet
export function getStatsForFarms(farms, farmsInfo) {
  const allFarms = []
  farms.map(async (farm) => {
    if (!farm.userData) return
    const userInfo = { ...farm.userData, amount: parseInt(farm.userData.stakedBalance, 10) }
    const pendingReward = parseInt(userInfo.earnings, 10) / 10 ** 18
    const farmInfo = farmsInfo.find((v) => v.poolIndex === farm.pid)

    if (farmInfo && (userInfo.amount !== 0 || pendingReward !== 0)) {
      const stakedTvl = (userInfo.amount * farmInfo.price) / 10 ** 18
      const dollarsEarnedPerDay = (stakedTvl * farmInfo.apr) / 365
      const tokensEarnedPerDay = dollarsEarnedPerDay / farmInfo.rewardTokenPrice
      const currFarm = {
        pid: farm.pid,
        address: farmInfo.address,
        name: farmInfo.name,
        stakedTvl,
        pendingReward,
        pendingRewardUsd: pendingReward * farmInfo.rewardTokenPrice,
        apr: farmInfo.apr,
        dollarsEarnedPerDay,
        dollarsEarnedPerWeek: dollarsEarnedPerDay * 7,
        dollarsEarnedPerMonth: dollarsEarnedPerDay * 30,
        dollarsEarnedPerYear: dollarsEarnedPerDay * 365,
        tokensEarnedPerDay,
        tokensEarnedPerWeek: tokensEarnedPerDay * 7,
        tokensEarnedPerMonth: tokensEarnedPerDay * 30,
        tokensEarnedPerYear: tokensEarnedPerDay * 365,
      }

      allFarms.push(currFarm)
    }
  })
  return allFarms
}

export function getStatsForIncentivizedPools(pools, poolsInfo) {
  const allIncentivizedPools = []
  pools.map(async (incentivizedPool) => {
    if (!incentivizedPool.userData) return
    const userInfo = { ...incentivizedPool.userData, amount: parseInt(incentivizedPool.userData.stakedBalance, 10) }
    const pendingReward = parseInt(userInfo.pendingReward, 10) / 10 ** incentivizedPool.tokenDecimals

    const poolInfo = poolsInfo.find((v) => v.id === incentivizedPool.sousId)
    if (poolInfo && (userInfo.amount !== 0 || pendingReward !== 0)) {
      const stakedTvl = (userInfo.amount * poolInfo.price) / 10 ** poolInfo.stakedTokenDecimals
      const dollarsEarnedPerDay = (stakedTvl * poolInfo.apr) / 365
      const tokensEarnedPerDay = dollarsEarnedPerDay / poolInfo.rewardTokenPrice
      const currPool = {
        id: poolInfo.id,
        address: poolInfo.address,
        name: poolInfo.name,
        rewardTokenSymbol: poolInfo.rewardTokenSymbol,
        stakedTvl,
        pendingReward,
        pendingRewardUsd: pendingReward * poolInfo.rewardTokenPrice,
        apr: poolInfo.apr,
        dollarsEarnedPerDay,
        dollarsEarnedPerWeek: dollarsEarnedPerDay * 7,
        dollarsEarnedPerMonth: dollarsEarnedPerDay * 30,
        dollarsEarnedPerYear: dollarsEarnedPerDay * 365,
        tokensEarnedPerDay,
        tokensEarnedPerWeek: tokensEarnedPerDay * 7,
        tokensEarnedPerMonth: tokensEarnedPerDay * 30,
        tokensEarnedPerYear: tokensEarnedPerDay * 365,
      }

      allIncentivizedPools.push(currPool)
    }
  })
  return allIncentivizedPools
}

// Get TVL info for Pools only given a wallet
export function getStatsForPools(pools, poolsInfo) {
  const allPools = []
  pools.map(async (pool) => {
    if (!pool.userData) return
    const userInfo = { ...pool.userData, amount: parseInt(pool.userData.stakedBalance, 10) }
    const pendingReward = parseInt(userInfo.pendingReward, 10) / 10 ** pool.tokenDecimals

    const poolInfo = poolsInfo.find((v) => v.poolIndex === pool.sousId)

    if (poolInfo && (userInfo.amount !== 0 || pendingReward !== 0)) {
      const stakedTvl = (userInfo.amount * poolInfo.price) / 10 ** pool.tokenDecimals
      const dollarsEarnedPerDay = (stakedTvl * poolInfo.apr) / 365
      const tokensEarnedPerDay = dollarsEarnedPerDay / poolInfo.rewardTokenPrice
      const currPool = {
        address: poolInfo.address,
        name: poolInfo.lpSymbol,
        rewardTokenSymbol: poolInfo.rewardTokenSymbol,
        stakedTvl,
        pendingReward,
        pendingRewardUsd: pendingReward * poolInfo.rewardTokenPrice,
        apr: poolInfo.apr,
        dollarsEarnedPerDay,
        dollarsEarnedPerWeek: dollarsEarnedPerDay * 7,
        dollarsEarnedPerMonth: dollarsEarnedPerDay * 30,
        dollarsEarnedPerYear: dollarsEarnedPerDay * 365,
        tokensEarnedPerDay,
        tokensEarnedPerWeek: tokensEarnedPerDay * 7,
        tokensEarnedPerMonth: tokensEarnedPerDay * 30,
        tokensEarnedPerYear: tokensEarnedPerDay * 365,
      }

      allPools.push(currPool)
    }
  })
  return allPools
}

export default getStats