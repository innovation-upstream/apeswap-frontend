import React, { useCallback, useState } from 'react'
import { Flex, AddIcon, MinusIcon, useModal } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useJungleStake } from 'hooks/useStake'
import { fetchJungleFarmsUserDataAsync } from 'state/jungleFarms'
import { useJungleUnstake } from 'hooks/useUnstake'
import useIsMobile from 'hooks/useIsMobile'
import { useToast } from 'state/hooks'
import { useAppDispatch } from 'state'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { ActionContainer, CenterContainer, SmallButtonSquare, StyledButtonSquare } from './styles'
import WithdrawModal from '../../../../components/WithdrawModal'
import DualDepositModal from '../../../../components/DualDepositModal'
import { JungleFarm } from 'state/types'

interface StakeActionsProps {
  farm: JungleFarm
}

const StakeAction: React.FC<StakeActionsProps> = ({ farm }) => {
  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(farm?.userData?.stakedBalance || new BigNumber(0)) * farm?.stakingToken?.price
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)

  const { toastSuccess } = useToast()
  const isMobile = useIsMobile()
  const firstStake = !new BigNumber(farm?.userData?.stakedBalance)?.gt(0)

  const { onStake } = useJungleStake(farm?.jungleId)
  const { onUnstake } = useJungleUnstake(farm?.jungleId)
  const { t } = useTranslation()

  const handlePendingDepositTx = useCallback((value: boolean) => {
    setPendingDepositTrx(value)
  }, [])

  const [onPresentDeposit] = useModal(
    <DualDepositModal
      setPendingDepositTrx={handlePendingDepositTx}
      pendingTx={pendingDepositTrx}
      pid={farm?.jungleId}
      allowance={farm?.userData?.allowance?.toString()}
      token0={farm?.lpTokens?.quoteToken.address[chainId]}
      token1={farm?.lpTokens?.token.address[chainId]}
      lpAddress={farm?.stakingToken.address[chainId]}
      onStakeLp={async (val: string) => {
        setPendingDepositTrx(true)
        await onStake(val, chainId)
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
        dispatch(fetchJungleFarmsUserDataAsync(chainId, account))
        setPendingDepositTrx(false)
      }}
      enableZap={farm?.zapable}
    />,
    true,
    true,
    `depositModal-${farm?.jungleId}`,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={farm?.userData?.stakedBalance?.toString()}
      onConfirm={async (val) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then((resp) => {
            const trxHash = resp.transactionHash
            toastSuccess(t('Withdraw Successful'), {
              text: t('View Transaction'),
              url: getEtherscanLink(trxHash, 'transaction', chainId),
            })
          })
          .catch((e) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        dispatch(fetchJungleFarmsUserDataAsync(chainId, account))
        setPendingWithdrawTrx(false)
      }}
      title={'Unstake LP tokens'}
    />,
  )

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
            onClick={onPresentWithdraw}
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
