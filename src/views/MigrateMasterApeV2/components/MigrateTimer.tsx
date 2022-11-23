/** @jsxImportSource theme-ui */
import { Text } from '@ape.swap/uikit'
import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'

const MigrateTimer = ({ migrateTimeStart }: { migrateTimeStart: number }) => {
  const currentTime = useCurrentTime()
  const time = getTimePeriods(migrateTimeStart - currentTime / 1000)

  return (
    <>
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
          '@media screen and (min-width: 1130px)': {
            fontSize: '55px',
          },
        }}
      >
        {`${time?.days}d ${time?.minutes}m ${time?.seconds.toFixed(0)}s`}
      </Text>
    </>
  )
}

export default MigrateTimer
