import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchChainIdFromUrl, fetchUserNetwork } from 'state/network'
import { replaceSwapState, SwapDelay } from 'state/swap/actions'
import { RouterTypes } from 'config/constants'
import { SmartRouter } from '@ape.swap/sdk'
import track from '../utils/track'
import { getAddChainParameters } from 'config/constants/chains'
import { walletConnectConnection, networkConnection } from 'utils/connection'

const useSwitchNetwork = () => {
  const { chainId, account, connector } = useWeb3React()
  const dispatch = useDispatch()

  const switchNetwork = useCallback(
    async (userChainId: number) => {
      if (account && userChainId !== chainId) {
        try {
          if (connector === walletConnectConnection.connector || connector === networkConnection.connector) {
            await connector.activate(userChainId)
          } else {
            connector.activate(getAddChainParameters(userChainId))
          }
          dispatch(fetchChainIdFromUrl(false))
          dispatch(
            replaceSwapState({
              typedValue: null,
              field: null,
              inputCurrencyId: null,
              outputCurrencyId: null,
              recipient: null,
              swapDelay: SwapDelay.INIT,
              bestRoute: { routerType: RouterTypes.APE, smartRouter: SmartRouter.APE },
            }),
          )
          track({
            event: 'switch_network',
            chain: userChainId,
            data: {},
          })
        } catch (err) {
          console.error({ err })
          dispatch(fetchChainIdFromUrl(false))
        }
      } else {
        dispatch(fetchUserNetwork(chainId, account, userChainId))
      }
      // TODO: Better implementation. This is a hotfix to reset the swap state on network change to not send previous addresses to the wrong multicall state
      dispatch(
        replaceSwapState({
          typedValue: null,
          field: null,
          inputCurrencyId: null,
          outputCurrencyId: null,
          recipient: null,
          swapDelay: SwapDelay.INIT,
          bestRoute: { routerType: RouterTypes.APE, smartRouter: SmartRouter.APE },
        }),
      )
    },
    [account, chainId, dispatch, connector],
  )
  return { switchNetwork }
}

export default useSwitchNetwork
