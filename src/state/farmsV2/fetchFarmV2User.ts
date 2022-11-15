import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefV2ABI from 'config/abi/masterChefV2.json'
import { Farm } from 'state/types'
import { getMasterChefV2Address } from 'utils/addressHelper'
import multicall from 'utils/multicall'

export const fetchFarmV2UserAllowances = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const masterChefAddress = getMasterChefV2Address(chainId)
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpAddresses[chainId]
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(chainId, erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmV2UserTokenBalances = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpAddresses[chainId]
    return {
      address: lpContractAddress,
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

export const fetchFarmV2UserStakedBalances = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const masterChefAddress = getMasterChefV2Address(chainId)
  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(chainId, masterchefV2ABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmV2UserEarnings = async (chainId: number, account: string, farmsConfig: Farm[]) => {
  const masterChefAddress = getMasterChefV2Address(chainId)
  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingBanana',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(chainId, masterchefV2ABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
