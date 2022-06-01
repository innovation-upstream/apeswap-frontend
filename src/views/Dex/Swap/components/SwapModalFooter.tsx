import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Trade, TradeType } from '@apeswapfinance/sdk'
import { Text, AutoRenewIcon } from '@apeswapfinance/uikit'
import { Field } from 'state/swap/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {
  computeSlippageAdjustedAmounts,
  computeTradePriceBreakdown,
  formatExecutionPrice,
  warningSeverity,
} from 'utils/prices'
import { AutoColumn } from 'components/layout/Column'
import { AutoRow, RowBetween, RowFixed } from 'components/layout/Row'
import { useTranslation } from 'contexts/Localization'
import DexTradeInfo from 'views/Dex/components/DexTradeInfo'
import { Button } from '@ape.swap/uikit'

const SwapModalFooterContainer = styled(AutoColumn)`
  margin-top: 24px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radii.default};
  border: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ theme }) => theme.colors.white3};
`

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
  const [showInverted, setShowInverted] = useState<boolean>(false)
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const severity = warningSeverity(priceImpactWithoutFee)

  return (
    <>
      <DexTradeInfo trade={trade} allowedSlippage={allowedSlippage} />
      <AutoRow>
        <Button fullWidth onClick={onConfirm} disabled={disabledConfirm} mt="12px" id="confirm-swap-or-send">
          {severity > 2 ? t('Swap Anyway') : t('Confirm Swap')}
        </Button>

        {swapErrorMessage ? 'eror' : null}
      </AutoRow>
    </>
  )
}
