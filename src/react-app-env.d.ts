declare const dataLayer: Array<any>
/// <reference types="react-scripts" />

interface WindowChain {
  ethereum?: {
    isMetaMask?: true
    request?: (...args: any[]) => void
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
