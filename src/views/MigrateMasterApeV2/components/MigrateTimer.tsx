/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import { useMigrationTimes } from 'state/migrationTimer/hooks'
import getTimePeriods from 'utils/getTimePeriods'

const MigrateTimer = () => {
  const currentTime = useCurrentTime()
  const migrateTimes = useMigrationTimes()
  const phase0 = getTimePeriods(migrateTimes.migrate_phase_0 - currentTime / 1000)
  const phase1 = getTimePeriods(migrateTimes.migrate_phase_1 - currentTime / 1000)
  const phase2 = getTimePeriods(migrateTimes.migrate_phase_2 - currentTime / 1000)

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        '@media screen and (min-width: 1130px)': { minWidth: '350px' },
      }}
    >
      <Text
        size="1.5vw"
        sx={{
          lineHeight: 5,
          '@media screen and (min-width: 1130px)': {
            fontSize: '20px',
          },
        }}
      >
        Time Until Migration
      </Text>
      <Text
        size="3vw"
        sx={{
          lineHeight: 0,
          width: 'fit-content',
          '@media screen and (min-width: 1130px)': {
            fontSize: '45px',
          },
        }}
      >
        {`${phase2?.days}d ${phase2?.hours}h ${phase2?.minutes}m ${phase2?.seconds.toFixed(0)}s`}
      </Text>
    </Flex>
  )
}

export default MigrateTimer
