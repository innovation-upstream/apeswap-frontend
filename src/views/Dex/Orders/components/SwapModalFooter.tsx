/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react'
import { Currency, Trade, TradeType } from '@apeswapfinance/sdk'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import { AutoRow } from 'components/layout/Row'
import { useTranslation } from 'contexts/Localization'
import DexTradeInfo from 'views/Dex/components/DexTradeInfo'
import { Button, Text, Flex } from '@ape.swap/uikit'
import { Field, RouterTypeParams } from 'state/swap/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import OrderTradeInfo from './OrderTradeInfo'

export default function SwapModalFooter({
  trade,
  onConfirm,
  swapErrorMessage,
  disabledConfirm,
  currencies,
  orderMarketStatus,
  realPriceValue,
}: {
  trade: Trade
  currencies: {
    INPUT?: Currency
    OUTPUT?: Currency
  }
  orderMarketStatus: number
  allowedSlippage: number
  onConfirm: () => void
  bestRoute: RouterTypeParams
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
  realPriceValue: string
}) {
  const { t } = useTranslation()
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <Flex sx={{ flexDirection: 'column', transform: 'translate(0px, -10px)', maxWidth: '100%' }}>
      <OrderTradeInfo
        executionPrice={trade?.executionPrice}
        currencies={currencies}
        orderMarketStatus={orderMarketStatus}
        realPriceValue={realPriceValue}
      />
      <>
        <Button fullWidth onClick={onConfirm} disabled={disabledConfirm} mt="12px" id="confirm-swap-or-send">
          {severity > 2 ? t('Order Anyway') : t('Confirm Order')}
        </Button>
        {swapErrorMessage ? 'eror' : null}
      </>
    </Flex>
  )
}
