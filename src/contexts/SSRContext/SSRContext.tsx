import React, { createContext, useEffect, useState } from 'react'

interface SSRContextProps {
  isBrowser: boolean
  isDesktop: boolean
}

interface SSRContextProviderProps {
  desktop?: boolean
}

export const SSRContext: React.Context<SSRContextProps> = createContext({
  isBrowser: false,
  isDesktop: true,
} as SSRContextProps)

export const SSRContextProvider: React.FC<SSRContextProviderProps> = ({ desktop, children }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [isDesktop, _] = useState(desktop)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <SSRContext.Provider
      value={{
        isDesktop,
        isBrowser,
      }}
    >
      {children}
    </SSRContext.Provider>
  )
}
