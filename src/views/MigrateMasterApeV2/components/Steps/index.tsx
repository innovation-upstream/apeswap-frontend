/** @jsxImportSource theme-ui */
import React from 'react'
import { useMigrateAll } from '../../provider'
import ApproveStake from './ApproveStake'
import Stake from './Stake'
import Unstake from './Unstake'
import BigNumber from 'bignumber.js'

const Steps = ({ allStepsComplete }: { allStepsComplete: boolean }) => {
  const { activeIndex, v1Products, v2Products } = useMigrateAll()

  const filteredV1StakedProducts = v1Products.filter(({ stakedAmount }) => new BigNumber(stakedAmount).gt(0))

  const stepList = [
    <Unstake migrateList={filteredV1StakedProducts} key="unstake" />,
    <ApproveStake apeswapWalletLps={v2Products} key="approveStake" />,
    <Stake apeswapWalletLps={v2Products} key="stake" allStepsComplete={allStepsComplete} />,
  ]
  return stepList[activeIndex]
}

export default React.memo(Steps)
