import { Trade } from '@apeswapfinance/sdk'
import { useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { SwapDelay } from 'state/swap/actions'
import { useSwapActionHandlers } from 'state/swap/hooks'
import callWallchainAPI from 'utils/wallchainService'
import { useSwapCallArguments } from './useSwapCallback'

interface TransactionArgs {
  data: string
  destination: string
  gas: any | null
  gasPrice: any | null
  maxFeePerGas: any | null
  maxPriorityFeePerGas: any | null
  nonce: any | null
  sender: string
  value: string
}

interface SearchSummary {
  expectedProfit: number
  expectedUsdProfit: number
  firstTokenAddress: string
  firstTokenAmount: number
}

export interface WallchainParams {
  pathFound: boolean
  summary: { searchSummary: SearchSummary | null }
  transactionArgs: TransactionArgs
}

export const useRouterCheck = async (
  trade: Trade,
  allowedSlippage: number,
  recipientAddressOrName: string | null,
  swapDelay: SwapDelay,
) => {
  const [wallchainResp, setWallchainResp] = useState<WallchainParams | boolean>(false)
  const { account, chainId } = useActiveWeb3React()
  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName)
  const { onSetSwapDelay } = useSwapActionHandlers()
  if (swapDelay !== SwapDelay.INPUT_COMPLETE) {
    return false
  }
  onSetSwapDelay(SwapDelay.LOADING_ROUTE)
  if (swapCalls[0]) {
    const {
      contract,
      parameters: { methodName, args, value },
    } = swapCalls[0]
    onSetSwapDelay(SwapDelay.VALID)
    console.log('Have made it here sadlasdklaskdlkasjdkjklasjdkljsadljasiodjlkasjdlkajsdlkja')
    const rep = await callWallchainAPI(methodName, args, value, chainId, account, contract)
      .then((resp) => {
        console.log(resp)
        return resp
      })
      .catch(() => {
        console.error('error')
        setWallchainResp(false)
      })
    console.log('Have made it here sadlasdklaskdlkasjdkjklasjdkljsadljasiodjlkasjdlkajsdlkja')
    console.log('Have made it here sadlasdklaskdlkasjdkjklasjdkljsadljasiodjlkasjdlkajsdlkja')
    console.log(rep)
    console.log('Have made it here sadlasdklaskdlkasjdkjklasjdkljsadljasiodjlkasjdlkajsdlkja')
    console.log('Have made it here sadlasdklaskdlkasjdkjklasjdkljsadljasiodjlkasjdlkajsdlkja')

    setWallchainResp(rep)
  }
  onSetSwapDelay(SwapDelay.VALID)
  console.log(wallchainResp)
  return wallchainResp
}
