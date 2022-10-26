import { Pair } from '@ape.swap/sdk'
import { useMemo, useState } from 'react'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { useTokenBalances } from 'state/wallet/hooks'
import useActiveWeb3React from './useActiveWeb3React'
import { usePairs } from './usePairs'

const useLpBalances = () => {
  const { account } = useActiveWeb3React()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )

  const allPairs = usePairs(tokenPairsWithLiquidityTokens.map(({ tokens }) => tokens))

  const v2PairsBalances = useTokenBalances(account ?? undefined, liquidityTokens)

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))
  // Adding a random ID for migrate all.
  const pairAndBalances = allV2PairsWithLiquidity.map((pair) => {
    return { id: parseInt(pair.liquidityToken.address), pair, balance: v2PairsBalances[pair.liquidityToken.address] }
  })

  return { allPairs, pairAndBalances }
}

export default useLpBalances
