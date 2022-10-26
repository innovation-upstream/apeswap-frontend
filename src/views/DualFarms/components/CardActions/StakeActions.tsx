import React, { useState } from 'react'
import { Flex, AddIcon, MinusIcon, AutoRenewIcon, LinkExternal, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useMiniChefUnstake } from 'hooks/useUnstake'
import { useToast } from 'state/hooks'
import { getEtherscanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import DualDepositModal from 'components/DualDepositModal'
import WithdrawModal from '../Modals/WithdrawModal'
import { ActionContainer, CenterContainer, SmallButton, StyledButton } from './styles'
import { DualFarm } from 'state/types'
import { useModal } from '@ape.swap/uikit'

interface StakeActionsProps {
  lpValueUsd: number
  farm: DualFarm
}

const StakeAction: React.FC<StakeActionsProps> = ({ lpValueUsd, farm }) => {
  const stakedBalance = farm?.userData?.stakedBalance?.toString()
  const rawStakedBalance = getBalanceNumber(new BigNumber(stakedBalance))
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(new BigNumber(stakedBalance) || new BigNumber(0)) * lpValueUsd
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)
  const { toastSuccess } = useToast()
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const firstStake = !new BigNumber(stakedBalance)?.gt(0)

  const { onUnstake } = useMiniChefUnstake(farm?.pid)

  const [onPresentDeposit] = useModal(
    <DualDepositModal
      setPendingDepositTrx={setPendingDepositTrx}
      pendingTx={pendingDepositTrx}
      pid={farm?.pid}
      allowance={farm?.userData?.allowance?.toString()}
      token0={farm?.stakeTokens?.token0?.address[chainId]}
      token1={farm?.stakeTokens?.token1?.address[chainId]}
      lpAddress={farm?.stakeTokenAddress}
    />,
    true,
    true,
    `depositModal-${farm.pid}`,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setPendingWithdrawTrx(true)
        await onUnstake(val)
          .then((resp) => {
            const trxHash = resp.transactionHash
            toastSuccess(
              t('Withdraw Successful'),
              <LinkExternal href={getEtherscanLink(trxHash, 'transaction', chainId)}>
                <Text> {t('View Transaction')} </Text>
              </LinkExternal>,
            )
          })
          .catch((e) => {
            console.error(e)
            setPendingWithdrawTrx(false)
          })
        setPendingWithdrawTrx(false)
      }}
    />,
    true,
    true,
    `withdrawModal-${farm.pid}`,
  )

  const renderStakingButtons = () => {
    if (firstStake) {
      return (
        <CenterContainer>
          <StyledButton
            onClick={onPresentDeposit}
            endIcon={pendingDepositTrx && <AutoRenewIcon spin color="currentColor" />}
            disabled={pendingDepositTrx}
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
            disabled={pendingDepositTrx}
          >
            {!pendingDepositTrx && <AddIcon color="white" width="20px" height="20px" fontWeight={700} />}
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
