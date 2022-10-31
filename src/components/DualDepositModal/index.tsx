/** @jsxImportSource theme-ui */
import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Flex, Modal, ModalProvider, Text } from '@ape.swap/uikit'
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
import { JSBI, Percent, ZapType } from '@ape.swap/sdk'
import { useUserSlippageTolerance } from 'state/user/hooks'
import { useMiniChefAddress } from 'hooks/useAddress'
import DualActions from './DualActions'
import { TransactionSubmittedContent } from '../TransactionConfirmationModal'
import DistributionPanel from 'views/Dex/Zap/components/DistributionPanel/DistributionPanel'
import FormattedPriceImpact from '../../views/Dex/components/FormattedPriceImpact'
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from '../../state/dualFarms'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()
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
    currencyA: useCurrency(token1),
    currencyB: useCurrency(token0),
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

  const miniApeAddress = useMiniChefAddress()
  const [, pair] = usePair(inputCurrencies[0], inputCurrencies[1])
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, pair?.liquidityToken ?? currencyA)
  const { zap } = useDerivedZapInfo()
  const [zapSlippage, setZapSlippage] = useUserSlippageTolerance(true)
  const originalSlippage = useMemo(() => {
    return zapSlippage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const priceImpact = parseFloat(zap?.totalPriceImpact?.toFixed(2)) * 100
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
          setZapSlippage(originalSlippage)
          dispatch(updateDualFarmUserStakedBalances(chainId, pid, account))
          dispatch(updateDualFarmUserEarnings(chainId, pid, account))
          dispatch(updateDualFarmUserTokenBalances(chainId, pid, account))
        })
        .catch((error) => {
          console.error(error)
          setTxErrorMessage(error.message)
          handlePendingTx(false)
          setZapSlippage(originalSlippage)
        })
    }
  }, [
    chainId,
    currencyB,
    handlePendingTx,
    onStake,
    originalSlippage,
    setZapSlippage,
    t,
    toastSuccess,
    typedValue,
    zapCallback,
  ])

  const handleDismissConfirmation = useCallback(() => {
    // clear zapErrorMessage if user closes the error modal
    setTxErrorMessage(null)
    setPendingDepositTrx(false)
  }, [setPendingDepositTrx])

  const updateSlippage = () => {
    if (zapSlippage < priceImpact) {
      setZapSlippage(priceImpact + 5)
    }
  }

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
              <Flex sx={{ margin: '15px 0', fontWeight: 600 }}>
                <DistributionPanel zap={zap} hideTitle />
              </Flex>
            )}
            {zapSlippage < priceImpact &&
              !currencyB &&
              parseFloat(selectedCurrencyBalance?.toExact()) >= parseFloat(typedValue) && (
                <Flex
                  sx={{
                    margin: '15px 0',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Flex sx={{ flexDirection: 'column' }}>
                    <Text size="12px" sx={{ lineHeight: '18px' }}>
                      {t('This transaction requires a slippage tolerance of ')}
                      <FormattedPriceImpact
                        priceImpact={new Percent(JSBI.BigInt(priceImpact + 5), JSBI.BigInt(10000))}
                      />
                      {'. '}
                      {t('After this transaction, slippage tolerance will be reset to ')}
                      {zapSlippage / 100} {'%.'}
                    </Text>
                    {priceImpact + 5 > 500 && (
                      <Text color="error" size="12px">
                        {t('Beware: your transaction may be frontrun')}
                      </Text>
                    )}
                  </Flex>
                  <Button onClick={updateSlippage} sx={{ minWidth: '100px', marginLeft: '5px' }}>
                    {t('Update')}
                  </Button>
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
                  ? 'Insufficient balance'
                  : zapSlippage < priceImpact
                  ? 'Change Slippage'
                  : null
              }
              txError={txErrorMessage}
              disabled={pendingTx || selectedCurrencyBalance?.toExact() === '0'}
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
