/** @jsxImportSource theme-ui */
import React from 'react'
import ApproveStake from './ApproveStake'
import Stake from './Stake'
import Unstake from './Unstake'
import BigNumber from 'bignumber.js'
import { useActiveIndex, useMergedV1Products, useMergedV2Products } from 'state/masterApeMigration/hooks'

const Steps = ({ allStepsComplete }: { allStepsComplete: boolean }) => {
  const activeIndex = useActiveIndex()
  const v1Products = useMergedV1Products()
  const v2Products = useMergedV2Products()

  const filteredV1StakedProducts = v1Products.filter(({ stakedAmount }) => new BigNumber(stakedAmount).gt(0))

  const stepList = [
    <Unstake migrateList={filteredV1StakedProducts} key="unstake" />,
    <ApproveStake apeswapWalletLps={v2Products} key="approveStake" />,
    <Stake apeswapWalletLps={v2Products} key="stake" allStepsComplete={allStepsComplete} />,
  ]
  return stepList[activeIndex]
}

export default Steps
