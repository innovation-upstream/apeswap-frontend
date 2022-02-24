import dynamic from 'next/dynamic'

export const Web3ProviderNetworkSSR = dynamic(() => import('./Web3ProviderNetwork'), { ssr: false })
