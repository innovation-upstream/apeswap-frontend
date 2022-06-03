import React, { useMemo } from 'react'
import { Trade, TradeType } from '@apeswapfinance/sdk'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown, warningSeverity } from 'utils/prices'
import { AutoRow } from 'components/layout/Row'
import { useTranslation } from 'contexts/Localization'
import DexTradeInfo from 'views/Dex/components/DexTradeInfo'
import { Button, Text, Flex } from '@ape.swap/uikit'
import { Field } from 'state/swap/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

export default function SwapModalFooter({
  trade,
  onConfirm,
  allowedSlippage,
  swapErrorMessage,
  disabledConfirm,
}: {
  trade: Trade
  allowedSlippage: number
  onConfirm: () => void
  swapErrorMessage: string | undefined
  disabledConfirm: boolean
}) {
  const { t } = useTranslation()
  const { chainId } = useActiveWeb3React()
  const { priceImpactWithoutFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [trade, allowedSlippage],
  )

  const amount =
    trade.tradeType === TradeType.EXACT_INPUT
      ? slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(6)
      : slippageAdjustedAmounts[Field.INPUT]?.toSignificant(6)
  const symbol =
    trade.tradeType === TradeType.EXACT_INPUT
      ? trade.outputAmount.currency.getSymbol(chainId)
      : trade.inputAmount.currency.getSymbol(chainId)

  const tradeInfoText =
    trade.tradeType === TradeType.EXACT_INPUT
      ? t('Output is estimated. You will receive at least %amount% %symbol% or the transaction will be cancelled.', {
          amount,
          symbol,
        })
      : t('Input is estimated. You will sell at most %amount% %symbol% or the transaction will be cancelled.', {
          amount,
          symbol,
        })

  const [estimatedText, transactionRevertText] = tradeInfoText.split(`${amount} ${symbol}`)

  return (
    <Flex sx={{ flexDirection: 'column', transform: 'translate(0px, -10px)' }}>
      <DexTradeInfo trade={trade} allowedSlippage={allowedSlippage} />
      <Flex sx={{ margin: '10px 0px' }}>
        <Text size="12px" weight={500} sx={{ textAlign: 'center' }}>
          {estimatedText}
          <b>
            {amount} {symbol}
          </b>
          {transactionRevertText}
        </Text>
      </Flex>
      <>
        <Button fullWidth onClick={onConfirm} disabled={disabledConfirm} mt="12px" id="confirm-swap-or-send">
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </Button>
        {swapErrorMessage ? 'eror' : null}
      </>
    </Flex>
  )
}
