import { farmsConfig, vaultsConfig } from 'config/constants'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import BigNumber from 'bignumber.js'
import { FarmLpAprsType, LpTokenPrices, TokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import fetchVaultCalls from './fetchVaultCalls'
import cleanVaultData from './cleanVaultData'
// import fetchFarmCalls from './fetchFarmCalls'
// import cleanFarmData from './cleanFarmData'

const fetchVaults = async (chainId: number, tokenPrices: TokenPrices[], farmLpAprs: FarmLpAprsType) => {
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const vaultIds = []
  const vaultCalls = filteredVaults.flatMap((vault) => {
    vaultIds.push(vault.id)
    return fetchVaultCalls(vault, chainId)
  })
  console.log(vaultCalls)
  const vals = await multicall(chainId, [...masterchefABI, ...erc20], vaultCalls)
  const chunkSize = vaultCalls.length / filteredVaults.length
  const chunkedVaults = chunk(vals, chunkSize)
  console.log(chunkedVaults)
  return cleanVaultData(vaultIds, chunkedVaults, tokenPrices, farmLpAprs, chainId)
}

export default fetchVaults
