import { getMasterChefAddress } from 'utils/addressHelper'
import { Call } from 'utils/multicall'
import { VaultConfig } from 'config/constants/types'

const fetchVaultCalls = (vault: VaultConfig, chainId: number): Call[] => {
  const stratAddress = vault.stratAddress[chainId]
  const { stakeToken, rewardToken, masterchef } = vault
  const masterchefCalls = [
    // Masterchef total alloc points
    {
      address: masterchef.address[chainId],
      name: 'totalAllocPoint',
    },
    // Vaulted farm pool info
    {
      address: masterchef.address[chainId],
      name: 'poolInfo',
      params: [masterchef.pid[chainId]],
    },
    // Masterchef strategy info
    {
      address: masterchef.address[chainId],
      name: 'userInfo',
      params: [masterchef.pid[chainId], stratAddress],
    },
    {
      address: masterchef.address[chainId],
      name: masterchef.rewardsPerBlock[chainId],
    },
  ]
  const calls = [
    // Stake token balance in masterchef
    {
      address: stakeToken.address[chainId],
      name: 'balanceOf',
      params: [masterchef.address[chainId]],
    },
    // Stake token total supply
    {
      address: stakeToken.address[chainId],
      name: 'totalSupply',
    },
    // Stake token amount in strategy
    {
      address: stakeToken.address[chainId],
      name: 'balanceOf',
      params: [stratAddress],
    },
  ]
  const bananaPoolCalls = [
    // Banana pool info
    {
      address: masterchef.address[chainId],
      name: 'poolInfo',
      params: [0],
    },
    // Total banana staked in pool
    {
      address: rewardToken.address[chainId],
      name: 'balanceOf',
      params: [masterchef.address[chainId]],
    },
  ]
  return [...masterchefCalls, ...calls, ...bananaPoolCalls]
}

export default fetchVaultCalls
