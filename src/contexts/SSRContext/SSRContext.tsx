import React, { createContext, useEffect, useState } from 'react'

interface SSRContextProps {
  isBrowser: boolean
  isDesktop: boolean
  origin?: string
}

interface SSRContextProviderProps {
  desktop?: boolean
  origin?: string
}

export const SSRContext: React.Context<SSRContextProps> = createContext({
  isBrowser: false,
  isDesktop: true,
} as SSRContextProps)

export const SSRContextProvider: React.FC<SSRContextProviderProps> = ({ desktop, children, origin }) => {
  const [isBrowser, setIsBrowser] = useState(false)
  const [isDesktop] = useState<boolean | any>(desktop)
  const [appOrigin] = useState(origin)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  return (
    <SSRContext.Provider
      value={{
        isDesktop,
        isBrowser,
        origin: appOrigin,
      }}
    >
      {children}
    </SSRContext.Provider>
  )
}
