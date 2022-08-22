/** @jsxImportSource theme-ui */
import { Button, Flex, useModal } from '@ape.swap/uikit'
import { Currency, CurrencyAmount, ROUTER_ADDRESS, Trade } from '@ape.swap/sdk'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { parseAddress } from 'hooks/useAddress'
import { ApprovalState, useApproveCallback, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import React, { useCallback, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useIsExpertMode, useUserSlippageTolerance } from 'state/user/hooks'
import { styles } from '../styles'
import ZapConfirmationModal from './ZapConfirmationModal'
import { ParsedFarm } from 'state/zap/reducer'
import { Field } from '../../../state/zap/actions'

interface ZapLiquidityActionsProps {
  currencies: { [Field.INPUT]?: Currency; [Field.OUTPUT]?: ParsedFarm }
  handleZap: () => void
  zapInputError: string
  zap: any
  zapState: {
    tradeToConfirm: Trade | undefined
    attemptingTxn: boolean
    zapErrorMessage: string | undefined
    txHash: string | undefined
  }
  setZapState: React.Dispatch<
    React.SetStateAction<{
      tradeToConfirm: Trade | undefined
      attemptingTxn: boolean
      zapErrorMessage: string | undefined
      txHash: string | undefined
    }>
  >
  handleDismissConfirmation: () => void
}

const ZapLiquidityActions: React.FC<ZapLiquidityActionsProps> = ({
  currencies,
  zapInputError,
  zap,
  handleZap,
  zapState,
  setZapState,
  handleDismissConfirmation,
}) => {
  const { tradeToConfirm, zapErrorMessage, attemptingTxn, txHash } = zapState
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()

  // Currencies
  const currencyA = currencies?.INPUT
  const currencyB = currencies?.OUTPUT

  // get custom setting values for user
  const [allowedSlippage] = useUserSlippageTolerance()

  // Custom from users settings
  const deadline = useTransactionDeadline()

  // Check if user has expert mode set
  const expertMode = useIsExpertMode()

  // Add transaction
  const addTransaction = useTransactionAdder()

  // check whether the user has approved the router on the tokens

  const [onPresentAddLiquidityModal] = useModal(
    <ZapConfirmationModal
      title={t('Confirm ZAP')}
      zap={zap}
      currencies={currencies}
      onDismiss={handleDismissConfirmation}
      txHash={txHash}
      attemptingTxn={attemptingTxn}
      zapErrorMessage={zapErrorMessage}
    />,
    true,
    true,
    'zapConfirmationModal',
  )

  const handleConfirmZap = () => {
    onPresentAddLiquidityModal()
    handleZap()
  }

  const [approval, approveCallback] = useApproveCallbackFromZap(zap)
  const showApproveFlow =
    !zapInputError && (approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING)

  const renderAction = () => {
    if (!account) {
      return <UnlockButton fullWidth />
    }
    if (zapInputError) {
      return (
        <Button fullWidth disabled>
          {zapInputError}
        </Button>
      )
    }
    if (showApproveFlow) {
      return (
        <Flex sx={{ width: '100%' }}>
          <>
            <Button
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED}
              load={approval === ApprovalState.PENDING}
              fullWidth
              sx={{ padding: '10px 2px' }}
            >
              {approval === ApprovalState.PENDING
                ? `${t('Enabling')} ${currencies[Field.INPUT]?.getSymbol(chainId)}`
                : `${t('Enable')} ${currencies[Field.INPUT]?.getSymbol(chainId)}`}
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
