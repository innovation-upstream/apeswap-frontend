/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'
import { dexStyles } from '../../styles'
import { MigrateProvider } from './provider'
import { useSetFarms } from 'state/farms/hooks'
import { usePollVaultUserData, useSetVaults } from 'state/vaults/hooks'
import MigrateStart from './MigrateStart'

const MigrateAll: React.FC = () => {
  // Fetch farms to filter lps on steps
  useSetFarms()
  useSetVaults()
  usePollVaultUserData()
  return (
    <Flex sx={dexStyles.pageContainer}>
      <Flex sx={{ flexDirection: 'column', width: '1200px' }}>
        <MigrateProvider>
          <MigrateStart />
        </MigrateProvider>
      </Flex>
    </Flex>
  )
}

export default MigrateAll
