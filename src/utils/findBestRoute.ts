import { Trade } from '@apeswapfinance/sdk'
import { useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { SwapDelay, WallchainParams } from 'state/swap/actions'
import { useSwapActionHandlers } from 'state/swap/hooks'
import callWallchainAPI from 'utils/wallchainService'

export const findBestRoute = (
  swapDelay: SwapDelay,
  swapCalls: any,
  account: string,
  chainId: number,
  onSetSwapDelay: (swapDelay: SwapDelay) => void,
  onBestRoute: (bestRoute: WallchainParams | null) => void,
) => {
  console.log(swapDelay)
  if (swapDelay !== SwapDelay.INPUT_COMPLETE) {
    return false
  }
  if (swapCalls[0]) {
    const {
      contract,
      parameters: { methodName, args, value },
    } = swapCalls[0]
    console.log('Have made it here sadlasdklaskdlkasjdkjklasjdkljsadljasiodjlkasjdlkajsdlkja')
    callWallchainAPI(methodName, args, value, chainId, account, contract, onBestRoute, onSetSwapDelay)
  }
  return false
}
