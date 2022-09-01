import { Pair, SmartRouter } from '@ape.swap/sdk'
import { createAction } from '@reduxjs/toolkit'

export enum Field {
  LIQUIDITY_PERCENT = 'LIQUIDITY_PERCENT',
  LIQUIDITY = 'LIQUIDITY',
  CURRENCY_A = 'CURRENCY_A',
  CURRENCY_B = 'CURRENCY_B',
}

export const typeInput = createAction<{ field: Field; typedValue: string }>('zapMigrator/typeInputZapMigrator')
export const setMigrator = createAction<{ pairAddress: string; smartRouter: SmartRouter }>(
  'zapMigrator/setMigratorZapMigrator',
)
export const replaceZapMigratorState = createAction<{
  field: Field
  typedValue: string
  pairAddress: string
  smartRouter: SmartRouter
}>('zapMigrator/replaceZapMigratorState')
