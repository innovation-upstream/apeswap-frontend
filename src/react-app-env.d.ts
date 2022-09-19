declare const dataLayer: Array<any>
declare module '@siddomains/sidjs'
/// <reference types="react-scripts" />

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}
