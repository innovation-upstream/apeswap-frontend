import { Pair, TokenAmount } from '@ape.swap/sdk'
import { ReactNode } from 'react'

export interface MigrateContextData {
  activeIndex: number
  handleActiveIndexCallback: (activeIndex: number) => void
  handleMaximizerApprovalToggle: (apeswapLps: MasterApeV2ProductsInterface[], migrateMaximizers: boolean) => void
  handleAddMigrationCompleteLog: (migrationLog: MigrationCompleteLog) => void
  handleUpdateMigrateLp: (
    id: string,
    type: 'unstake' | 'approveStake' | 'stake',
    status: MigrateStatus,
    statusText?: string,
  ) => void
  migrateMaximizers: boolean
  v1Products: MasterApeProductsInterface[]
  v2Products: MasterApeV2ProductsInterface[]
  migrateLpStatus: MigrateLpStatus[]
  migrationCompleteLog: MigrationCompleteLog[]
  migrationLoading: boolean
}

export const enum MigrateStatus {
  PENDING = 'pending',
  INCOMPLETE = 'incomplete',
  COMPLETE = 'complete',
  INVALID = 'invalid',
}

export interface MigrateProviderProps {
  children: ReactNode
}

export interface MigrateLpStatus {
  id: string
  lp: string
  status: {
    unstake: MigrateStatus
    approveStake: MigrateStatus
    stake: MigrateStatus
  }
  statusText?: string
}

export interface ApeswapWalletLpInterface {
  id: number
  pair: Pair
  balance: TokenAmount
}

export interface MigrationCompleteLog {
  lpSymbol: string
  location: string
  stakeAmount: string
}

export enum ProductTypes {
  FARM = 'FARM',
  VAULT = 'VAULT',
  VAULT_V1 = 'VAULT_V1',
}

// Since LPs can be duplicate an ID is the product-lp combined
export interface MasterApeProductsInterface {
  id: string
  lp: string
  pid: number
  type: ProductTypes
  singleStakeAsset: boolean
  token0: { address: string; symbol: string }
  token1: { address: string; symbol: string }
  stakedAmount: string
  walletBalance: string
  allowance: string
  lpValueUsd: number
}

export interface V2Product {
  pid: number
  token0: { address: string; symbol: string }
  token1: { address: string; symbol: string }
  stakedAmount: string
  allowance: string
}

export interface MasterApeV2ProductsInterface {
  id: string
  lp: string
  singleStakeAsset: boolean
  walletBalance: string
  lpValueUsd: number
  farm: V2Product
  vault: V2Product | null
}
