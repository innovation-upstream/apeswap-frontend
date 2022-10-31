/** @jsxImportSource theme-ui */
import React from 'react'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Button, useModal } from '@ape.swap/uikit'
import { ApprovalState, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import ApprovalAction from './ApprovalAction'
import { useTranslation } from 'contexts/Localization'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import { useDerivedZapInfo } from 'state/zap/hooks'
import { useDualFarmApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import DualConfirmationModal from './DualConfirmationModal'

/**
 * Component's goal is to handle actions for DualDepositModal component which, in turn, aims to handle deposit/zap flow
 * for farms, dual farms and jungle farms.
 * The component can handle approval flow for both zap and a given contract defined in lpToApprove
 * @lpToApprove lp address to be approved
 * @showApproveLpFlow Determines whether the approve contract button should be displayed
 * @pid pool's id - might have to be changed to support farms & jungle farms
 * @isZapSelected Determines whether the zap approval button should be displayed
 * @inputError Error text to show in the button
 * @disabled Sets disable state for button
 * @pendingTrx Sets pending trx state
 * @handleAction deposit/zap handler
 * @handleDismissConfirmation on close modal function
 * @txHash tx hash used to display confirmed transaction modal
 * @lpName pair symbols (e.g. BANANA-MATIC)
 */

interface DualActionsProps {
  lpToApprove: string
  showApproveLpFlow: boolean
  pid?: number
  isZapSelected?: boolean
  inputError?: string
  disabled: boolean
  pendingTrx: boolean
  handleAction: () => void
  handleDismissConfirmation: () => void
  txHash: string
  lpName: string
}

const DualActions: React.FC<DualActionsProps> = ({
  lpToApprove,
  showApproveLpFlow,
  pid,
  isZapSelected,
  inputError,
  disabled,
  pendingTrx,
  handleAction,
  handleDismissConfirmation,
  txHash,
  lpName,
}) => {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { zap } = useDerivedZapInfo()
  const [approval, approveZap] = useApproveCallbackFromZap(zap)
  const showApproveZapFlow = approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING

  const stakingTokenContract = useERC20(lpToApprove)

  //this might have to be changed to adapt it for jungle farms too
  const { onApprove } = useDualFarmApprove(stakingTokenContract, pid)

  const [openConfirmationModal] = useModal(
    <DualConfirmationModal
      isZapSelected={isZapSelected}
      onDismiss={handleDismissConfirmation}
      txHash={txHash}
      errorMessage={inputError}
      lpName={lpName}
    />,
    true,
    true,
    'dualConfirmationModal',
  )

  const handleConfirmTx = () => {
    openConfirmationModal()
    handleAction()
  }

  const renderAction = () => {
    if (!account) {
      return <UnlockButton fullWidth />
    }
    if (inputError) {
      return (
        <Button fullWidth disabled>
          {inputError}
        </Button>
      )
    }
    if (!isZapSelected && showApproveLpFlow) {
      return <ApprovalAction action={onApprove} />
    }
    if (isZapSelected && showApproveZapFlow) {
      return <ApprovalAction action={approveZap} zapApprovalState={approval} />
    }
    if (!showApproveZapFlow || !showApproveLpFlow) {
      return (
        <Button
          fullWidth
          onClick={handleConfirmTx}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
          disabled={disabled}
        >
          {pendingTrx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      )
    }
  }

  return renderAction()
}

export default React.memo(DualActions)
