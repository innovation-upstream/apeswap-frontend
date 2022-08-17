/** @jsxImportSource theme-ui */
import { Modal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { ConfirmationPendingContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import { ZapInsight } from '../types'

export interface ZapConfirmationModalProps {
  title?: string
  onDismiss?: () => void
  txHash?: string
  zapInsight: ZapInsight
}

const ZapConfirmationModal: React.FC<ZapConfirmationModalProps> = ({ zapInsight, title, onDismiss, txHash }) => {
  const { zapFromAmount, zapInto } = zapInsight
  const { chainId } = useActiveWeb3React()
  const pendingText = `Zapping ${parseFloat(zapFromAmount).toFixed(4)} for ${parseFloat(
    zapInto.liquidityMinted,
  ).toFixed(4)} 
  ${zapInto.tokenASymbol}-${zapInto.tokenBSymbol} LP`
  return (
    <Modal title={title} maxWidth="420px" minWidth="420px" onDismiss={onDismiss}>
      {!txHash ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : (
        <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={onDismiss} />
      )}
    </Modal>
  )
}

export default React.memo(ZapConfirmationModal)
