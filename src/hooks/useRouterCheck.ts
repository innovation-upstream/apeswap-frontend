import { BigNumber } from '@ethersproject/bignumber'
import { Contract } from '@ethersproject/contracts'
import { JSBI, Percent, Router, SwapParameters, Trade, TradeType } from '@apeswapfinance/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import truncateHash from 'utils/truncateHash'
import callWallchainAPI from 'utils/wallchainService'
import { useTranslation } from 'contexts/Localization'
import { BIPS_BASE, INITIAL_ALLOWED_SLIPPAGE } from '../config/constants'
import { useTransactionAdder } from '../state/transactions/hooks'
import { calculateGasMargin, getRouterContract, isAddress } from '../utils'
import isZero from '../utils/isZero'
import useTransactionDeadline from './useTransactionDeadline'
import useENS from './ENS/useENS'
import { useSwapCallArguments } from './useSwapCallback'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

export interface SwapCall {
  contract: Contract
  parameters: SwapParameters
}

export interface SuccessfulCall {
  call: SwapCall
  gasEstimate: BigNumber
}

export interface FailedCall {
  call: SwapCall
  error: Error
}

export type EstimatedSwapCall = SuccessfulCall | FailedCall

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export const useRouterCheck = async (trade: Trade, allowedSlippage: number, recipientAddressOrName: string | null) => {
  const { account, chainId, library } = useActiveWeb3React()
  const { t } = useTranslation()
  const swapCalls = useSwapCallArguments(trade, allowedSlippage, recipientAddressOrName)
  console.log(swapCalls)
  const estimatedCalls: EstimatedSwapCall[] = await Promise.all(
    swapCalls.map((call) => {
      const {
        parameters: { methodName, args, value },
        contract,
      } = call
      const options = !value || isZero(value) ? {} : { value }

      return contract.estimateGas[methodName](...args, options)
        .then((gasEstimate) => {
          return {
            call,
            gasEstimate,
          }
        })
        .catch((gasError) => {
          console.error('Gas estimate failed, trying eth_call to extract error', call)

          return contract.callStatic[methodName](...args, options)
            .then((result) => {
              console.error('Unexpected successful call after failed estimate gas', call, gasError, result)
              return { call, error: new Error(t('Unexpected issue with estimating the gas. Please try again.')) }
            })
            .catch((callError) => {
              console.error('Call threw error', call, callError)
              const reason: string = callError.reason || callError.data?.message || callError.message
              const errorMessage = t(
                `The transaction cannot succeed due to error: ${
                  `${reason}. This is probably an issue with one of the tokens you are swapping` ??
                  'Unknown error, check the logs'
                }.`,
              )

              return { call, error: new Error(errorMessage) }
            })
        })
    }),
  )

  // a successful estimation is a bignumber gas estimate and the next call is also a bignumber gas estimate
  const successfulEstimation = estimatedCalls.find(
    (el, ix, list): el is SuccessfulCall =>
      'gasEstimate' in el && (ix === list.length - 1 || 'gasEstimate' in list[ix + 1]),
  )

  console.log(successfulEstimation)

  if (successfulEstimation) {
    const {
      call: {
        contract,
        parameters: { methodName, args, value },
      },
    } = successfulEstimation
    return callWallchainAPI(methodName, args, value, chainId, account, contract)
  }

  return null
}
