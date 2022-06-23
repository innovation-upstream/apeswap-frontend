import { RouterTypes } from 'config/constants'
import { WALLCHAIN_PARAMS } from 'config/constants/chains'
import { Contract } from 'ethers'
import { SwapDelay, RouterTypeParams, DataResponse } from 'state/swap/actions'

const wallchainResponseIsValid = (
  dataResonse: DataResponse,
  value: string,
  account: string,
  contractAddress: string,
) => {
  if (!dataResonse.pathFound) {
    // Opportunity was not found -> response should be ignored -> valid.
    return false
  }
  return (
    dataResonse.transactionArgs.destination.toLowerCase() === contractAddress.toLowerCase() &&
    dataResonse.transactionArgs.value.toLowerCase() === value.toLowerCase() &&
    dataResonse.transactionArgs.sender.toLowerCase() === account.toLowerCase()
  )
}

const recordTransactionSummary = (dataResponse: DataResponse, chainId: number) => {
  return fetch('https://apeswap-strapi.herokuapp.com/arbitrage-testings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstTokenAddress: dataResponse.summary?.searchSummary?.firstTokenAddress || '',
      expectedProfit: dataResponse.summary?.searchSummary?.expectedProfit || 0,
      expectedUsdProfit: dataResponse.summary?.searchSummary?.expectedUsdProfit || 0,
      firstTokenAmount: dataResponse.summary?.searchSummary?.firstTokenAmount || 0,
      chainId,
      sender: dataResponse.transactionArgs.sender,
    }),
  }).catch((error) => {
    console.error('Wallchain Txn Summary Recording Error', error)
  })
}

/**
 * Call Wallchain API to analyze the expected opportunity.
 * @param methodName function to execute in transaction
 * @param args arguments for the function
 * @param value value parameter for the transaction
 * @param chainId chainId of the blockchain
 * @param account account address from sender
 * @param contract ApeSwap Router contract
 */
export default function callWallchainAPI(
  methodName: string,
  args: (string | string[])[],
  value: string,
  chainId: number,
  account: string,
  contract: Contract,
  onBestRoute: (bestRoute: RouterTypeParams) => void,
  onSetSwapDelay: (swapDelay: SwapDelay) => void,
): Promise<any> {
  const encodedData = contract.interface.encodeFunctionData(methodName, args)
  onSetSwapDelay(SwapDelay.LOADING_ROUTE)
  return fetch(`${WALLCHAIN_PARAMS[chainId].apiUrl}?key=${WALLCHAIN_PARAMS[chainId].apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      value,
      sender: account,
      data: encodedData,
      destination: contract.address,
    }),
  })
    .then((response) => {
      console.log(response)
      if (response.ok) {
        console.log(response)
        return response.json()
      }
      console.error('Wallchain Error', response.status, response.statusText)
      onBestRoute({ routerType: RouterTypes.APE })
      return null
    })
    .then((responseJson) => {
      if (responseJson) {
        const dataResonse: DataResponse = responseJson
        console.log(dataResonse)
        console.log(wallchainResponseIsValid(dataResonse, value, account, contract.address))
        if (wallchainResponseIsValid(dataResonse, value, account, contract.address)) {
          onBestRoute({ routerType: RouterTypes.SMART, smartRouter: dataResonse })
          onSetSwapDelay(SwapDelay.VALID)
        } else {
          onBestRoute({ routerType: RouterTypes.APE })
          onSetSwapDelay(SwapDelay.VALID)
        }
      }
      onSetSwapDelay(SwapDelay.VALID)
      return null
    })
    .catch((error) => {
      onBestRoute(null)
      onSetSwapDelay(SwapDelay.VALID)
      console.error('Wallchain Error', error)
    })
}
