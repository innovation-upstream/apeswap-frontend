import React from 'react'
import { ModalProvider } from '@ape.swap/uikit'
import { ModalProvider as OldModalProvider } from '@apeswapfinance/uikit'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber'
import NftProvider from 'views/Nft/contexts/NftProvider'
import { LanguageProvider } from './contexts/Localization'
import Blocklist from 'components/Blocklist'
import Web3Provider from 'contexts/Web3Provider'

// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const queryClient = new QueryClient()

const Providers: React.FC = ({ children }) => {
  return (
    <Web3Provider>
      <Provider store={store}>
        <BlockNumberProvider>
          <HelmetProvider>
            <ThemeContextProvider>
              <NftProvider>
                <LanguageProvider>
                  <Blocklist>
                    <RefreshContextProvider>
                      <ModalProvider>
                        <OldModalProvider>
                          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                        </OldModalProvider>
                      </ModalProvider>
                    </RefreshContextProvider>
                  </Blocklist>
                </LanguageProvider>
              </NftProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </BlockNumberProvider>
      </Provider>
    </Web3Provider>
  )
}

export default Providers
