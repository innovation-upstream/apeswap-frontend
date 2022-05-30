import React from 'react'
import { useRouter } from 'next/router'
import { ModalProvider } from '@ape.swap/uikit'
import { ModalProvider as OldModalProvider } from '@apeswapfinance/uikit'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import NftProvider from 'views/Nft/contexts/NftProvider'
import { MenuContextProvider } from '@innovationupstream/apeswap-uikit'
import { NetworkContextName } from 'config/constants'
import { LanguageProvider } from './contexts/Localization'

const Web3ProviderNetwork = typeof window === 'object' ? createWeb3ReactRoot(NetworkContextName) : React.Fragment

const queryClient = new QueryClient()

const Providers: React.FC<{ colorMode?: string }> = ({ colorMode, children }) => {
  const { pathname } = useRouter()

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeContextProvider colorMode={colorMode}>
            <NftProvider>
              <LanguageProvider>
                <RefreshContextProvider>
                  <ModalProvider>
                    <OldModalProvider>
                      <MenuContextProvider collapse active={pathname}>
                        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                      </MenuContextProvider>
                    </OldModalProvider>
                  </ModalProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </NftProvider>
          </ThemeContextProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
