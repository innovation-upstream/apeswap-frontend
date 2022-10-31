/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { AutoRenewIcon, Button, Flex, useModal } from '@ape.swap/uikit'
import UnlockButton from 'components/UnlockButton'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ApprovalState, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import { styles } from '../styles'
import ZapConfirmationModal from './ZapConfirmationModal'
import { MergedZap } from 'state/zap/actions'

interface ZapLiquidityActionsProps {
  handleZap: () => void
  zapInputError: string
  zap: MergedZap
  zapErrorMessage: string
  txHash?: string
  handleDismissConfirmation: () => void
}

const ZapLiquidityActions: React.FC<ZapLiquidityActionsProps> = ({
  zapInputError,
  zap,
  handleZap,
  zapErrorMessage,
  txHash,
  handleDismissConfirmation,
}) => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()
  const [pendingTx, setPendingTx] = useState<boolean>(false)
  const [recentlyApproved, setRecentlyApproved] = useState<boolean>(false)

  const [onPresentAddLiquidityModal] = useModal(
    <ZapConfirmationModal
      title={t('Confirm ZAP')}
      zap={zap}
      onDismiss={handleDismissConfirmation}
      txHash={txHash}
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

  const aproveZap = () => {
    setPendingTx(true)
    approveCallback()
      .then(() => {
        setPendingTx(false)
        setRecentlyApproved(true)
      })
      .catch(() => setPendingTx(false))
  }

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
    if (showApproveFlow && !recentlyApproved) {
      return (
        <Flex sx={{ width: '100%' }}>
          <>
            <Button
              onClick={aproveZap}
              disabled={approval !== ApprovalState.NOT_APPROVED || pendingTx}
              load={approval === ApprovalState.PENDING}
              endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
              fullWidth
              sx={{ padding: '10px 2px' }}
            >
              {approval === ApprovalState.PENDING
                ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
                : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
            </Button>
          </>
        </Flex>
      )
    }
    return (
      <Button fullWidth onClick={() => handleConfirmZap()}>
        {t('Zap Liquidity')}
      </Button>
    )
  }

  return <Flex sx={{ ...styles.zapActionsContainer }}>{renderAction()}</Flex>
}

export default React.memo(ZapLiquidityActions)
