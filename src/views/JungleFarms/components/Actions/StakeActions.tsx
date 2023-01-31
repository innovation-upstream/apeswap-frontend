/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { AddIcon, Button, Flex, MinusIcon } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { JungleFarm } from 'state/types'
import useStakeModals from './useStakeModals'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { styles } from '../styles'

interface StakeActionsProps {
  farm: JungleFarm
}

const StakeAction: React.FC<StakeActionsProps> = ({ farm }) => {
  const { account } = useActiveWeb3React()
  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const userStakedBalanceUsd = `$${(
    getBalanceNumber(farm?.userData?.stakedBalance || new BigNumber(0)) * farm?.stakingToken?.price
  ).toFixed(2)}`
  const [pendingDepositTrx, setPendingDepositTrx] = useState(false)
  const [pendingWithdrawTrx, setPendingWithdrawTrx] = useState(false)

  const firstStake = !new BigNumber(farm?.userData?.stakedBalance)?.gt(0)

  const { t } = useTranslation()

  const handlePendingTx = useCallback((value: boolean, type: string) => {
    if (type === 'deposit') setPendingDepositTrx(value)
    if (type === 'withdraw') setPendingWithdrawTrx(value)
  }, [])

  const { onPresentDeposit, openWithdrawModal } = useStakeModals(farm, pendingDepositTrx, handlePendingTx)

  const renderStakingButtons = () => {
    return (
      <>
        <Flex sx={styles.onlyMobile}>
          <ListViewContent
            title={`${t('Staked LP')}`}
            value={
              rawStakedBalance > 0
                ? rawStakedBalance.toFixed(2) === '0.00'
                  ? '> 0'
                  : rawStakedBalance.toFixed(2)
                : '0.00'
            }
            value2={userStakedBalanceUsd}
            value2Secondary
            value2Direction="column"
            style={{ flexDirection: 'column', maxWidth: '110px' }}
          />
        </Flex>
        <Flex sx={styles.depositContainer}>
          {!account ? (
            <UnlockButton />
          ) : firstStake ? (
            <Button
              onClick={onPresentDeposit}
              load={pendingDepositTrx}
              disabled={pendingDepositTrx}
              sx={styles.styledBtn}
            >
              {t('DEPOSIT')}
            </Button>
          ) : (
            <Flex sx={{ maxWidth: ['', '', '94px'], alignItems: 'center', width: '100%' }}>
              <Button
                onClick={openWithdrawModal}
                load={pendingWithdrawTrx}
                disabled={pendingWithdrawTrx}
                mr="10px"
                size="sm"
                sx={styles.smallBtn}
              >
                {!pendingWithdrawTrx && <MinusIcon color="white" width="20px" height="20px" fontWeight={700} />}
              </Button>
              <Button
                onClick={onPresentDeposit}
                load={pendingDepositTrx}
                disabled={pendingDepositTrx}
                size="sm"
                sx={styles.smallBtn}
              >
                {!pendingDepositTrx && <AddIcon color="white" width="25px" height="25px" fontWeight={700} />}
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex sx={styles.onlyDesktop}>
          <ListViewContent
            title={`${t('Staked LP')}`}
            value={rawStakedBalance > 0 && rawStakedBalance.toFixed(2) === '0.00' ? '> 0' : rawStakedBalance.toFixed(2)}
            value2={userStakedBalanceUsd}
            value2Secondary
            value2Direction="column"
            style={{ flexDirection: 'column', maxWidth: '110px', justifyContent: 'flex-start' }}
          />
        </Flex>
      </>
    )
  }

  return renderStakingButtons()
}

export default React.memo(StakeAction)
