import React from 'react'
import { useMigrationPhase } from 'state/migrationTimer/hooks'
import { MigrationPhases } from 'state/migrationTimer/types'
import TempLegacyVaults from './TempLegacyVaults'
import VaultsV3 from './VaultsV3'

const Vaults = () => {
  const currentPhase = useMigrationPhase()
  return currentPhase === MigrationPhases.MIGRATE_PHASE_1 || currentPhase === MigrationPhases.MIGRATE_PHASE_2 ? (
    <VaultsV3 />
  ) : (
    <TempLegacyVaults />
  )
}

export default Vaults
