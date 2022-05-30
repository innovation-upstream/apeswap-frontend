/** @jsxImportSource theme-ui */
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { Trade } from '@apeswapfinance/sdk'
import { useTranslation } from 'contexts/Localization'
import React, { useMemo, useState } from 'react'
import { Divider } from 'theme-ui'
import { Field } from 'state/swap/actions'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import TradePrice from 'views/Orders/components/TradePrice'
import FormattedPriceImpact from 'views/Orders/components/FormattedPriceImpact'
import { AnimatePresence, motion } from 'framer-motion'
import { computeTradePriceBreakdown, computeSlippageAdjustedAmounts } from 'utils/prices'
import { styles } from './styles'

const DexTradeInfo: React.FC<{ trade: Trade; allowedSlippage: number }> = ({ trade, allowedSlippage }) => {
  const { chainId } = useActiveWeb3React()
  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()
  const [showInverted, setShowInverted] = useState(false)
  // get custom setting values for user
  const slippageAdjustedAmounts = useMemo(
    () => computeSlippageAdjustedAmounts(trade, allowedSlippage),
    [allowedSlippage, trade],
  )
  const { priceImpactWithoutFee, realizedLPFee } = useMemo(() => computeTradePriceBreakdown(trade), [trade])

  console.log(trade)
  return trade ? (
    <Flex sx={{ ...styles.dexTradeInfoContainer }}>
      <Flex sx={{ width: '100%', justifyContent: 'space-between' }} onClick={() => setShowMore((prev) => !prev)}>
        <TradePrice price={trade?.executionPrice} showInverted={showInverted} setShowInverted={setShowInverted} />
        <Svg icon="caret" direction={showMore ? 'up' : 'down'} />
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
                {slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)}{' '}
                {trade.outputAmount.currency.getSymbol(chainId)}
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
              <Text size="12px">Price Impact</Text>
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
