/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, Text, useModal } from '@ape.swap/uikit'
import React, { useEffect } from 'react'
import LoadingYourMigration from './components/LoadingYourMigration'
import MigrateProgress from './components/MigrateProgress'
import Steps from './components/Steps'
import SuccessfulMigrationModal from './components/SuccessfulMigrationModal'
import { MigrateStatus, useMigrateAll } from './provider'

const MigrateStart: React.FC = () => {
  const { migrationLoading, migrationCompleteLog, migrateLpStatus } = useMigrateAll()
  const allStepsComplete =
    migrateLpStatus?.flatMap((item) =>
      Object.entries(item.status).filter(([, status]) => {
        return status !== MigrateStatus.COMPLETE
      }),
    ).length === 0

  const [onPresentSuccessfulMigrationModal] = useModal(
    <SuccessfulMigrationModal migrationCompleteLog={migrationCompleteLog} />,
    true,
    true,
    'SuccessfulMigrationModal',
  )
  useEffect(() => {
    if (allStepsComplete && migrationCompleteLog.length > 0) {
      onPresentSuccessfulMigrationModal()
    }
  }, [allStepsComplete, migrationCompleteLog.length])
  return (
    <>
      {migrationLoading ? (
        <LoadingYourMigration />
      ) : migrateLpStatus.length !== 0 ? (
        <MigrateProgress>
          <Steps />
        </MigrateProgress>
      ) : (
        <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text> You have nothing to migrate</Text>
        </Flex>
      )}
    </>
  )
}

export default React.memo(MigrateStart)
