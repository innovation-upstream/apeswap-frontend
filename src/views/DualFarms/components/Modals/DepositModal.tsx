/** @jsxImportSource theme-ui */
import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import { Modal, ModalProvider } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import DualCurrencyPanel from '../../../../components/DualCurrencyPanel/DualCurrencyPanel'
import { Field } from '../../../../state/swap/actions'
import { useDerivedZapInfo, useZapActionHandlers, useZapState } from '../../../../state/zap/hooks'
import { DualCurrencySelector } from '../../../Bills/components/Actions/types'
import { useCurrency } from '../../../../hooks/Tokens'
import { DualFarm } from '../../../../state/types'
import useActiveWeb3React from '../../../../hooks/useActiveWeb3React'
import maxAmountSpend from '../../../../utils/maxAmountSpend'
import { useCurrencyBalance } from '../../../../state/wallet/hooks'
import { usePair } from '../../../../hooks/usePairs'
import { Box } from 'theme-ui'
import { useToast } from '../../../../state/hooks'
import { getEtherscanLink } from '../../../../utils'
import { useDualFarmStake } from '../../../../hooks/useStake'
import { useZapCallback } from '../../../../hooks/useZapCallback'
import { ZapType } from '@ape.swap/sdk'
import { useUserSlippageTolerance } from '../../../../state/user/hooks'
import { useMiniChefAddress } from '../../../../hooks/useAddress'
import DualActions from '../CardActions/DualActions'

interface DepositModalProps {
  onDismiss?: () => void
  setPendingDepositTrx: (value: boolean) => void
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

const DepositModal: React.FC<DepositModalProps> = ({
  onDismiss,
  setPendingDepositTrx,
  pid,
  allowance,
  token0,
  token1,
  lpAddress,
}) => {
  const [pendingTrx, setPendingTrx] = useState(false)
  const { onStake } = useDualFarmStake(pid)
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const showApproveContract = !new BigNumber(allowance).gt(0)

  const { recipient, typedValue } = useZapState()
  const { onCurrencySelection, onUserInput } = useZapActionHandlers()

  const onHandleValueChange = useCallback(
    (val: string) => {
      onUserInput(Field.INPUT, val)
    },
    [onUserInput],
  )

  const billsCurrencies: DualCurrencySelector = {
    currencyA: useCurrency(token0),
    currencyB: useCurrency(token1),
  }
  const [currencyA, setCurrencyA] = useState(billsCurrencies.currencyA)
  const [currencyB, setCurrencyB] = useState(billsCurrencies.currencyB)
  const inputCurrencies = [currencyA, currencyB]

  const handleCurrencySelect = useCallback(
    (currency: DualCurrencySelector) => {
      setCurrencyA(currency?.currencyA)
      setCurrencyB(currency?.currencyB)
      onHandleValueChange('')
      if (!currency?.currencyB) {
        // if there's no currencyB use zap logic
        onCurrencySelection(Field.INPUT, [currency.currencyA])
        onCurrencySelection(Field.OUTPUT, [billsCurrencies.currencyA, billsCurrencies.currencyB])
      }
    },
    [billsCurrencies.currencyA, billsCurrencies.currencyB, onCurrencySelection, onHandleValueChange],
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

  const handleLoadingButtons = (value: boolean) => {
    setPendingDepositTrx(value)
    setPendingTrx(value)
  }

  const handleDeposit = async () => {
    handleLoadingButtons(true)
    // if there's currencyB use deposit LP logic, otherwise use zapcallback
    if (currencyB) {
      await onStake(typedValue)
        .then((resp) => {
          const trxHash = resp.transactionHash
          toastSuccess(t('Deposit Successful'), {
            text: t('View Transaction'),
            url: getEtherscanLink(trxHash, 'transaction', chainId),
          })
          onDismiss()
          handleLoadingButtons(false)
        })
        .catch((e) => {
          console.error(e)
          handleLoadingButtons(false)
        })
    } else {
      zapCallback()
        .then((hash) => {
          handleLoadingButtons(false)
        })
        .catch((error) => {
          handleLoadingButtons(false)
        })
    }
  }

  return (
    <ModalProvider>
      <Modal title={t('Stake LP')} onDismiss={onDismiss} {...modalProps}>
        <Box sx={{ margin: '15px 0' }}>
          <DualCurrencyPanel
            handleMaxInput={handleMaxInput}
            onUserInput={onHandleValueChange}
            value={typedValue}
            onCurrencySelect={handleCurrencySelect}
            inputCurrencies={inputCurrencies}
            lpList={[billsCurrencies]}
          />
        </Box>
        <DualActions
          lpToApprove={lpAddress}
          showApproveLpFlow={showApproveContract}
          pid={pid}
          isZapSelected={!currencyB}
          inputError={typedValue === '0' || typedValue === '0.0' || !typedValue ? 'Enter an amount' : null}
          disabled={
            pendingTrx ||
            selectedCurrencyBalance?.toExact() === '0' ||
            typedValue === '0' ||
            typedValue === '0.0' ||
            parseFloat(selectedCurrencyBalance?.toExact()) < parseFloat(typedValue)
          }
          pendingTrx={pendingTrx}
          handleAction={handleDeposit}
        />
      </Modal>
    </ModalProvider>
  )
}

export default React.memo(DepositModal)
