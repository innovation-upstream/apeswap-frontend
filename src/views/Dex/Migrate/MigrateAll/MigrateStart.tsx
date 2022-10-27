import React from 'react'
import LoadingYourMigration from './components/LoadingYourMigration'
import MigrateProgress from './components/MigrateProgress'
import Steps from './components/Steps'
import { useMigrateAll } from './provider'

const MigrateStart: React.FC = () => {
  const { migrationLoading } = useMigrateAll()
  return (
    <>
      {migrationLoading ? (
        <LoadingYourMigration />
      ) : (
        <MigrateProgress>
          <Steps />
        </MigrateProgress>
      )}
    </>
  )
}

export default MigrateStart
