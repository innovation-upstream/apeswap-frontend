import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Flex, IconButton, AddIcon, MinusIcon, useModal, Button } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useVaultStake } from 'hooks/useStake'
import { useVaultUnstake, useVaultUnstakeAll } from 'hooks/useUnstake'
import { Vault } from 'state/types'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'

interface StakeActionsProps {
  vault: Vault
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
  isHeader?: boolean
}

const IconButtonWrapperStake = styled.div`
  display: flex;
  justify-content: flex-start;
`

const IconButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const StyledIconButton = styled(IconButton)`
  width: 34px;
  height: 34px;
`

const StyledFlex = styled(Flex)`
  position: absolute;
  right: 45px;
  width: 210px;
  margin-left: 10px;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-right: 50px;
  }
`

const StyledButton = styled(Button)`
  font-weight: 600;
`

const StakeAction: React.FC<StakeActionsProps> = ({
  vault,
  stakingTokenBalance,
  stakedBalance,
  isApproved,
  firstStake,
  isHeader,
}) => {
  const { t } = useTranslation()

  const { pid } = vault

  const rewardRefStake = useRef<any | null>(null)
  const rewardRefUnstake = useRef<any | null>(null)
  const rewardRefUnstakeAll = useRef<any | null>(null)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const onStake = useReward(rewardRefStake, useVaultStake(pid).onStake)
  const onUnstake = useReward(rewardRefUnstake, useVaultUnstake(pid).onUnstake)
  const onUnstakeAll = useReward(rewardRefUnstakeAll, useVaultUnstakeAll(pid).onUnstakeAll)

  const convertedLimit = new BigNumber(stakingTokenBalance)

  const lpLabel = vault?.isPair ? `${vault.token0.symbol}-${vault?.token1?.symbol}` : vault.token0.symbol

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefStake.current?.rewardMe()
        })
      }}
      tokenName={lpLabel}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        const maxWithdraw = val === getFullDisplayBalance(stakedBalance)
        setTypeOfReward('removed')
        if (maxWithdraw) {
          await onUnstakeAll(val).catch(() => {
            setTypeOfReward('error')
            rewardRefUnstakeAll.current?.rewardMe()
          })
        } else {
          await onUnstake(val).catch(() => {
            setTypeOfReward('error')
            rewardRefUnstake.current?.rewardMe()
          })
        }
      }}
      tokenName={lpLabel}
    />,
  )

  const renderStakingButtons = () => {
    return (
      stakedBalance.gt(0) && (
        <IconButtonWrapperStake>
          <Reward ref={rewardRefUnstake} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButton onClick={onPresentWithdraw} mr="6px">
              <MinusIcon color="white" width="12px" height="12px" />
            </StyledIconButton>
          </Reward>
          <Reward ref={rewardRefStake} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButton onClick={onPresentDeposit}>
              <AddIcon color="white" width="16px" height="16px" />
            </StyledIconButton>
          </Reward>
        </IconButtonWrapperStake>
      )
    )
  }

  if (isApproved && firstStake && isHeader) {
    return <StyledButton onClick={onPresentDeposit}>{t('STAKE')}</StyledButton>
  }

  return (
    <StyledFlex justifyContent="flex-end">
      {isApproved && <IconButtonWrapper>{renderStakingButtons()}</IconButtonWrapper>}
    </StyledFlex>
  )
}

export default StakeAction
