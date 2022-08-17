/** @jsxImportSource theme-ui */
import { Button, Flex, useModal } from '@ape.swap/uikit'
import { Currency, CurrencyAmount, ROUTER_ADDRESS } from '@apeswapfinance/sdk'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { parseAddress } from 'hooks/useAddress'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import React, { useCallback, useState } from 'react'
import { Field } from 'state/mint/actions'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useIsExpertMode, useUserSlippageTolerance } from 'state/user/hooks'
import { styles } from '../styles'
import ZapConfirmationModal from './ZapConfirmationModal'
import { ParsedFarm, ZapInsight } from '../types'

interface ZapLiquidityActionsProps {
  currencies: { CURRENCY_A?: Currency; CURRENCY_B?: ParsedFarm }
  parsedAmounts: { CURRENCY_A?: CurrencyAmount; CURRENCY_B?: string }
  error: string
  zapInsight: ZapInsight
}

const ZapLiquidityActions: React.FC<ZapLiquidityActionsProps> = ({ currencies, error, parsedAmounts, zapInsight }) => {
  const [txHash, setTxHash] = useState<string>('')
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()

  // Currencies
  const currencyA = currencies?.CURRENCY_A
  const currencyB = currencies?.CURRENCY_B

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // Custom from users settings
  const deadline = useTransactionDeadline()

  // Check if user has expert mode set
  const expertMode = useIsExpertMode()

  // Add transaction
  const addTransaction = useTransactionAdder()

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    parseAddress(ROUTER_ADDRESS, chainId),
  )

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    setTxHash('')
  }, [])

  const [onPresentAddLiquidityModal] = useModal(
    <ZapConfirmationModal
      title={t('Confirm ZAP')}
      zapInsight={zapInsight}
      onDismiss={handleDismissConfirmation}
      txHash={txHash}
    />,
    true,
    true,
    'zapConfirmationModal',
  )

  const handleConfirmZap = () => {
    onPresentAddLiquidityModal()
  }

  const renderAction = () => {
    if (!account) {
      return <UnlockButton fullWidth />
    }
    if (error) {
      return (
        <Button fullWidth disabled>
          {error}
        </Button>
      )
    }
    if (approvalA === ApprovalState.NOT_APPROVED || (approvalA === ApprovalState.PENDING && !error)) {
      return (
        <Flex sx={{ width: '100%' }}>
          <>
            <Button
              onClick={approveACallback}
              disabled={approvalA === ApprovalState.PENDING}
              load={approvalA === ApprovalState.PENDING}
              fullWidth
              mr={'7.5px'}
              sx={{ padding: '10px 2px' }}
            >
              {approvalA === ApprovalState.PENDING
                ? `${t('Enabling')} ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`
                : `${t('Enable')} ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)}`}
            </Button>
          </>
        </Flex>
      )
    }
    return (
      <Button
        fullWidth
        onClick={() => {
          handleConfirmZap()
        }}
      >
        {t('Zap Liquidity')}
      </Button>
    )
  }

  return <Flex sx={{ ...styles.zapActionsContainer }}>{renderAction()}</Flex>
}

export default React.memo(ZapLiquidityActions)
