import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, MATIC_BLOCK_TIME, SECONDS_PER_YEAR, VAULT_COMPOUNDS_PER_DAY } from 'config'
import { vaultsConfig } from 'config/constants'
import { CHAIN_ID } from 'config/constants/chains'
import { FarmLpAprsType, LpTokenPrices, TokenPrices } from 'state/types'
import { getFarmApr } from 'utils/apr'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { getBalanceNumber } from 'utils/formatBalance'

const cleanVaultData = (
  vaultIds: number[],
  chunkedVaults: any[],
  vaultSettings: any[],
  tokenPrices: TokenPrices[],
  farmLpAprs: FarmLpAprsType,
  chainId: number,
) => {
  const keeperFee = parseFloat(vaultSettings[1]) / 100
  const withdrawFee = parseFloat(vaultSettings[5]) / 100
  const data = chunkedVaults.map((chunk, index) => {
    const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
    const vaultConfig = filteredVaults?.find((vault) => vault.id === vaultIds[index])
    console.log(keeperFee)
    console.log(withdrawFee)
    const [
      totalAllocPoint,
      poolInfo,
      userInfo,
      rewardsPerBlock,
      stakeTokenMCBalance,
      stakeTokenTotalSupply,
      stakeTokenStrategyBalance,
      bananaPoolInfo,
      bananaPoolTotalStaked,
    ] = chunk
    console.log(bananaPoolInfo)
    console.log(bananaPoolTotalStaked.toString())

    const rewardTokenPriceUsd = tokenPrices?.find(
      (token) =>
        token.address[chainId]?.toLowerCase() === vaultConfig.masterchef.rewardToken.address[chainId]?.toLowerCase(),
    )?.price
    const stakeTokenPriceUsd = tokenPrices?.find(
      (token) => token.address[chainId]?.toLowerCase() === vaultConfig.stakeToken.address[chainId]?.toLowerCase(),
    )?.price

    // Strat info
    const allocPoint = new BigNumber(poolInfo.allocPoint?._hex)
    const strategyPairBalance = userInfo.amount.toString()
    const weight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)
    const totalTokensStaked = getBalanceNumber(new BigNumber(strategyPairBalance))
    const totalTokensStakedMC = getBalanceNumber(new BigNumber(stakeTokenMCBalance))
    const totalValueStakedInMCUsd = totalTokensStakedMC * stakeTokenPriceUsd

    // Banana pool info
    const bananaPoolAllocPoint = new BigNumber(bananaPoolInfo.allocPoint?._hex)
    const bananaPoolWeight = totalAllocPoint
      ? bananaPoolAllocPoint.div(new BigNumber(totalAllocPoint))
      : new BigNumber(0)
    const totalBananaStakedMC = getBalanceNumber(new BigNumber(bananaPoolTotalStaked))
    const totalBananaValueStakedInMCUsd = totalBananaStakedMC * stakeTokenPriceUsd

    // Calculate APR
    const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)
    const rewardTokensPerBlock = rewardsPerBlock ? getBalanceNumber(new BigNumber(rewardsPerBlock)) : new BigNumber(0)
    // This only works for apeswap farms
    const lpApr = farmLpAprs?.lpAprs?.find((lp) => lp.pid === vaultConfig.masterchef.pid[chainId])?.lpApr * 100
    console.log(farmLpAprs)
    console.log(lpApr)

    const yearlyRewardTokens = BLOCKS_PER_YEAR.times(rewardTokensPerBlock).times(poolWeight)
    const oneThousandDollarsWorthOfToken = 1000 / rewardTokenPriceUsd

    const apr = getFarmApr(poolWeight, new BigNumber(rewardTokenPriceUsd), new BigNumber(totalValueStakedInMCUsd))
    const bananaPoolApr = getFarmApr(
      bananaPoolWeight,
      new BigNumber(rewardTokenPriceUsd),
      new BigNumber(totalBananaValueStakedInMCUsd),
    )

    console.log(bananaPoolApr)

    const amountEarnedYealry = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: lpApr ? apr + lpApr : apr,
      tokenPrice: rewardTokenPriceUsd,
      compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
      performanceFee: keeperFee,
    })

    const amountEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 1,
      farmApr: lpApr ? apr + lpApr : apr,
      tokenPrice: rewardTokenPriceUsd,
      compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
      performanceFee: keeperFee,
    })
    const yealryApy = getRoi({ amountEarned: amountEarnedYealry, amountInvested: oneThousandDollarsWorthOfToken })
    const dailyApy = getRoi({ amountEarned: amountEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })

    return {
      ...vaultConfig,
      keeperFee: keeperFee.toString(),
      withdrawFee: withdrawFee.toString(),
      totalStaked: totalTokensStaked.toString(),
      totalAllocPoint: totalAllocPoint.toString(),
      allocPoint: allocPoint.toString(),
      weight: parseInt(weight.toString()),
      strategyPairBalance: strategyPairBalance.toString(),
      strategyPairBalanceFixed: null,
      stakeTokenPrice: stakeTokenPriceUsd,
      rewardTokenPrice: rewardTokenPriceUsd,
      masterChefPairBalance: stakeTokenMCBalance.toString(),
      apy: {
        daily: dailyApy,
        yearly: yealryApy,
      },
    }
  })
  return data
}

export default cleanVaultData
