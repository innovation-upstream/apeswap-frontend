/** @jsxImportSource theme-ui */
import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal, AutoRenewIcon } from '@ape.swap/uikit'
import ModalInput from 'components/ModalInput'
import { useTranslation } from 'contexts/Localization'
import { getFullDisplayBalance } from 'utils/formatBalance'

interface WithdrawModalProps {
  max: string
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
}

const modalProps = {
  sx: {
    zIndex: 11,
    maxHeight: 'calc(100% - 30px)',
    minWidth: ['90%', '420px'],
    width: '200px',
    maxWidth: '425px',
  },
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, onDismiss, max, tokenName = '' }) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(max))
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <Modal title={t('Unstake LP')} onDismiss={onDismiss} {...modalProps}>
      <ModalInput
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        value={val}
        max={fullBalance}
        symbol={tokenName}
        inputTitle={t('Unstake')}
      />
      <Button
        disabled={pendingTx || parseFloat(fullBalance) < parseFloat(val)}
        onClick={async () => {
          setPendingTx(true)
          try {
            await onConfirm(val)
            onDismiss()
          } catch (e) {
            console.error('Transaction Failed')
          } finally {
            setPendingTx(false)
          }
        }}
        fullWidth
        endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
        style={{
          borderRadius: '10px',
          marginTop: '10px',
        }}
      >
        {pendingTx ? t('Pending Confirmation') : t('Confirm')}
      </Button>
    </Modal>
  )
}

export default React.memo(WithdrawModal)
