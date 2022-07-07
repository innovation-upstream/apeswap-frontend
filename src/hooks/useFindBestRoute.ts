import { SmartRouter } from '@apeswapfinance/sdk'
import { RouterTypes } from 'config/constants'
import { SwapDelay, Field } from 'state/swap/actions'
import { tryParseAmount, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { useUserSlippageTolerance } from 'state/user/hooks'
import callWallchainAPI from 'utils/wallchainService'
import { useCurrency } from './Tokens'
import { useTradeExactIn, useTradeExactOut } from './Trades'
import useActiveWeb3React from './useActiveWeb3React'
import { useSwapCallArguments } from './useSwapCallback'

const useFindBestRoute = () => {
  const { onSetSwapDelay, onBestRoute } = useSwapActionHandlers()
  const {
    recipient,
    swapDelay,
    independentField,
    typedValue,
    bestRoute,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()
  const [allowedSlippage] = useUserSlippageTolerance()
  const { chainId, account } = useActiveWeb3React()
  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)
  const isExactIn: boolean = independentField === Field.INPUT
  const parsedAmount = tryParseAmount(typedValue, (isExactIn ? inputCurrency : outputCurrency) ?? undefined)
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bestTradeExactIn = useTradeExactIn(isExactIn ? parsedAmount : undefined, outputCurrency ?? undefined)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bestTradeExactOut = useTradeExactOut(inputCurrency ?? undefined, !isExactIn ? parsedAmount : undefined)
  const v2Trade = isExactIn ? bestTradeExactIn : bestTradeExactOut

  const swapCalls = useSwapCallArguments(v2Trade, allowedSlippage, recipient, bestRoute, false)

  // Get the current router the trade will be going through
  const currentSmartRouter: SmartRouter = v2Trade?.route?.pairs?.[0]?.router || bestRoute.smartRouter
  // Get the current router type based on the router
  const currentRouterType: RouterTypes =
    (currentSmartRouter !== SmartRouter.APE ? RouterTypes.SMART : RouterTypes.APE) || bestRoute.routerType
  // onBestRoute({ routerType: smartRouter === SmartRouter.APE ? RouterTypes.APE : RouterTypes.SMART, smartRouter })

  // To not cause a call on every user input the code will be executed when the delay is complete
  if (swapDelay !== SwapDelay.INPUT_COMPLETE) {
    return v2Trade
  }
  if (swapCalls[0]) {
    const {
      contract,
      parameters: { methodName, args, value },
    } = swapCalls[0]
    callWallchainAPI(
      methodName,
      args,
      value,
      chainId,
      account,
      contract,
      currentSmartRouter,
      currentRouterType,
      onBestRoute,
      onSetSwapDelay,
    )
  }
  // onSetSwapDelay(SwapDelay.VALID)
  return v2Trade
}

export default useFindBestRoute
