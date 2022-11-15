/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'
import { dexStyles } from '../Dex/styles'
import { MigrateProvider } from './provider'
// import { usePollFarms, useSetFarms } from 'state/farms/hooks'
// import { usePollVaultsData, usePollVaultUserData, useSetVaults } from 'state/vaults/hooks'
import MigrateStart from './MigrateStart'
// import { useFarmsV2, usePollFarmsV2, useSetFarmsV2 } from 'state/farmsV2/hooks'

const MigrateMasterApeV2: React.FC = () => {
  // Fetch farms to filter lps on steps
  // TODO: Once data pulling is removed from the app we can add these back
  // useSetFarms()
  // useSetFarmsV2()
  // useSetVaults()
  // usePollVaultsData()
  // usePollVaultUserData()
  // usePollFarms()
  // usePollFarmsV2()
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

export default MigrateMasterApeV2
