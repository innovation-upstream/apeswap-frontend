import React from 'react'
import { useModal } from '@apeswapfinance/uikit'
import { Bills } from 'state/types'
import BuyBillModalView from './BuyBillModalView'
import { StyledButton } from '../styles'
import UserBillModalView from './UserBillModalView'
import { BillsImage } from '../UserBillViews/styles'
import WarningModal from './WarningModal'

interface BillModalProps {
  bill: Bills
  buttonText?: string
  id?: number
  billId?: string
  buttonSize?: number
  buyFlag?: boolean
  billCardImage?: string
  disabled?: boolean
  onDismiss?: () => void
}

const BillModal: React.FC<BillModalProps> = ({
  buttonText,
  bill,
  id,
  buttonSize,
  buyFlag,
  billId,
  billCardImage,
  disabled,
}) => {
  const [onPresentBuyBillsModal] = useModal(<BuyBillModalView bill={bill} />, true, true, `billsModal${id}`)
  const [onPresentUserBillModal] = useModal(
    <UserBillModalView bill={bill} billId={billId as string} />,
    true,
    true,
    `billsModal${bill.billNftAddress}-${billId}`,
  )
  const [onPresentBuyWarning] = useModal(<WarningModal bill={bill} />, true, true, `billsWarningModal${id}`)
  return !billCardImage ? (
    <StyledButton
      onClick={
        buyFlag
          ? parseFloat(bill?.discount as string) < 0
            ? onPresentBuyWarning
            : onPresentBuyBillsModal
          : onPresentUserBillModal
      }
      buttonSize={buttonSize}
      disabled={disabled}
    >
      {buttonText}
    </StyledButton>
  ) : (
    <BillsImage image={billCardImage} onClick={onPresentUserBillModal} style={{ cursor: 'pointer' }} />
  )
}

export default React.memo(BillModal)
