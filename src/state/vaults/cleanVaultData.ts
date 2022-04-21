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
  tokenPrices: TokenPrices[],
  farmLpAprs: FarmLpAprsType,
  chainId: number,
) => {
  const data = chunkedVaults.map((chunk, index) => {
    const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
    const vaultConfig = filteredVaults?.find((vault) => vault.id === vaultIds[index])
    console.log(vaultConfig)
    const [
      totalAllocPoint,
      poolInfo,
      userInfo,
      rewardsPerBlock,
      stakeTokenMCBalance,
      stakeTokenTotalSupply,
      stakeTokenStrategyBalance,
    ] = chunk

    const allocPoint = new BigNumber(poolInfo.allocPoint?._hex)
    const strategyPairBalance = userInfo.amount.toString()
    const weight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)

    const rewardTokenPriceUsd = tokenPrices?.find(
      (token) =>
        token.address[chainId]?.toLowerCase() === vaultConfig.masterchef.rewardToken.address[chainId]?.toLowerCase(),
    )?.price
    const stakeTokenPriceUsd = tokenPrices?.find(
      (token) => token.address[chainId]?.toLowerCase() === vaultConfig.stakeToken.address[chainId]?.toLowerCase(),
    )?.price

    const totalTokensStaked = getBalanceNumber(new BigNumber(strategyPairBalance))
    const totalTokensStakedMC = getBalanceNumber(new BigNumber(stakeTokenMCBalance))
    const totalValueStakedInMCUsd = totalTokensStakedMC * stakeTokenPriceUsd

    // const quoteTokenAmountTotal = isPair
    //   ? new BigNumber(quoteTokenPairBalance).div(new BigNumber(10).pow(quoteTokenDecimals))
    //   : new BigNumber(strategyPairBalance.toString()).div(new BigNumber(10).pow(quoteTokenDecimals))
    // const pairTokenRatio = parseFloat(strategyPairBalance) / parseFloat(pairTotalSupply.toString())
    // const lptokenRatio = new BigNumber(pairBalanceMc).div(new BigNumber(pairTotalSupply))
    // const quoteTokenAmountMc = quoteTokenAmountTotal.times(lptokenRatio)
    // const totalInQuoteToken = isPair
    //   ? quoteTokenAmountMc.times(new BigNumber(2))
    //   : new BigNumber(getBalanceNumber(pairBalanceMc, quoteTokenDecimals))
    // const totalStaked = isPair
    //   ? totalInQuoteToken.times(quoteTokenPriceUsd).times(pairTokenRatio).toString()
    //   : quoteTokenAmountTotal.times(quoteTokenPriceUsd).toString()

    // const totalValueInLp =
    //   isPair &&
    //   new BigNumber(quoteTokenPairBalance)
    //     .div(new BigNumber(10).pow(18))
    //     .times(new BigNumber(2))
    //     .times(quoteTokenPriceUsd)
    // const stakeTokenPrice = isPair
    //   ? totalValueInLp.div(new BigNumber(getBalanceNumber(pairTotalSupply))).toNumber()
    //   : quoteTokenPriceUsd

    // Calculate APR
    const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)
    const rewardTokensPerBlock = rewardsPerBlock ? getBalanceNumber(new BigNumber(rewardsPerBlock)) : new BigNumber(0)

    const yearlyRewardTokens = BLOCKS_PER_YEAR.times(rewardTokensPerBlock).times(poolWeight)
    const oneThousandDollarsWorthOfToken = 1000 / rewardTokenPriceUsd

    // const apr = yearlyRewardTokens.times(new BigNumber(earnTokenPriceUsd)).div(stakeTokenPriceUsd).times(100)
    const apr = getFarmApr(poolWeight, new BigNumber(rewardTokenPriceUsd), new BigNumber(totalValueStakedInMCUsd))
    console.log(apr.toString())

    const amountEarnedYealry = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: apr,
      tokenPrice: rewardTokenPriceUsd,
      compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
      performanceFee: 0,
    })
    const amountEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 1,
      farmApr: apr,
      tokenPrice: rewardTokenPriceUsd,
      compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
      performanceFee: 0,
    })
    const yealryApy = getRoi({ amountEarned: amountEarnedYealry, amountInvested: oneThousandDollarsWorthOfToken })
    const dailyApy = getRoi({ amountEarned: amountEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })

    return {
      ...vaultConfig,
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
    return {}
  })
  return data
}

export default cleanVaultData
