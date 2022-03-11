import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

export const Web3ProviderNetworkSSR = dynamic(() => import('./Web3ProviderNetwork'), {
  ssr: true,
})

export function WebStuff({ children, getLibrary }) {
  return (
    <div>
      <Suspense fallback={<>{children}</>}>
        <Web3ProviderNetworkSSR getLibrary={getLibrary}>{children}</Web3ProviderNetworkSSR>
      </Suspense>
    </div>
  )
}
