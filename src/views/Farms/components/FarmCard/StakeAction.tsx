import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Flex, Heading, IconButtonSquare, AddIcon, MinusIcon, useModal, Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import styles from './farmcard.module.css'

interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  tokenName?: string
  pid?: number
  addLiquidityUrl?: string
  isApproved?: boolean
  lpSymbol?: string
}

const IconButtonWrapper = styled.div`
  display: flex;
`

const StyledIconButtonSquare = styled(IconButtonSquare)`
  width: 34px;
  height: 34px;
`

const StyledHeadingGreen = styled(Heading).attrs({
  className: styles.styledHeadingGreen,
})`
  font-size: 14px;
  color: #38a611;
`

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 12px;
`

const StyledFlex = styled(Flex).attrs({
  className: styles.styledFlex,
})`
  width: 100%;
  margin-left: 117px;
`

const StakeAction: React.FC<FarmCardActionsProps> = ({
  stakedBalance,
  tokenBalance,
  tokenName,
  pid,
  addLiquidityUrl,
  isApproved,
}) => {
  const TranslateString = useI18n()

  const rewardRefPos = useRef(null)
  const rewardRefNeg = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefPos, useStake(pid).onStake)
  const onUnstake = useReward(rewardRefNeg, useUnstake(pid).onUnstake)

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefPos.current?.rewardMe()
        })
      }}
      tokenName={tokenName}
      addLiquidityUrl={addLiquidityUrl}
    />,
  )
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setTypeOfReward('removed')
        await onUnstake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefNeg.current?.rewardMe()
        })
      }}
      tokenName={tokenName}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapper>
          <Reward ref={rewardRefNeg} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButtonSquare onClick={onPresentWithdraw} mr="6px">
              <MinusIcon color="white" width="12px" height="12px" />
            </StyledIconButtonSquare>
          </Reward>
          <Reward ref={rewardRefPos} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButtonSquare onClick={onPresentDeposit}>
              <AddIcon color="white" width="16px" height="16px" />
            </StyledIconButtonSquare>
          </Reward>
        </IconButtonWrapper>
      )
    )
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start">
        <StyledText fontFamily="poppins">{TranslateString(999, 'Staked')}</StyledText>
        <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
          {displayBalance}
        </StyledHeadingGreen>
      </Flex>
      {isApproved && renderStakingButtons()}
    </StyledFlex>
  )
}

export default StakeAction
