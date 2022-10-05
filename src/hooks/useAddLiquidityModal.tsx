import React, { useCallback } from 'react'
import { useModal } from '@apeswapfinance/uikit'
import DualLiquidityModal from '../components/DualAddLiquidity/DualLiquidityModal'
import { Field, selectCurrency } from '../state/swap/actions'
import { selectOutputCurrency } from '../state/zap/actions'
import { useDispatch } from 'react-redux'

const useAddLiquidityModal = (poolAddress?: string) => {
  console.log('executing callbackk')
  const dispatch = useDispatch()
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <DualLiquidityModal poolAddress={poolAddress} />,
    true,
    true,
    'dualLiquidityModal',
  )
  return useCallback(
    (token: string, quoteToken: string) => {
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
      onPresentAddLiquidityWidgetModal()
    },
    [dispatch, onPresentAddLiquidityWidgetModal],
  )
}

export default useAddLiquidityModal
