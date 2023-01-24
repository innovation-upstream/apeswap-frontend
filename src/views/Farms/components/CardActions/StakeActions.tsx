import React, { useState } from 'react'
import { Flex, AddIcon, MinusIcon, useModal, AutoRenewIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { useToast } from 'state/hooks'
import { useAppDispatch } from 'state'
import { fetchFarmV2UserDataAsync } from 'state/farmsV2'
import { getEtherscanLink, showCircular } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import ListViewContent from 'components/ListViewContent'
import DepositModal from '../Modals/DepositModal'
import { ActionContainer, CenterContainer, SmallButton, StyledButton } from './styles'
import { useHistory } from 'react-router-dom'
import { useIsModalShown } from 'state/user/hooks'
import WithdrawModal from '../../../../components/WithdrawModal'
import { useMigrationPhase } from 'state/migrationTimer/hooks'
import { MigrationPhases } from 'state/migrationTimer/types'

interface StakeActionsProps {
  stakingTokenBalance: string
  stakedBalance: string
  lpValueUsd: number
  pid: number
  v2Flag: boolean
}

const StakeAction: React.FC<StakeActionsProps> = ({ stakingTokenBalance, stakedBalance, lpValueUsd, pid, v2Flag }) => {
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(new BigNumber(stakedBalance) || new BigNumber(0)) * lpValueUsd
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)
  const { toastSuccess } = useToast()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)
  const { t } = useTranslation()
  const history = useHistory()
  const { showGeneralHarvestModal } = useIsModalShown()
  const displayGHCircular = () => showGeneralHarvestModal && showCircular(chainId, history, '?modal=circular-gh')

  const { onStake } = useStake(pid, v2Flag, lpValueUsd)
  const { onUnstake } = useUnstake(pid, v2Flag)
  const currentPhase = useMigrationPhase()

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingTokenBalance}
      onConfirm={async (val) => {
        setPendingDepositTrx(true)
        await onStake(val)
          .then((resp) => {
            const trxHash = resp.transactionHash
            toastSuccess(t('Deposit Successful'), {
              text: t('View Transaction'),
              url: getEtherscanLink(trxHash, 'transaction', chainId),
            })
          })
          .catch((e) => {
            console.error(e)
            setPendingDepositTrx(false)
          })
        dispatch(fetchFarmV2UserDataAsync(chainId, account))
        setPendingDepositTrx(false)
      }}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then((resp) => {
            const trxHash = resp.transactionHash
            toastSuccess(t('Withdraw Successful'), {
              text: t('View Transaction'),
              url: getEtherscanLink(trxHash, 'transaction', chainId),
            })
            if (trxHash) displayGHCircular()
          })
          .catch((e) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchFarmV2UserDataAsync(chainId, account))
        setPendingWithdrawTrx(false)
      }}
      title={'Unstake LP tokens'}
    />,
  )

  const renderStakingButtons = () => {
    if (firstStake) {
      return (
        <CenterContainer>
          <StyledButton
            onClick={onPresentDeposit}
            endIcon={pendingDepositTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingDepositTrx || (!v2Flag && currentPhase !== MigrationPhases.MIGRATE_PHASE_0)}
          >
            {t('DEPOSIT')}
          </StyledButton>
        </CenterContainer>
      )
    }
    return (
      <ActionContainer>
        {isMobile && (
          <ListViewContent
            title={t('Staked LP')}
            value={`${rawStakedBalance.toFixed(6)} LP`}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
        )}
        <Flex>
          <SmallButton
            onClick={onPresentWithdraw}
            endIcon={pendingWithdrawTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingWithdrawTrx}
            mr="6px"
          >
            <MinusIcon color="white" width="16px" height="20px" fontWeight={700} />
          </SmallButton>
          <SmallButton
            onClick={onPresentDeposit}
            endIcon={pendingDepositTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingDepositTrx || !new BigNumber(stakingTokenBalance)?.gt(0) || !v2Flag}
          >
            <AddIcon color="white" width="20px" height="20px" fontWeight={700} />
          </SmallButton>
        </Flex>
        {!isMobile && (
          <ListViewContent
            title={t('Staked LP')}
            value={`${rawStakedBalance.toFixed(6)} LP`}
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
