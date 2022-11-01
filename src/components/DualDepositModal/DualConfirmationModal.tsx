/** @jsxImportSource theme-ui */
import { Modal } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { ConfirmationPendingContent, TransactionErrorContent } from 'components/TransactionConfirmationModal'
import { useTranslation } from 'contexts/Localization'
import { wrappedToNative } from 'utils'
import { CHAIN_PARAMS } from 'config/constants/chains'
import { tryParseAmount, useDerivedZapInfo, useZapState } from 'state/zap/hooks'

export interface DualConfirmationModalProps {
  isZapSelected: boolean
  onDismiss?: () => void
  txHash: string
  errorMessage?: string
  lpName: string
}

const modalProps = {
  sx: {
    zIndex: 12,
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    minWidth: ['90%', '420px'],
    width: '200px',
    maxWidth: '425px',
  },
}

const DualConfirmationModal: React.FC<DualConfirmationModalProps> = ({
  isZapSelected,
  onDismiss,
  txHash,
  errorMessage,
  lpName,
}) => {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { typedValue } = useZapState()
  const { zap } = useDerivedZapInfo()

  const currencyInputSymbol =
    zap?.currencyIn?.currency?.symbol === 'ETH'
      ? CHAIN_PARAMS[chainId].nativeCurrency.symbol
      : zap?.currencyIn?.currency?.symbol

  const zapPendingText = `Zapping ${tryParseAmount(typedValue, zap?.currencyIn?.currency)?.toSignificant(
    4,
  )} ${currencyInputSymbol}
   into ${zap?.pairOut?.liquidityMinted?.toSignificant(4)} ${wrappedToNative(
    zap?.pairOut?.pair?.token0?.getSymbol(chainId),
  )}-${wrappedToNative(zap?.pairOut?.pair?.token1?.getSymbol(chainId))} LP`

  const depositPendingText = `Depositing ${parseFloat(typedValue).toFixed(5)} ${lpName}`

  return (
    <Modal title={t('Confirm Deposit')} {...modalProps} onDismiss={onDismiss}>
      {errorMessage ? (
        <TransactionErrorContent
          onDismiss={onDismiss}
          message={
            errorMessage.includes('_AMOUNT')
              ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
              : errorMessage.includes('User denied transaction signature')
              ? t('Transaction rejected.')
              : errorMessage
          }
        />
      ) : (
        !txHash && <ConfirmationPendingContent pendingText={isZapSelected ? zapPendingText : depositPendingText} />
      )}
    </Modal>
  )
}

export default React.memo(DualConfirmationModal)
