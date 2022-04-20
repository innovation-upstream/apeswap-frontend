import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import vaultApeABI from 'config/abi/vaultApe.json'
import multicall from 'utils/multicall'
import { vaultsConfig } from 'config/constants'
import { getVaultApeAddress } from 'utils/addressHelper'

export const fetchVaultUserAllowances = async (account: string, chainId: number) => {
  const vaultApeAddress = getVaultApeAddress(chainId)
  const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  const calls = filteredVaults.map((vault) => {
    return {
      address: vault.stakeToken.address[chainId],
      name: 'allowance',
      params: [account, vault.stratAddress[chainId]],
    }
  })
  const rawStakeAllowances = await multicall(chainId, erc20ABI, calls)
  const parsedStakeAllowances = rawStakeAllowances.map((stakeBalance) => {
    return new BigNumber(stakeBalance).toJSON()
  })
  return parsedStakeAllowances
}

export const fetchVaultUserTokenBalances = async (account: string, chainId: number) => {
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

export const fetchVaultUserStakedBalances = async (account: string, chainId: number) => {
  // const vaultApeAddress = getVaultApeAddress(chainId)
  // const filteredVaults = vaultsConfig.filter((vault) => vault.availableChains.includes(chainId))
  // const calls = filteredVaults.map((vault) => {
  //   return {
  //     address: vault.stratAddress[chainId],
  //     name: 'balanceOf',
  //     params: [vault.pid, account],
  //   }
  // })

  // const rawStakedBalances = await multicall(chainId, erc20ABI, calls)
  // const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
  //   return new BigNumber(stakedBalance[0]._hex).toJSON()
  // })
  return 0
}
