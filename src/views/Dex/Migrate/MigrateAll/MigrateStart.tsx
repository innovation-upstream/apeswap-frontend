import { useModal } from '@ape.swap/uikit'
import React, { useEffect, useState } from 'react'
import LoadingYourMigration from './components/LoadingYourMigration'
import MigrateProgress from './components/MigrateProgress'
import Steps from './components/Steps'
import SuccessfulMigrationModal from './components/SuccessfulMigrationModal'
import { useMigrateAll } from './provider'

const MigrateStart: React.FC = () => {
  const { migrationLoading, migrationCompleteLog } = useMigrateAll()
  console.log(migrationCompleteLog)
  const [showModal, setShowModal] = useState(false)
  const [onPresentSuccessfulMigrationModal] = useModal(
    <SuccessfulMigrationModal />,
    true,
    true,
    'SuccessfulMigrationModal',
  )
  useEffect(() => {
    if (showModal) {
      setShowModal(false)
    } else {
      setShowModal(true)
    }
  }, [migrationLoading])
  return (
    <>
      {migrationLoading ? (
        <LoadingYourMigration />
      ) : (
        <MigrateProgress>
          {migrationCompleteLog.length > 0 && <SuccessfulMigrationModal />}
          <Steps />
        </MigrateProgress>
      )}
    </>
  )
}

export default MigrateStart
