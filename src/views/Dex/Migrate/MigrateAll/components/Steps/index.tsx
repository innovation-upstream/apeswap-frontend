/** @jsxImportSource theme-ui */
import React from 'react'
import { useMigrateAll } from '../../provider'
import ApproveStake from './ApproveStake'
import ApproveMigrate from './ApproveMigrate'
import Migrate from './Migrate'
import Stake from './Stake'
import Unstake from './Unstake'

const Steps: React.FC = () => {
  const { activeIndex, migrateStakeLps, migrateWalletLps, apeswapWalletLps } = useMigrateAll()
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
