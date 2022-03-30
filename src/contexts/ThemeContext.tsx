import React, { useEffect, useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark, Apeswap } from '@apeswapfinance/uikit'
import { ThemeProvider as ThemeUIProvider, useColorMode } from 'theme-ui'

const CACHE_KEY = 'IS_DARK'
const isBrowser = typeof window === 'object'
const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

const ThemeContextProvider = ({ children }) => {
  const [_, setColorMode] = useColorMode()
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = isBrowser ? localStorage.getItem(CACHE_KEY) : 'false'
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : true
  })

  const toggleTheme = () => {
    setIsDark((prevState) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
      return !prevState
    })
  }

  useEffect(() => {
    setColorMode(isDark ? 'dark' : 'light')
  }, [isDark, setColorMode])

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>
        <ThemeUIProvider theme={Apeswap}>{children}</ThemeUIProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
