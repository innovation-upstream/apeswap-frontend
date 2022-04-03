import React from 'react'
import { ModalProvider } from '@apeswapfinance/uikit'
import { useRouter } from 'next/router'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import store from 'state'
import NftProvider from 'views/Nft/contexts/NftProvider'
import { ThemeProvider } from 'theme-ui'
import { Apeswap, MenuContextProvider } from '@innovationupstream/apeswap-uikit'
import { NetworkContextName } from 'config/constants'
import Cookies from 'universal-cookie'

const CACHE_KEY = 'IS_DARK'
const cookie = new Cookies()
const cachedMode = cookie.get(CACHE_KEY) || 'false'
const colorMode = JSON.parse(cachedMode) ? 'dark' : 'light'

const Web3ProviderNetwork = typeof window === 'object' ? createWeb3ReactRoot(NetworkContextName) : React.Fragment

const Providers: React.FC = ({ children }) => {
  const { pathname } = useRouter()

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeProvider
            theme={{
              ...Apeswap,
              config: {
                ...Apeswap.config,
                initialColorModeName: colorMode,
              },
            }}
          >
            <ThemeContextProvider>
              <NftProvider>
                <RefreshContextProvider>
                  <ModalProvider>
                    <MenuContextProvider collapse active={pathname}>
                      {children}
                    </MenuContextProvider>
                  </ModalProvider>
                </RefreshContextProvider>
              </NftProvider>
            </ThemeContextProvider>
          </ThemeProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
