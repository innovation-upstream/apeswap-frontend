import { Interface } from '@ethersproject/abi'
import multicallABI from 'config/abi/Multicall.json'
import { ethers } from 'ethers'
import { getMulticallAddress } from './addressHelper'
import getProvider from './getProvider'

export interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}

const multicall = async (chainId: number, abi: any[], calls: Call[]) => {
  const multicallAddress = getMulticallAddress(chainId)
  const provider = getProvider(chainId)
  const multi = new ethers.Contract(multicallAddress, multicallABI, provider)
  const itf = new Interface(abi)

  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.aggregate(calldata)
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}

// This should be extended to handle errors with a call but for now a error returns 0 for the balance
export const multicallForBalances = async (chainId: number, abi: any[], calls: Call[]) => {
  const multicallAddress = getMulticallAddress(chainId)
  const provider = getProvider(chainId)
  const multi = new ethers.Contract(multicallAddress, multicallABI, provider)
  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.callStatic.multicall(calldata)
  const res = returnData.map((call, i) => (call === '0x' ? null : itf.decodeFunctionResult(calls[i].name, call)))
  return res
}

export default multicall
