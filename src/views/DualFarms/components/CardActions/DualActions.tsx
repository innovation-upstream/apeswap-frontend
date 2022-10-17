import React from 'react'
import UnlockButton from '../../../../components/UnlockButton'
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import { Button } from '@ape.swap/uikit'
import { ApprovalState, useApproveCallbackFromZap } from '../../../../hooks/useApproveCallback'
import { MergedZap } from '../../../../state/zap/actions'
import { CenterContainer } from './styles'
import ApprovalAction from './ApprovalAction'
import { useTranslation } from '../../../../contexts/Localization'
import { AutoRenewIcon } from '@apeswapfinance/uikit'
import { useDerivedZapInfo } from '../../../../state/zap/hooks'

/**
 * Component's goal is to handle actions for DepositModal.tsx which, in turn, handles deposit/zap flow for farms,
 * dual farms and jungle farms.
 * The component can handle approval flow for both zap and a given contract defined in lpToApprove
 * @lpToApprove lp address to be approved
 * @showApproveLpFlow Determines whether the approve contract button should be displayed
 * @pid pool's id
 * @isZapSelected Determines whether the zap approval button should be displayed
 * @inputError Error text to show in the button
 * @disabled Sets disable state for button
 * @pendingTrx Sets pending trx state
 * @handleAction Function to trigger deposit/zap action
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
}) => {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const { zap } = useDerivedZapInfo()
  const [approval, approveCallback] = useApproveCallbackFromZap(zap)
  const showApproveZapFlow = approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING

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
      return <ApprovalAction addressToApprove={lpToApprove} pid={pid} />
    }
    if (isZapSelected && showApproveZapFlow) {
      return (
        <Button
          onClick={approveCallback}
          disabled={approval !== ApprovalState.NOT_APPROVED}
          load={approval === ApprovalState.PENDING}
          fullWidth
        >
          {approval === ApprovalState.PENDING
            ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
            : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
        </Button>
      )
    }
    if (!showApproveZapFlow || !showApproveLpFlow) {
      return (
        <Button
          fullWidth
          onClick={handleAction}
          endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
          style={{ borderRadius: '10px' }}
          disabled={disabled}
        >
          {pendingTrx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
      )
    }
  }
  return <>{renderAction()}</>
}

export default React.memo(DualActions)
