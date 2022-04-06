import { Button } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSwapState } from 'state/swap/hooks'
import LiquidityPopUp from './LiquidityPopUP'

const PopupButton = () => {
  const [open, setOpen] = useState(false)
  const [currencyA1, setcurrencyA1] = useState('')
  const [currencyB1, setcurrencyB1] = useState('')

  const history = useHistory()
  const { INPUT, OUTPUT } = useSwapState()

  const swapCurrencyA = INPUT.currencyId
  const swapCurrencyB = OUTPUT.currencyId

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      {open && (
        <LiquidityPopUp
          history={history}
          swapCurrencyA={currencyA1 || swapCurrencyA || 'ETH'}
          swapCurrencyB={currencyB1 || swapCurrencyB || '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95'}
          handleClose={handleClose}
          setcurrencyA1={setcurrencyA1}
          setcurrencyB1={setcurrencyB1}
        />
      )}
      <Button onClick={handleOpen}> Liquidity PopUp </Button>
    </>
  )
}

export default PopupButton
