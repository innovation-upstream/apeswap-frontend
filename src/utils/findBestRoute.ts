import { SwapDelay, RouterTypeParams } from 'state/swap/actions'
import callWallchainAPI from 'utils/wallchainService'

// This file will be more involved with V2 launch.
export const findBestRoute = (
  swapDelay: SwapDelay,
  swapCalls: any,
  account: string,
  chainId: number,
  onSetSwapDelay: (swapDelay: SwapDelay) => void,
  onBestRoute: (bestRoute: RouterTypeParams) => void,
) => {
  // To not cause a call on every user input the code will be executed when the delay is complete
  if (swapDelay !== SwapDelay.INPUT_COMPLETE) {
    return false
  }
  if (swapCalls[0]) {
    const {
      contract,
      parameters: { methodName, args, value },
    } = swapCalls[0]
    callWallchainAPI(methodName, args, value, chainId, account, contract, onBestRoute, onSetSwapDelay)
  }
  return false
}
