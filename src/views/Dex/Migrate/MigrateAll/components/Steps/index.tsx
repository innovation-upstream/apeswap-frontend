/** @jsxImportSource theme-ui */
import { Pair, TokenAmount } from '@ape.swap/sdk'
import { Flex, Svg, Text, TooltipBubble } from '@ape.swap/uikit'
import React from 'react'
import { useSetFarms } from 'state/farms/hooks'
import { MigrateResult } from 'state/zapMigrator/hooks'
import { useMigrateAll } from '../../provider'
import ApproveStake from './ApproveStake'
import ApproveMigrate from './ApproveMigrate'
import Migrate from './Migrate'
import Stake from './Stake'
import Unstake from './Unstake'

export const STEP_STATUS = {
  0: 'dsdasd',
  1: 'asdasd',
  2: 'gdfgdfg',
  3: 'asdasd',
}

const Steps: React.FC = () => {
  // Fetch farms to filter lps on steps
  useSetFarms()
  const { activeIndex, migrateStakeLps, migrateWalletLps, apeswapWalletLps, migrateLpStatus } = useMigrateAll()
  console.log('This is another', migrateLpStatus)
  const stepList = [
    <Unstake migrateList={migrateStakeLps} key="unstake" />,
    <ApproveMigrate migrateList={migrateWalletLps} key="approveMigrate" />,
    <Migrate migrateList={migrateWalletLps} apeswapWalletLps={apeswapWalletLps} key="migrate" />,
    <ApproveStake apeswapWalletLps={apeswapWalletLps} key="approveStake" />,
    <Stake apeswapWalletLps={apeswapWalletLps} key="stake" />,
  ]
  return stepList[activeIndex]
}

export default React.memo(Steps)
