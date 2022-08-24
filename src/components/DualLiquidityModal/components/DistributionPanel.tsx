/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { styles } from '../styles'
import { useTranslation } from 'contexts/Localization'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import { Box } from 'theme-ui'
import useIsMobile from 'hooks/useIsMobile'
import { MergedZap } from '../../../state/zap/actions'
import { ONE_BIPS } from '../../../config/constants'
import { JSBI, Percent, Token, TokenAmount } from '@ape.swap/sdk'
import FormattedPriceImpact from '../../../views/LegacyOrders/components/FormattedPriceImpact'

interface DistributionPanelProps {
  zap: MergedZap
}

const DistributionPanel: React.FC<DistributionPanelProps> = ({ zap }) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [expanded, setExpanded] = useState(false)
  const { chainId, currencyIn, currencyOut1, currencyOut2, pairOut } = zap

  return (
    <Flex sx={styles.distributionPanelContainer}>
      <Flex sx={styles.panelTopContainer}>
        <Text sx={styles.swapDirectionText}>{t('Distribution')}:</Text>
      </Flex>
      <Flex
        sx={{
          fontSize: '12px',
          lineHeight: '18px',
          justifyContent: 'space-between',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {currencyOut1?.outputAmount?.toSignificant(5)} {currencyOut1?.outputCurrency?.symbol} &{' '}
        {currencyOut2?.outputAmount?.toSignificant(5)} {currencyOut2?.outputCurrency?.symbol} Pooled
        <Svg icon="caret" direction={expanded ? 'up' : 'down'} width="10px" />
      </Flex>
      {expanded && (
        <Flex sx={{ flexDirection: 'column', marginTop: '20px' }}>
          <Flex sx={{ width: '100%' }}>
            <Text size="12px">{t('Converted to')}:</Text>
          </Flex>
          <Flex sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <Flex sx={{ minWidth: '160px', justifyContent: 'center' }}>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={currencyIn?.currency?.getSymbol(chainId)} stakeLp={true} size={17} />
              </Box>
              <Text size="12px" sx={{ marginRight: '15px' }}>
                {new TokenAmount(currencyIn?.currency as Token, currencyIn?.inputAmount)
                  .divide(JSBI.BigInt(2))
                  .toSignificant(5)}
              </Text>
              <Box sx={{ transform: 'rotate(270deg)' }}>
                <Svg color={'primary' as any} icon="arrow" />
              </Box>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={currencyOut1?.outputCurrency?.symbol} stakeLp={true} size={17} />
              </Box>
              <Text size="12px">{currencyOut1?.outputAmount?.toSignificant(5)}</Text>
            </Flex>
            {!isMobile && (
              <Text size="12px" sx={{ margin: '0 5px' }}>
                |
              </Text>
            )}
            <Flex sx={{ minWidth: '160px', justifyContent: 'center' }}>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={currencyIn?.currency?.getSymbol(chainId)} stakeLp={true} size={17} />
              </Box>
              <Text size="12px" sx={{ marginRight: '15px' }}>
                {new TokenAmount(currencyIn?.currency as Token, currencyIn?.inputAmount)
                  .divide(JSBI.BigInt(2))
                  .toSignificant(5)}
              </Text>
              <Box sx={{ transform: 'rotate(270deg)' }}>
                <Svg color={'primary' as any} icon="arrow" />
              </Box>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={currencyOut2?.outputCurrency?.symbol} stakeLp={true} size={17} />
              </Box>
              <Text size="12px">{currencyOut2?.outputAmount?.toSignificant(5)}</Text>
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: 'column', marginTop: '15px' }}>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {t('Price Impact')}
              </Text>
              <FormattedPriceImpact priceImpact={new Percent(JSBI.BigInt(1), JSBI.BigInt(100000))} />
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {t('Liquidity Provider Fee')}
              </Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {t('Liquidity Provider Fee')}
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {t('Share of Pool')}
              </Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {(pairOut?.poolTokenPercentage?.lessThan(ONE_BIPS)
                  ? '<0.01'
                  : pairOut?.poolTokenPercentage?.toFixed(2)) ?? '0'}
                %
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text
                size="12px"
                sx={{ lineHeight: '18px' }}
              >{`${currencyOut1?.outputCurrency?.symbol} per ${currencyOut2?.outputCurrency?.symbol}`}</Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {currencyOut1?.outputAmount?.divide(currencyOut2?.outputAmount).toSignificant(5)}
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text
                size="12px"
                sx={{ lineHeight: '18px' }}
              >{`${currencyOut2?.outputCurrency?.symbol} per ${currencyOut1.outputCurrency.symbol}`}</Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {currencyOut2?.outputAmount?.divide(currencyOut1?.outputAmount).toSignificant(5)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(DistributionPanel)
