/** @jsxImportSource theme-ui */
import { Modal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import {
  ConfirmationPendingContent,
  TransactionErrorContent,
  TransactionSubmittedContent,
} from 'components/TransactionConfirmationModal'
import { Field } from '../../../state/zap/actions'
import { Currency } from '@ape.swap/sdk'
import { ParsedFarm } from '../../../state/zap/reducer'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useTranslation } from '../../../contexts/Localization'

export interface ZapConfirmationModalProps {
  title?: string
  onDismiss?: () => void
  txHash?: string
  currencies?: { [Field.INPUT]?: Currency; [Field.OUTPUT]?: ParsedFarm }
  zap: any
  zapErrorMessage?: string
}

const ZapConfirmationModal: React.FC<ZapConfirmationModalProps> = ({
  currencies,
  zap,
  title,
  onDismiss,
  txHash,
  zapErrorMessage,
}) => {
  const { currencyIn, pairOut } = zap
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const pendingText = `Zapping ${getBalanceNumber(currencyIn?.inputAmount?.toString())} ${
    currencyIn?.currency?.symbol
  } for ${pairOut?.liquidityMinted?.toSignificant(4)} ${currencies?.OUTPUT?.lpSymbol} LP`
  return (
    <Modal title={title} maxWidth="420px" minWidth="420px" onDismiss={onDismiss}>
      {zapErrorMessage ? (
        <TransactionErrorContent
          onDismiss={onDismiss}
          message={
            zapErrorMessage.includes('INSUFFICIENT_OUTPUT_AMOUNT')
              ? t('Slippage Error: Please check your slippage & try again!')
              : zapErrorMessage
          }
        />
      ) : !txHash ? (
        <ConfirmationPendingContent pendingText={pendingText} />
      ) : (
        <TransactionSubmittedContent
          chainId={chainId}
          hash={txHash}
          onDismiss={onDismiss}
          LpToAdd={currencies[Field.OUTPUT]}
        />
      )}
    </Modal>
  )
}

export default React.memo(ZapConfirmationModal)
