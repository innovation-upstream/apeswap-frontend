import { SwapDelay, RouterTypeParams } from 'state/swap/actions'
import callWallchainAPI from 'utils/wallchainService'

export const findBestRoute = (
  swapDelay: SwapDelay,
  swapCalls: any,
  account: string,
  chainId: number,
  onSetSwapDelay: (swapDelay: SwapDelay) => void,
  onBestRoute: (bestRoute: RouterTypeParams) => void,
) => {
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
