/* eslint-disable no-param-reassign */
import { isTradeBetter } from 'utils/trades'
import { Currency, CurrencyAmount, Token, Trade, Pair, SmartRouter, Fraction, Percent } from '@apeswapfinance/sdk'
import flatMap from 'lodash/flatMap'
import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { APE_PRICE_IMPACT, PRIORITY_SMART_ROUTERS } from 'config/constants/chains'

import { useUserSingleHopOnly } from 'state/user/hooks'
import {
  BASES_TO_CHECK_TRADES_AGAINST,
  CUSTOM_BASES,
  BETTER_TRADE_LESS_HOPS_THRESHOLD,
  ADDITIONAL_BASES,
} from '../config/constants'
import { PairState, useAllSmartPairs, usePairs } from './usePairs'
import { wrappedCurrency } from '../utils/wrappedCurrency'

import { useUnsupportedTokens } from './Tokens'

function useAllCommonPairs(currencyA?: Currency, currencyB?: Currency) {
  const { chainId } = useActiveWeb3React()

  const [tokenA, tokenB] = chainId
    ? [wrappedCurrency(currencyA, chainId), wrappedCurrency(currencyB, chainId)]
    : [undefined, undefined]

  const bases: Token[] = useMemo(() => {
    if (!chainId) return []

    const common = BASES_TO_CHECK_TRADES_AGAINST[chainId] ?? []
    const additionalA = tokenA ? ADDITIONAL_BASES[chainId]?.[tokenA.address] ?? [] : []
    const additionalB = tokenB ? ADDITIONAL_BASES[chainId]?.[tokenB.address] ?? [] : []

    return [...common, ...additionalA, ...additionalB]
  }, [chainId, tokenA, tokenB])

  const basePairs: [Token, Token][] = useMemo(
    () => flatMap(bases, (base): [Token, Token][] => bases.map((otherBase) => [base, otherBase])),
    [bases],
  )

  const allPairCombinations: [Token, Token][] = useMemo(
    () =>
      tokenA && tokenB
        ? [
            // the direct pair
            [tokenA, tokenB],
            // token A against all bases
            ...bases.map((base): [Token, Token] => [tokenA, base]),
            // token B against all bases
            ...bases.map((base): [Token, Token] => [tokenB, base]),
            // each base against all bases
            ...basePairs,
          ]
            .filter((tokens): tokens is [Token, Token] => Boolean(tokens[0] && tokens[1]))
            .filter(([t0, t1]) => t0.address !== t1.address)
            .filter(([tokenA_, tokenB_]) => {
              if (!chainId) return true
              const customBases = CUSTOM_BASES[chainId]

              const customBasesA: Token[] | undefined = customBases?.[tokenA_.address]
              const customBasesB: Token[] | undefined = customBases?.[tokenB_.address]

              if (!customBasesA && !customBasesB) return true

              if (customBasesA && !customBasesA.find((base) => tokenB_.equals(base))) return false
              if (customBasesB && !customBasesB.find((base) => tokenA_.equals(base))) return false

              return true
            })
        : [],
    [tokenA, tokenB, bases, basePairs, chainId],
  )

  const allPairs = useAllSmartPairs(allPairCombinations)
  console.log(allPairs)

  // only pass along valid pairs, non-duplicated pairs
  return useMemo(
    () =>
      allPairs.map((currPair) => {
        return Object.values(
          currPair
            // filter out invalid pairs
            .filter((result): result is [PairState.EXISTS, Pair] =>
              Boolean(result[0] === PairState.EXISTS && result[1]),
            )
            // filter out duplicated pairs
            .reduce<{ [pairAddress: string]: Pair }>((memo, [, curr]) => {
              memo[curr.liquidityToken.address] = memo[curr.liquidityToken.address] ?? curr
              return memo
            }, {}),
        )
      }),
    [allPairs],
  )
}

const MAX_HOPS = 3

/**
 * Returns the best trade for the exact amount of tokens in to the given token out
 */
export function useTradeExactIn(currencyAmountIn?: CurrencyAmount, currencyOut?: Currency): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyAmountIn?.currency, currencyOut)
  const { chainId } = useActiveWeb3React()
  const [singleHopOnly] = useUserSingleHopOnly()

  const bestTrades = useMemo(() => {
    // search through trades with varying hops, find best trade out of them
    let bestTradeSoFar: Trade | null = null
    // Save the best ApeRouter trade if it exists
    let bestApeTradeSoFar: Trade | null = null
    for (let index = 0; index < allowedPairs.length; index++) {
      if (currencyAmountIn && currencyOut && allowedPairs[index].length > 0) {
        if (singleHopOnly) {
          bestTradeSoFar =
            Trade.bestTradeExactIn(allowedPairs[index], currencyAmountIn, currencyOut, {
              maxHops: 1,
              maxNumResults: 1,
            })[0] ?? null
        }
        for (let i = 1; i <= MAX_HOPS; i++) {
          const currentTrade: Trade | null =
            Trade.bestTradeExactIn(allowedPairs[index], currencyAmountIn, currencyOut, {
              maxHops: i,
              maxNumResults: 1,
            })[0] ?? null
          if (PRIORITY_SMART_ROUTERS[chainId][0] === SmartRouter.APE) {
            if (currentTrade?.route?.pairs?.[0]?.router === SmartRouter.APE) {
              if (isTradeBetter(bestApeTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                bestApeTradeSoFar = currentTrade
              }
            }
          }
          if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
            // if current trade is best yet, save it
            bestTradeSoFar = currentTrade
          }
        }
      }
    }

    if (bestApeTradeSoFar) {
      if (parseFloat(bestApeTradeSoFar.priceImpact.toSignificant(6)) < APE_PRICE_IMPACT) {
        return bestApeTradeSoFar
      }
    }
    return bestTradeSoFar
  }, [allowedPairs, currencyAmountIn, currencyOut, singleHopOnly, chainId])

  return bestTrades
}

/**
 * Returns the best trade for the token in to the exact amount of token out
 */
export function useTradeExactOut(currencyIn?: Currency, currencyAmountOut?: CurrencyAmount): Trade | null {
  const allowedPairs = useAllCommonPairs(currencyIn, currencyAmountOut?.currency)
  const { chainId } = useActiveWeb3React()

  const [singleHopOnly] = useUserSingleHopOnly()

  return useMemo(() => {
    // search through trades with varying hops, find best trade out of them
    let bestTradeSoFar: Trade | null = null
    // Save the best ApeRouter trade if it exists
    let bestApeTradeSoFar: Trade | null = null
    for (let index = 0; index < allowedPairs.length; index++) {
      if (currencyAmountOut && currencyIn && allowedPairs[index].length > 0) {
        if (singleHopOnly) {
          bestTradeSoFar =
            Trade.bestTradeExactOut(allowedPairs[index], currencyIn, currencyAmountOut, {
              maxHops: 1,
              maxNumResults: 1,
            })[0] ?? null
        }
        for (let i = 1; i <= MAX_HOPS; i++) {
          const currentTrade: Trade | null =
            Trade.bestTradeExactOut(allowedPairs[index], currencyIn, currencyAmountOut, {
              maxHops: i,
              maxNumResults: 1,
            })[0] ?? null
          if (PRIORITY_SMART_ROUTERS[chainId][0] === SmartRouter.APE) {
            if (currentTrade?.route?.pairs?.[0]?.router === SmartRouter.APE) {
              if (isTradeBetter(bestApeTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
                bestApeTradeSoFar = currentTrade
              }
            }
          }
          if (isTradeBetter(bestTradeSoFar, currentTrade, BETTER_TRADE_LESS_HOPS_THRESHOLD)) {
            // if current trade is best yet, save it
            bestTradeSoFar = currentTrade
          }
        }
      }
    }

    if (bestApeTradeSoFar) {
      if (parseFloat(bestApeTradeSoFar.priceImpact.toSignificant(6)) < APE_PRICE_IMPACT) {
        return bestApeTradeSoFar
      }
    }
    return bestTradeSoFar
  }, [allowedPairs, currencyAmountOut, currencyIn, singleHopOnly, chainId])
}

export function useIsTransactionUnsupported(currencyIn?: Currency, currencyOut?: Currency): boolean {
  const unsupportedTokens: { [address: string]: Token } = useUnsupportedTokens()
  const { chainId } = useActiveWeb3React()

  const tokenIn = wrappedCurrency(currencyIn, chainId)
  const tokenOut = wrappedCurrency(currencyOut, chainId)

  // if unsupported list loaded & either token on list, mark as unsupported
  if (unsupportedTokens) {
    if (tokenIn && Object.keys(unsupportedTokens).includes(tokenIn.address)) {
      return true
    }
    if (tokenOut && Object.keys(unsupportedTokens).includes(tokenOut.address)) {
      return true
    }
  }

  return false
}
