// import { useCallback } from 'react'
// import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
// import { NoBscProviderError } from '@binance-chain/bsc-connector'
// import {
//   NoEthereumProviderError,
//   UserRejectedRequestError as UserRejectedRequestErrorInjected,
// } from '@web3-react/injected-connector'
// import {
//   UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
//   WalletConnectConnector,
// } from '@web3-react/walletconnect-connector'
// import { ConnectorNames, localStorageKey } from '@ape.swap/uikit'
// import { connectorsByName } from 'utils/web3React'
// import { setupNetwork } from 'utils/wallet'
// import { useNetworkChainId, useToast } from 'state/hooks'
// import { profileClear } from 'state/profile'

// import { useDispatch } from 'react-redux'
// import { useTranslation } from 'contexts/Localization'

const useAuth = () => {
  // const { activate, deactivate } = useWeb3React()
  // const chainId = useNetworkChainId()
  // const { toastError } = useToast()
  // const dispatch = useDispatch()
  // const { t } = useTranslation()

  // const login = useCallback((connectorID: ConnectorNames) => {
  //   const connector = connectorsByName[connectorID]
  //   // HERE IS WHERE THE MAGIC HAPPENS
  //   // return console.log({ connectorID })
  //   if (connector) {
  //     activate(connector, async (error: Error) => {
  //       if (error instanceof UnsupportedChainIdError) {
  //         const hasSetup = await setupNetwork(chainId)
  //         if (hasSetup) {
  //           activate(connector)
  //         }
  //       } else {
  //         window.localStorage.removeItem(localStorageKey)
  //         if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
  //           toastError(t("Browser Error: Please use a crypto wallet app's built-in browser to connect to ApeSwap."), {
  //             text: 'Learn More',
  //             url: 'https://apeswap.gitbook.io/apeswap-finance/product-and-features/wallets/how-to-use-apeswap-on-mobile-devices',
  //           })
  //         } else if (
  //           error instanceof UserRejectedRequestErrorInjected ||
  //           error instanceof UserRejectedRequestErrorWalletConnect
  //         ) {
  //           if (connector instanceof WalletConnectConnector) {
  //             const walletConnector = connector as WalletConnectConnector
  //             walletConnector.walletConnectProvider = null
  //           }
  //           toastError(t('Wallet Connection Error: Please complete the authorization using your wallet.'))
  //         } else {
  //           toastError(`${error.name}, ${error.message}`)
  //         }
  //       }
  //     })
  //   } else {
  //     console.info('Unable to find connector', 'The connector config is wrong')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const logout = useCallback(() => {
  //   dispatch(profileClear())
  //   deactivate()
  //   if (window.localStorage.getItem('walletconnect')) {
  //     connectorsByName.walletconnect.close()
  //     connectorsByName.walletconnect.walletConnectProvider = null
  //   }
  // }, [deactivate, dispatch])

  const login = () => console.log('login')
  const logout = () => console.log('logout')

  return { login, logout }
}

export default useAuth
