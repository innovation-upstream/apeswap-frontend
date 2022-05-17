import { farmsConfig, vaultsConfig } from 'config/constants'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import BigNumber from 'bignumber.js'
import { FarmLpAprsType, LpTokenPrices, TokenPrices } from 'state/types'
import { getContract } from 'utils/getContract'
import { getVaultApeAddressV2 } from 'utils/addressHelper'
import { chunk } from 'lodash'
import vaultApeV2ABI from 'config/abi/vaultApeV2.json'
import multicall from 'utils/multicall'
import fetchVaultCalls from './fetchVaultCalls'
import cleanVaultData from './cleanVaultData'

// import fetchFarmCalls from './fetchFarmCalls'
// import cleanFarmData from './cleanFarmData'

const fetchVaults = async (chainId: number, tokenPrices: TokenPrices[], farmLpAprs: FarmLpAprsType) => {
  console.log(farmLpAprs)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const masterVaultApev2 = getContract(vaultApeV2ABI, getVaultApeAddressV2(chainId), chainId)
  const vaultIds = []
  const vaultCalls = filteredVaults.flatMap((vault) => {
    vaultIds.push(vault.id)
    return fetchVaultCalls(vault, chainId)
  })
  const vals = await multicall(chainId, [...masterchefABI, ...erc20], vaultCalls)
  const vaultSettings = await masterVaultApev2.getSettings()
  const chunkSize = vaultCalls.length / filteredVaults.length
  const chunkedVaults = chunk(vals, chunkSize)
  return cleanVaultData(vaultIds, chunkedVaults, vaultSettings, tokenPrices, farmLpAprs, chainId)
}

export default fetchVaults
