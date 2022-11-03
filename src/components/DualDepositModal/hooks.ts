import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ZapType } from '@ape.swap/sdk'
import {
  updateDualFarmUserEarnings,
  updateDualFarmUserStakedBalances,
  updateDualFarmUserTokenBalances,
} from '../../state/dualFarms'
import { useToast } from '../../state/hooks'
import { useTranslation } from '../../contexts/Localization'
import { useZapCallback } from '../../hooks/useZapCallback'
import { useDerivedZapInfo, useZapState } from '../../state/zap/hooks'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

const useDualDeposit = (
  isZapSelected: boolean,
  onStakeLp: (value: string) => void,
  pid: number,
  handlePendingTx: (value: boolean) => void,
) => {
  const { toastError } = useToast()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { account, chainId, library } = useActiveWeb3React()
  const { recipient, typedValue } = useZapState()
  const { zap } = useDerivedZapInfo()
  const [zapSlippage, setZapSlippage] = useUserSlippageTolerance(true)
  const originalSlippage = useMemo(() => {
    return zapSlippage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { callback: zapCallback } = useZapCallback(
    zap,
    ZapType.ZAP_MINI_APE,
    Math.round(zapSlippage),
    recipient,
    null,
    null,
    pid.toString(),
  )

  return useCallback(async () => {
    handlePendingTx(true)
    if (isZapSelected) {
      await onStakeLp(typedValue)
    } else {
      await zapCallback()
        .then((hash) => {
          library.waitForTransaction(hash).then(() => {
            handlePendingTx(false)
            setZapSlippage(originalSlippage)
            dispatch(updateDualFarmUserStakedBalances(chainId, pid, account))
            dispatch(updateDualFarmUserEarnings(chainId, pid, account))
            dispatch(updateDualFarmUserTokenBalances(chainId, pid, account))
          })
        })
        .catch((error) => {
          console.error(error)
          handlePendingTx(false)
          toastError(
            error?.message.includes('INSUFFICIENT')
              ? t('Slippage Error: Please check your slippage using the ⚙️ icon & try again!')
              : error?.message || t('Error: Please try again.'),
          )
          setZapSlippage(originalSlippage)
        })
    }
  }, [
    handlePendingTx,
    isZapSelected,
    typedValue,
    t,
    chainId,
    toastError,
    zapCallback,
    setZapSlippage,
    originalSlippage,
    dispatch,
    pid,
    account,
    library,
    onStakeLp,
  ])
}

export default useDualDeposit
