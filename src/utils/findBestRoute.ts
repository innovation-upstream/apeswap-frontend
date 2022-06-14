import { Trade } from '@apeswapfinance/sdk'
import { useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { SwapDelay, RouterTypeParams } from 'state/swap/actions'
import { useSwapActionHandlers } from 'state/swap/hooks'
import callWallchainAPI from 'utils/wallchainService'

export const findBestRoute = (
  swapDelay: SwapDelay,
  swapCalls: any,
  account: string,
  chainId: number,
  onSetSwapDelay: (swapDelay: SwapDelay) => void,
  onBestRoute: (bestRoute: RouterTypeParams) => void,
) => {
  console.log(swapDelay)
  if (swapDelay !== SwapDelay.INPUT_COMPLETE) {
    return false
  }
  console.log(swapCalls)
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
