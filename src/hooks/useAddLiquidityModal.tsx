import React, { useCallback, useState } from 'react'
import { useModal } from '@apeswapfinance/uikit'
import DualLiquidityModal from '../components/DualAddLiquidity/DualLiquidityModal'
import { Field, selectCurrency } from '../state/swap/actions'
import { selectOutputCurrency } from '../state/zap/actions'
import { useDispatch } from 'react-redux'

const useAddLiquidityModal = () => {
  const [poolAddress, setPoolAddress] = useState('')
  const [pid, setPid] = useState(null)
  const dispatch = useDispatch()
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <DualLiquidityModal poolAddress={poolAddress} pid={pid} />,
    true,
    true,
    'dualLiquidityModal',
  )
  return useCallback(
    (token: string, quoteToken: string, poolAddress?: string, pid?: number) => {
      dispatch(
        selectCurrency({
          field: Field.INPUT,
          currencyId: token,
        }),
      )
      dispatch(
        selectCurrency({
          field: Field.OUTPUT,
          currencyId: quoteToken,
        }),
      )
      dispatch(
        selectOutputCurrency({
          currency1: token,
          currency2: quoteToken,
        }),
      )
      setPoolAddress(poolAddress || '')
      setPid(pid)
      onPresentAddLiquidityWidgetModal()
    },
    [dispatch, onPresentAddLiquidityWidgetModal],
  )
}

export default useAddLiquidityModal
