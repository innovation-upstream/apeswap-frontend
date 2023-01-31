/** @jsxImportSource theme-ui */
import React from 'react'
import BigNumber from 'bignumber.js'
import StakeAction from './StakeActions'
import { Flex } from '@ape.swap/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { VaultVersion } from 'config/constants/types'
import { styles } from '../styles'

interface CardActionProps {
  allowance: string
  stakingTokenBalance: string
  stakedTokenSymbol: string
  stakedBalance: string
  stakeTokenValueUsd: number
  stakeTokenAddress: string
  withdrawFee: string
  pid: number
  vaultVersion: VaultVersion
}

const Actions: React.FC<CardActionProps> = ({
  allowance,
  stakingTokenBalance,
  stakedTokenSymbol,
  stakedBalance,
  stakeTokenValueUsd,
  stakeTokenAddress,
  withdrawFee,
  pid,
  vaultVersion,
}) => {
  const actionToRender = () => {
    const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
    const userStakedBalanceUsd = `$${(getBalanceNumber(new BigNumber(stakedBalance || 0)) * stakeTokenValueUsd).toFixed(
      2,
    )}`
    return (
      <>
        <Flex sx={styles.onlyMobile}>
          <ListViewContent
            title={`Staked ${stakedTokenSymbol}`}
            value={rawStakedBalance ? rawStakedBalance.toFixed(2) : '0.000'}
            value2={userStakedBalanceUsd}
            value2Secondary
            value2Direction="column"
            style={{ flexDirection: 'column', maxWidth: '110px' }}
          />
        </Flex>
        <Flex sx={styles.depositContainer}>
          <StakeAction
            stakedBalance={stakedBalance}
            stakedTokenSymbol={stakedTokenSymbol}
            stakingTokenBalance={stakingTokenBalance}
            stakeTokenValueUsd={stakeTokenValueUsd}
            withdrawFee={withdrawFee}
            pid={pid}
            vaultVersion={vaultVersion}
            allowance={allowance}
            stakeTokenAddress={stakeTokenAddress}
          />
        </Flex>
        <Flex sx={styles.onlyDesktop}>
          <ListViewContent
            title={`Staked ${stakedTokenSymbol}`}
            value={`${rawStakedBalance ? rawStakedBalance.toFixed(2) : '0.000'}`}
            value2={userStakedBalanceUsd}
            value2Secondary
            value2Direction="column"
            style={{ flexDirection: 'column', maxWidth: '140px' }}
          />
        </Flex>
      </>
    )
  }
  return actionToRender()
}

export default React.memo(Actions)
