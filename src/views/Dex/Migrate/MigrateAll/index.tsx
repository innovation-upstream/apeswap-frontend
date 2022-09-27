/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex, AddIcon, Button, Spinner } from '@ape.swap/uikit'
import { dexStyles } from '../../styles'
import MigrateProgress from './components/MigrateProgress'

const MIGRATION_STEPS: { title: string; description: string; active: boolean; complete: boolean }[] = [
  { title: 'Unstake', description: 'some description', active: false, complete: true },
  { title: 'Zap', description: 'some description', active: false, complete: true },
  { title: 'Approve', description: 'some description', active: true, complete: false },
  { title: 'Stake', description: 'some description', active: false, complete: false },
]

const MigrateAll: React.FC = () => {
  return (
    <Flex sx={{ ...dexStyles.pageContainer }}>
      <Flex sx={{ flexDirection: 'column', border: '1px solid red', width: '1200px' }}>
        <MigrateProgress steps={MIGRATION_STEPS} activeIndex={2}>
          <>sadasd</>
        </MigrateProgress>
      </Flex>
    </Flex>
  )
}

export default MigrateAll
