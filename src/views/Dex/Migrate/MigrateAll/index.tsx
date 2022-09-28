/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex } from '@ape.swap/uikit'
import { dexStyles } from '../../styles'
import MigrateProgress from './components/MigrateProgress'
import Steps from './components/Steps'
import { MigrateProvider } from './provider'

const MigrateAll: React.FC = () => {
  return (
    <Flex sx={{ ...dexStyles.pageContainer }}>
      <Flex sx={{ flexDirection: 'column', border: '1px solid red', width: '1200px' }}>
        <MigrateProvider>
          <MigrateProgress activeLineMargin={10}>
            <Steps />
          </MigrateProgress>
        </MigrateProvider>
      </Flex>
    </Flex>
  )
}

export default MigrateAll
