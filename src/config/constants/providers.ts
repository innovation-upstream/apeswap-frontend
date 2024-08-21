import { ChainId } from '@ape.swap/sdk'
import { RPC_URLS } from './networks'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { AVERAGE_L1_BLOCK_TIME, CHAIN_NAMES } from './chains'
import { isPlain } from '@reduxjs/toolkit'
import { deepCopy } from 'ethers/lib/utils'

class AppJsonRpcProvider extends StaticJsonRpcProvider {
  private _blockCache = new Map<string, Promise<any>>()
  get blockCache() {
    // If the blockCache has not yet been initialized this block, do so by
    // setting a listener to clear it on the next block.
    if (!this._blockCache.size) {
      this.once('block', () => this._blockCache.clear())
    }
    return this._blockCache
  }

  constructor(chainId: ChainId) {
    // Including networkish allows ethers to skip the initial detectNetwork call.
    super(RPC_URLS[chainId][0], /* networkish= */ { chainId, name: CHAIN_NAMES[chainId] })

    // NB: Third-party providers (eg MetaMask) will have their own polling intervals,
    // which should be left as-is to allow operations (eg transaction confirmation) to resolve faster.
    // Network providers (eg AppJsonRpcProvider) need to update less frequently to be considered responsive.
    this.pollingInterval = AVERAGE_L1_BLOCK_TIME
  }

  send(method: string, params: Array<any>): Promise<any> {
    // Only cache eth_call's.
    if (method !== 'eth_call') return super.send(method, params)

    // Only cache if params are serializable.
    if (!isPlain(params)) return super.send(method, params)

    const key = `call:${JSON.stringify(params)}`
    const cached = this.blockCache.get(key)
    if (cached) {
      this.emit('debug', {
        action: 'request',
        request: deepCopy({ method, params, id: 'cache' }),
        provider: this,
      })
      return cached
    }

    const result = super.send(method, params)
    this.blockCache.set(key, result)
    return result
  }
}

/**
 * These are the only JsonRpcProviders used directly by the interface.
 */
export const RPC_PROVIDERS: Record<ChainId, StaticJsonRpcProvider> = {
  [ChainId.MAINNET]: new AppJsonRpcProvider(ChainId.MAINNET),
  [ChainId.MATIC]: new AppJsonRpcProvider(ChainId.MATIC),
  [ChainId.ARBITRUM]: new AppJsonRpcProvider(ChainId.ARBITRUM),
  [ChainId.MATIC_TESTNET]: new AppJsonRpcProvider(ChainId.MATIC_TESTNET),
  [ChainId.BSC]: new AppJsonRpcProvider(ChainId.BSC),
  [ChainId.BSC_TESTNET]: new AppJsonRpcProvider(ChainId.BSC_TESTNET),
  [ChainId.TLOS]: new AppJsonRpcProvider(ChainId.TLOS),
}
