import React, { useState } from 'react'
import { ThemeProvider as SCThemeProvider } from 'styled-components'
import { ThemeProvider as EmThemeProvider } from '@emotion/react'
import { light, dark } from '@apeswapfinance/uikit'
import { useColorMode } from 'theme-ui'
import Cookies from 'universal-cookie'

const CACHE_KEY = 'IS_DARK'
const ThemeContext = React.createContext({ isDark: null, toggleTheme: () => null })

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
      <SCThemeProvider theme={isDark ? dark : light}>
        <EmThemeProvider theme={isDark ? dark : light}>{children}</EmThemeProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
