import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import getRpcUrl from 'utils/getRpcUrl'

/**
 * Provides a web3 instance using our own private provider httpProver
 */

const activeWeb3Instance = {}
const activeContracts = {}

const getWeb3 = (chainId: number) => {
  if (!activeWeb3Instance[chainId]) {
    const RPC_URL = getRpcUrl(chainId)
    const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
    activeWeb3Instance[chainId] = new Web3(httpProvider)
  }
  return activeWeb3Instance[chainId]
}

const getContract = (abi: any, address: string, chainId: number, contractOptions?: ContractOptions) => {
  if (!activeContracts[chainId] || !activeContracts[chainId][address]) {
    const web3 = getWeb3(chainId)
    const contract = new web3.eth.Contract(abi as unknown as AbiItem, address, contractOptions)
    activeContracts[chainId] = {[address]: contract}
    return contract
  }
  return activeContracts[chainId][address]
}

export { getWeb3, getContract }
