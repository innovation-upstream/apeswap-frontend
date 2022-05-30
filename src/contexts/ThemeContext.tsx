import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { ThemeProvider as EmThemeProvider } from '@emotion/react'
import { light, dark } from '@apeswapfinance/uikit'
import Cookies from 'universal-cookie'
import { Apeswap } from '@ape.swap/uikit'
import { ThemeProvider as ThemeUIProvider } from 'theme-ui'

const CACHE_KEY = 'IS_DARK'
const ThemeContext = React.createContext({ isDark: null as any, toggleTheme: () => null as any })

const ThemeContextProvider = ({ colorMode, children }) => {
  const [isDark, setIsDark] = useState(colorMode === 'dark')

  const toggleTheme = () => {
    setIsDark((prevState) => {
      const cookies = new Cookies()
      cookies.set(CACHE_KEY, !prevState)
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>
        <EmThemeProvider theme={isDark ? dark : light}>
          <ThemeUIProvider
            theme={{
              ...Apeswap,
              config: {
                ...Apeswap.config,
                initialColorModeName: colorMode,
              },
            }}
          >
            {children}
          </ThemeUIProvider>
        </EmThemeProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
