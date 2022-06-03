/** @jsxImportSource theme-ui */
import { Flex, HelpIcon, Svg, Text } from '@ape.swap/uikit'
import { Trade } from '@apeswapfinance/sdk'
import { useTranslation } from 'contexts/Localization'
import React, { useEffect, useMemo, useState } from 'react'
import { Divider } from 'theme-ui'
import { Field, SwapDelay, WallchainParams } from 'state/swap/actions'
import { findBestRoute } from 'utils/findBestRoute'
import { useSwapCallArguments } from 'hooks/useSwapCallback'
import { useRouterCheck } from 'hooks/useRouterCheck'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import TradePrice from 'views/Orders/components/TradePrice'
import FormattedPriceImpact from 'views/Orders/components/FormattedPriceImpact'
import { AnimatePresence, motion } from 'framer-motion'
import { computeTradePriceBreakdown, computeSlippageAdjustedAmounts } from 'utils/prices'
import { styles } from './styles'

const DexTradeInfo: React.FC<{
  trade: Trade
  allowedSlippage: number
  bestRoute: WallchainParams | null
  swapDelay?: SwapDelay
  onSetSwapDelay?: (swapDelay: SwapDelay) => void
  open?: boolean
}> = ({ trade, allowedSlippage, swapDelay, bestRoute, open = false }) => {
  const { chainId, account } = useActiveWeb3React()
  const [showMore, setShowMore] = useState(open)
  const isSmartRouter = bestRoute && bestRoute?.pathFound
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState(false)
  const route = trade?.route?.path?.map((val, i) => {
    return i < trade?.route?.path?.length - 1 ? `${val.getSymbol(chainId)} > ` : val.getSymbol(chainId)
  })
  const expectedOutput = trade?.outputAmount?.toSignificant(4)
  // get custom setting values for user
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])

  return trade && swapDelay !== SwapDelay.INVALID ? (
    <Flex sx={{ ...styles.dexTradeInfoContainer }}>
      <Flex
        sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
        onClick={() => setShowMore((prev) => !prev)}
      >
        <TradePrice price={trade?.executionPrice} showInverted={showInverted} setShowInverted={setShowInverted} />
        <Flex>
          <Flex
            sx={{
              ...styles.normalRouterContainer,
              background: isSmartRouter ? 'smartGradient' : 'white4',
            }}
          >
            <Text size="8px" color={isSmartRouter ? 'primaryBright' : 'text'} weight={700}>
              {isSmartRouter ? t('Smart Router') : t('ApeSwap Router')}
            </Text>
          </Flex>
          <Svg icon="caret" direction={showMore ? 'up' : 'down'} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'fit-content' }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ opacity: 0, height: 0 }}
            sx={{ overflow: 'hidden', position: 'relative' }}
          >
            <Divider />
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px">{t('Price impact')}</Text>
              <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px">{t('Expected output')}</Text>
              <Text size="12px">
                {expectedOutput} {trade.outputAmount.currency.getSymbol(chainId)}
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px">{t('Minimum recieved')}</Text>
              <Text size="12px">
                {slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)}{' '}
                {trade.outputAmount.currency.getSymbol(chainId)}
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px">{t('Liquidity provider fee')}</Text>
              <Text size="12px">
                {realizedLPFee
                  ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.getSymbol(chainId)}`
                  : '-'}
              </Text>
            </Flex>
            {/**
             * TODO: Break this up into a component
             */}
            <Flex
              sx={{
                ...styles.bottomRouterContainer,
                background: isSmartRouter ? 'smartGradient' : 'white4',
              }}
            >
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text color={isSmartRouter ? 'primaryBright' : 'text'} size="12px" sx={{ fontWeight: '700' }}>
                  {isSmartRouter ? t('Smart Router') : t('ApeSwap Router')}
                </Text>
                <HelpIcon width="12px" color={isSmartRouter ? 'primaryBright' : 'text'} />
              </Flex>
              {isSmartRouter && (
                <Flex sx={{ justifyContent: 'space-between', height: '18px' }}>
                  <Text color="primaryBright" size="10px">
                    {t('Estimated Swap Kickback')}
                  </Text>
                  <Text color="primaryBright" size="10px">
                    {bestRoute?.summary?.searchSummary?.expectedProfit?.toFixed(6)}{' '}
                    {trade.inputAmount.currency.getSymbol(chainId)}
                  </Text>
                </Flex>
              )}
              <Flex sx={{ justifyContent: 'space-between' }}>
                <Text color={isSmartRouter ? 'primaryBright' : 'text'} size="10px">
                  {t('Route')}
                </Text>
                <Text color={isSmartRouter ? 'primaryBright' : 'text'} size="10px">
                  {route}
                </Text>
              </Flex>
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  ) : (
    <></>
  )
}

export default React.memo(DexTradeInfo)
