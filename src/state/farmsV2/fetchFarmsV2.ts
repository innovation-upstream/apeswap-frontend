import erc20 from 'config/abi/erc20.json'
import masterchefV2ABI from 'config/abi/masterChefV2.json'
import BigNumber from 'bignumber.js'
import { Farm, FarmLpAprsType, LpTokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchFarmCalls from './fetchFarmV2Calls'
import cleanFarmV2Data from './cleanFarmV2Data'

const fetchFarmsV2 = async (
  chainId: number,
  lpPrices: LpTokenPrices[],
  bananaPrice: BigNumber,
  farmLpAprs: FarmLpAprsType,
  farmsConfig: Farm[],
) => {
  const farmIds = []
  const farmCalls = farmsConfig.flatMap((farm) => {
    farmIds.push(farm.pid)
    return fetchFarmCalls(farm, chainId)
  })
  const vals = await multicall(chainId, [...masterchefV2ABI, ...erc20], farmCalls)
  const chunkSize = farmCalls.length / farmsConfig.length
  const chunkedFarms = chunk(vals, chunkSize)
  return cleanFarmV2Data(farmIds, chunkedFarms, lpPrices, bananaPrice, farmLpAprs, farmsConfig, chainId)
}

export default fetchFarmsV2
