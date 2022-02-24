import React from 'react'
import { ModalProvider } from '@apeswapfinance/uikit'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import NftProvider from 'views/Nft/contexts/NftProvider'
import { ThemeProvider } from 'theme-ui'
import { Apeswap, MenuContextProvider } from '@isioma/uikit'
import { Web3ProviderNetworkSSR } from './components/NoSSR'

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetworkSSR getLibrary={getLibrary}>
        <Provider store={store}>
          <HelmetProvider>
            <ThemeContextProvider>
              <ThemeProvider theme={Apeswap}>
                <NftProvider>
                  <RefreshContextProvider>
                    <ModalProvider>
                      <MenuContextProvider>{children}</MenuContextProvider>
                    </ModalProvider>
                  </RefreshContextProvider>
                </NftProvider>
              </ThemeProvider>
            </ThemeContextProvider>
          </HelmetProvider>
        </Provider>
      </Web3ProviderNetworkSSR>
    </Web3ReactProvider>
  )
}

export default Providers
