import sousChefABI from 'config/abi/sousChef.json'
import bananaABI from 'config/abi/banana.json'
import { Pool, TokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchPoolCalls from './fetchPoolCalls'
import cleanPoolData from './cleanPoolData'

const fetchPools = async (chainId: number, tokenPrices: TokenPrices[], poolsConfig: Pool[]) => {
  const poolIds = []
  const poolCalls = poolsConfig.flatMap((pool) => {
    poolIds.push(pool.sousId)
    return fetchPoolCalls(pool, chainId)
  })
  const vals = await multicall(chainId, [...sousChefABI, ...bananaABI], poolCalls)
  // We do not want the block time for the banana earn banana pool so we append two null values to keep the chunks even
  // First null values is for Master Ape V2 and second is Master Ape V1
  const formattedVals = [null, null, vals[0], null, null, ...vals.slice(1)]
  const chunkSize = formattedVals.length / poolsConfig.length
  const chunkedPools = chunk(formattedVals, chunkSize)
  return cleanPoolData(poolIds, chunkedPools, tokenPrices, chainId, poolsConfig)
}

export default fetchPools
