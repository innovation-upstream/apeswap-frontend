import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { NfaStakingPool } from 'state/types'
import {
  Flex,
  Heading,
  IconButtonSquare,
  AddIcon,
  MinusIcon,
  useModal,
  Text,
  ButtonSquare,
} from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useNfaStake } from 'hooks/useStake'
import { useNfaUnstake } from 'hooks/useUnstake'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'

interface StakeActionsProps {
  pool: NfaStakingPool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  tier: number
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
  stakedNfas?: number[]
}

const IconButtonWrapper = styled.div`
  display: flex;
`

const StyledIconButtonSquare = styled(IconButtonSquare)`
  width: 34px;
  height: 34px;
`

const StyledHeadingGreen = styled(Heading)`
  font-size: 14px;
  color: #38a611;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    color: #38a611;
  }
`

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 12px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  margin-left: 117px;
  margin-right: 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 217px;
  }
`

const WhyCantIBid = styled.a`
  color: ${(props) => props.theme.colors.text};
  bottom: 0px;
  text-decoration: underline;
`

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakedBalance,
  isApproved,
  firstStake,
  tier,
  stakedNfas,
}) => {
  const TranslateString = useI18n()

  const { sousId } = pool

  const rawStakedBalance = getBalanceNumber(stakedBalance, 0)
  const displayBalance = rawStakedBalance.toLocaleString()

  const onStake = useNfaStake(sousId).onStake
  const onUnstake = useNfaUnstake(sousId).onUnstake

  const [onPresentDeposit] = useModal(
    <DepositModal
      onConfirm={async (val) => {
        await onStake(val)
      }}
      tier={tier}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      onConfirm={async (val) => {
        await onUnstake(val)
      }}
      stakedNfas={stakedNfas}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapper>
          {/* <StyledIconButtonSquare onClick={onPresentWithdraw} mr="6px">
            <MinusIcon color="white" width="12px" height="12px" />
          </StyledIconButtonSquare> */}
          <StyledIconButtonSquare onClick={onPresentDeposit}>
            <AddIcon color="white" width="16px" height="16px" />
          </StyledIconButtonSquare>
        </IconButtonWrapper>
      )
    )
  }

  if (firstStake) {
    return <ButtonSquare onClick={onPresentDeposit}>{TranslateString(999, `Stake NFA`)}</ButtonSquare>
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start" marginRight="6px">
        <StyledText fontFamily="poppins">{TranslateString(999, 'Staked')}</StyledText>
        <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
          {displayBalance}
        </StyledHeadingGreen>
      </Flex>
      <WhyCantIBid
        href="https://ape-swap.medium.com/non-fungible-apes-the-great-primate-migration-3a087c3f4e26"
        target="_blank"
        rel="noopener noreferrer"
      >
        Why Cant I Unstake?
      </WhyCantIBid>
      {isApproved && renderStakingButtons()}
    </StyledFlex>
  )
}

export default StakeAction