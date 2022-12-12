import React from 'react'
import { useMigrationPhase } from 'state/migrationTimer/hooks'
import { MigrationPhases } from 'state/migrationTimer/types'
import FarmsV2 from './FarmsV2'
import TempLegacyFarms from './TempLegacyFarms'

const Farms = () => {
  const currentPhase = useMigrationPhase()
  console.log(currentPhase)
  return currentPhase === MigrationPhases.MIGRATE_PHASE_1 || currentPhase === MigrationPhases.MIGRATE_PHASE_2 ? (
    <FarmsV2 />
  ) : (
    <TempLegacyFarms />
  )
}

export default Farms
