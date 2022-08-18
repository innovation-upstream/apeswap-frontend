import { ChainOption } from '../types'

export * from './rawToPortfolio'
export * from './rawToProjected'

export function mapChain(option: ChainOption) {
  switch (option) {
    case 'bnb':
      return 56

    case 'polygon':
      return 137

    default:
      return null
  }
}
