import React, { useCallback, useState } from 'react'
import { AddIcon, Flex, MinusIcon } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import useIsMobile from 'hooks/useIsMobile'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { ActionContainer, CenterContainer, SmallButtonSquare, StyledButtonSquare } from './styles'
import { JungleFarm } from 'state/types'
import useStakeModals from './useStakeModals'

interface StakeActionsProps {
  farm: JungleFarm
}

const StakeAction: React.FC<StakeActionsProps> = ({ farm }) => {
  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(farm?.userData?.stakedBalance || new BigNumber(0)) * farm?.stakingToken?.price
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)

  const isMobile = useIsMobile()
  const firstStake = !new BigNumber(farm?.userData?.stakedBalance)?.gt(0)

  const { t } = useTranslation()

  const handlePendingTx = useCallback((value: boolean, type: string) => {
    if (type === 'deposit') setPendingDepositTrx(value)
    if (type === 'withdraw') setPendingWithdrawTrx(value)
  }, [])

  const { onPresentDeposit, openWithdrawModal } = useStakeModals(farm, pendingDepositTrx, handlePendingTx)

  const renderStakingButtons = () => {
    if (firstStake) {
      return (
        <CenterContainer>
          <StyledButtonSquare onClick={onPresentDeposit} load={pendingDepositTrx} disabled={pendingDepositTrx}>
            {t('DEPOSIT')}
          </StyledButtonSquare>
        </CenterContainer>
      )
    }
    return (
      <ActionContainer style={{ minWidth: 'auto' }}>
        {isMobile && (
          <ListViewContent
            title={`${t('Staked LP')}`}
            value={rawStakedBalance > 0 && rawStakedBalance.toFixed(2) === '0.00' ? '> 0' : rawStakedBalance.toFixed(2)}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
        )}
        <Flex>
          <SmallButtonSquare
            onClick={openWithdrawModal}
            load={pendingWithdrawTrx}
            disabled={pendingWithdrawTrx}
            mr="6px"
            size="sm"
          >
            {!pendingWithdrawTrx && <MinusIcon color="white" width="20px" height="20px" fontWeight={700} />}
          </SmallButtonSquare>
          <SmallButtonSquare onClick={onPresentDeposit} load={pendingDepositTrx} disabled={pendingDepositTrx} size="sm">
            {!pendingDepositTrx && <AddIcon color="white" width="25px" height="25px" fontWeight={700} />}
          </SmallButtonSquare>
        </Flex>
        {!isMobile && (
          <ListViewContent
            title={`${t('Staked LP')}`}
            value={rawStakedBalance > 0 && rawStakedBalance.toFixed(2) === '0.00' ? '> 0' : rawStakedBalance.toFixed(2)}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
        )}
      </ActionContainer>
    )
  }

  return renderStakingButtons()
}

export default React.memo(StakeAction)
