import { Multicall } from 'config/abi/types'
import contracts from 'config/constants/contracts'
import multi from 'config/abi/Multicall.json'
import { BigNumber } from 'ethers'
import { useSingleCallResult } from '../state/multicall/hooks'
import useActiveWeb3React from './useActiveWeb3React'
import useContract from './useContract'

// gets the current timestamp from the blockchain
export default function useCurrentBlockTimestamp(): BigNumber | undefined {
  const { chainId } = useActiveWeb3React()
  const multicall = useContract(multi, contracts.mulltiCall[chainId], false) as Multicall
  return useSingleCallResult(multicall, 'getCurrentBlockTimestamp')?.result?.[0]
}
