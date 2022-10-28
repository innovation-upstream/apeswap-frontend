/** @jsxImportSource theme-ui */
import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import { Flex, Modal, ModalProvider } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import DualCurrencyPanel from 'components/DualCurrencyPanel/DualCurrencyPanel'
import { Field } from 'state/swap/actions'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { DualCurrencySelector } from '../../views/Bills/components/Actions/types'
import { useCurrency } from 'hooks/Tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import maxAmountSpend from 'utils/maxAmountSpend'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { usePair } from 'hooks/usePairs'
import { Box } from 'theme-ui'
import { useToast } from 'state/hooks'
import { getEtherscanLink, wrappedToNative } from 'utils'
import { useDualFarmStake } from 'hooks/useStake'
import { useZapCallback } from 'hooks/useZapCallback'
import { ZapType } from '@ape.swap/sdk'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { useMiniChefAddress } from 'hooks/useAddress'
import DualActions from './DualActions'
import { TransactionSubmittedContent } from '../TransactionConfirmationModal'
import DistributionPanel from '../../views/Dex/Zap/components/DistributionPanel/DistributionPanel'

interface DualDepositModalProps {
  onDismiss?: () => void
  setPendingDepositTrx: (value: boolean) => void
  pendingTx: boolean
  pid?: number
  allowance?: string
  token0?: string
  token1?: string
  lpAddress?: string
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

const Index: React.FC<DualDepositModalProps> = ({
  onDismiss,
  setPendingDepositTrx,
  pendingTx,
  pid,
  allowance,
  token0,
  token1,
  lpAddress,
}) => {
  const { onStake } = useDualFarmStake(pid)
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const showApproveContract = !new BigNumber(allowance).gt(0)
  const [txHash, setTxHash] = useState('')
  const [txErrorMessage, setTxErrorMessage] = useState<string>(null)

  const { recipient, typedValue } = useZapState()
  const { onCurrencySelection, onUserInput } = useZapActionHandlers()

  const onHandleValueChange = useCallback(
    (val: string) => {
      onUserInput(Field.INPUT, val)
    },
    [onUserInput],
  )

  const lpCurrencies: DualCurrencySelector = {
    currencyA: useCurrency(token0),
    currencyB: useCurrency(token1),
  }
  const [currencyA, setCurrencyA] = useState(lpCurrencies.currencyA)
  const [currencyB, setCurrencyB] = useState(lpCurrencies.currencyB)
  const inputCurrencies = [currencyA, currencyB]

  const handleCurrencySelect = useCallback(
    (currency: DualCurrencySelector) => {
      setCurrencyA(currency?.currencyA)
      setCurrencyB(currency?.currencyB)
      onHandleValueChange('')
      if (!currency?.currencyB) {
        // if there's no currencyB use zap logic
        onCurrencySelection(Field.INPUT, [currency.currencyA])
        onCurrencySelection(Field.OUTPUT, [lpCurrencies.currencyA, lpCurrencies.currencyB])
      }
    },
    [lpCurrencies.currencyA, lpCurrencies.currencyB, onCurrencySelection, onHandleValueChange],
  )

  const [, pair] = usePair(inputCurrencies[0], inputCurrencies[1])
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, pair?.liquidityToken ?? currencyA)
  const { zap } = useDerivedZapInfo()
  const [zapSlippage] = useUserSlippageTolerance(true)
  const miniApeAddress = useMiniChefAddress()
  const { callback: zapCallback } = useZapCallback(
    zap,
    ZapType.ZAP_MINI_APE,
    zapSlippage,
    recipient,
    miniApeAddress,
    null,
    pid,
  )

  const handleMaxInput = useCallback(() => {
    onHandleValueChange(maxAmountSpend(selectedCurrencyBalance)?.toExact())
  }, [onHandleValueChange, selectedCurrencyBalance])

  const handlePendingTx = useCallback(
    (value: boolean) => {
      setPendingDepositTrx(value)
    },
    [setPendingDepositTrx],
  )

  const handleDeposit = useCallback(async () => {
    handlePendingTx(true)
    // if there's currencyB use deposit LP logic, otherwise use zapcallback
    if (currencyB) {
      await onStake(typedValue)
        .then((resp) => {
          const trxHash = resp.hash
          setTxHash(trxHash)
          handlePendingTx(false)
          resp.wait().then((asd) => {
            toastSuccess(t('Deposit Successful'), {
              text: t('View Transaction'),
              url: getEtherscanLink(trxHash, 'transaction', chainId),
            })
          })
        })
        .catch((error) => {
          console.error(error)
          setTxErrorMessage(error.message)
          handlePendingTx(false)
        })
    } else {
      zapCallback()
        .then((hash) => {
          handlePendingTx(false)
          setTxHash(hash)
        })
        .catch((error) => {
          console.error(error)
          setTxErrorMessage(error.message)
          handlePendingTx(false)
        })
    }
  }, [chainId, currencyB, handlePendingTx, onStake, t, toastSuccess, typedValue, zapCallback])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapErrorMessage if user closes the error modal
    setTxErrorMessage(null)
    setPendingDepositTrx(false)
  }, [setPendingDepositTrx])

  return (
    <>
      {txHash ? (
        <Modal open {...modalProps} title={t('Confirm ZAP')} onDismiss={onDismiss}>
          <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={onDismiss} />
        </Modal>
      ) : (
        <ModalProvider>
          <Modal title={t('Stake LP')} onDismiss={onDismiss} {...modalProps}>
            <Box sx={{ margin: '15px 0' }}>
              <DualCurrencyPanel
                handleMaxInput={handleMaxInput}
                onUserInput={onHandleValueChange}
                value={typedValue}
                onCurrencySelect={handleCurrencySelect}
                inputCurrencies={inputCurrencies}
                lpList={[lpCurrencies]}
              />
            </Box>
            {!currencyB && typedValue && parseFloat(typedValue) > 0 && zap?.pairOut?.liquidityMinted && (
              <Flex sx={{ margin: '15px 0' }}>
                <DistributionPanel zap={zap} hideTitle />
              </Flex>
            )}
            <DualActions
              lpToApprove={lpAddress}
              showApproveLpFlow={showApproveContract}
              pid={pid}
              isZapSelected={!currencyB}
              inputError={
                parseFloat(typedValue) === 0 || !typedValue
                  ? 'Enter an amount'
                  : parseFloat(selectedCurrencyBalance?.toExact()) < parseFloat(typedValue)
                  ? 'Insufficient LP balance'
                  : txErrorMessage
              }
              disabled={
                pendingTx ||
                selectedCurrencyBalance?.toExact() === '0' ||
                parseFloat(selectedCurrencyBalance?.toExact()) < parseFloat(typedValue)
              }
              pendingTrx={pendingTx}
              handleAction={handleDeposit}
              handleDismissConfirmation={handleDismissConfirmation}
              txHash={txHash}
              lpName={`${wrappedToNative(lpCurrencies?.currencyA?.getSymbol(chainId))}-${wrappedToNative(
                lpCurrencies?.currencyB?.getSymbol(chainId),
              )}`}
            />
          </Modal>
        </ModalProvider>
      )}
    </>
  )
}

export default React.memo(Index)
