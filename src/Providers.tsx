import React from 'react'
import { ModalProvider } from '@apeswapfinance/uikit'
import { useRouter } from 'next/router'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import NftProvider from 'views/Nft/contexts/NftProvider'
import { ThemeProvider } from 'theme-ui'
import { Apeswap, MenuContextProvider } from '@innovationupstream/apeswap-uikit'
import { Web3ProviderNetworkSSR } from './components/NoSSR'

const Providers: React.FC = ({ children }) => {
  const { pathname } = useRouter()

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
                      <MenuContextProvider collapse active={pathname}>
                        {children}
                      </MenuContextProvider>
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
