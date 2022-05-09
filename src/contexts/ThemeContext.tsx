import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { light, dark } from '@apeswapfinance/uikit'
import { useColorMode } from 'theme-ui'
import Cookies from 'universal-cookie'

const CACHE_KEY = 'IS_DARK'
const ThemeContext = React.createContext({ isDark: null as any, toggleTheme: () => null as any })

const ThemeContextProvider = ({ colorMode, children }) => {
  const [_, setColorMode] = useColorMode()
  const [isDark, setIsDark] = useState(colorMode === 'dark')

  const toggleTheme = () => {
    setIsDark((prevState) => {
      const cookies = new Cookies()
      cookies.set(CACHE_KEY, !prevState)
      setColorMode(!prevState ? 'dark' : 'light')
      return !prevState
    })
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <SCThemeProvider theme={isDark ? dark : light}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
