import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import vaultApeV2ABI from 'config/abi/vaultApeV2.json'
import multicall from 'utils/multicall'
import { getVaultApeAddressV3 } from 'utils/addressHelper'
import { Vault } from 'state/types'

export const fetchVaultUserAllowances = async (account: string, chainId: number, vaultsConfig: Vault[]) => {
  const vaultApeAddressV3 = getVaultApeAddressV3(chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const calls = filteredVaults.map((vault) => {
    return {
      address: vault.stakeToken.address[chainId],
      name: 'allowance',
      params: [account, vaultApeAddressV3],
    }
  })
  const rawStakeAllowances = await multicall(chainId, erc20ABI, calls)
  const parsedStakeAllowances = rawStakeAllowances.map((stakeBalance) => {
    return new BigNumber(stakeBalance).toJSON()
  })
  return parsedStakeAllowances
}

export const fetchVaultUserTokenBalances = async (account: string, chainId: number, vaultsConfig: Vault[]) => {
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const calls = filteredVaults.map((vault) => {
    return {
      address: vault.stakeToken.address[chainId],
      name: 'balanceOf',
      params: [account],
    }
  })
  const rawTokenBalances = await multicall(chainId, erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchVaultUserStakedAndPendingBalances = async (
  account: string,
  chainId: number,
  vaultsConfig: Vault[],
) => {
  const vaultApeAddressV3 = getVaultApeAddressV3(chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const calls = filteredVaults.map((vault) => {
    return {
      address: vaultApeAddressV3,
      name: 'balanceOf',
      params: [vault.pid, account],
    }
  })

  const rawStakedBalances = await multicall(chainId, vaultApeV2ABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  const parsePendingBalances = rawStakedBalances.map((stakedBalance, index) => {
    return new BigNumber(stakedBalance[1]._hex).toJSON()
  })
  return { stakedBalances: parsedStakedBalances, pendingRewards: parsePendingBalances }
}
