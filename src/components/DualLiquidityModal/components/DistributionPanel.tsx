/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Svg, Text } from '@ape.swap/uikit'
import { styles } from '../styles'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'
import ServiceTokenDisplay from '../../ServiceTokenDisplay'
import { Box } from 'theme-ui'
import useIsMobile from 'hooks/useIsMobile'
import { ZapInsight } from '../types'

interface DistributionPanelProps {
  zapInsight: ZapInsight
}

const DistributionPanel: React.FC<DistributionPanelProps> = ({ zapInsight }) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const [expanded, setExpanded] = useState(false)
  const { zapFromSymbol, zapFromAmount, zapInto, shareOfPool } = zapInsight
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
        {new BigNumber(zapInto.tokenAAmount).toFixed(2)} {zapInto.tokenASymbol} &{' '}
        {new BigNumber(zapInto.tokenBAmount).toFixed(2)} {zapInto.tokenBSymbol} Pooled
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
                <ServiceTokenDisplay token1={zapFromSymbol} stakeLp={true} size={17} />
              </Box>
              <Text size="12px" sx={{ marginRight: '10px' }}>
                {(parseFloat(zapFromAmount) / 2).toFixed(3)}
              </Text>
              <Box sx={{ transform: 'rotate(270deg)' }}>
                <Svg color={'primary' as any} icon="arrow" />
              </Box>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={zapInto.tokenASymbol} stakeLp={true} size={17} />
              </Box>
              <Text size="12px">{parseFloat(zapInto.tokenAAmount).toFixed(3)}</Text>
            </Flex>
            {!isMobile && (
              <Text size="12px" sx={{ margin: '0 5px' }}>
                |
              </Text>
            )}
            <Flex sx={{ minWidth: '160px', justifyContent: 'center' }}>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={zapFromSymbol} stakeLp={true} size={17} />
              </Box>
              <Text size="12px" sx={{ marginRight: '10px' }}>
                {(parseFloat(zapFromAmount) / 2).toFixed(3)}
              </Text>
              <Box sx={{ transform: 'rotate(270deg)' }}>
                <Svg color={'primary' as any} icon="arrow" />
              </Box>
              <Box sx={{ margin: '3px' }}>
                <ServiceTokenDisplay token1={zapInto.tokenBSymbol} stakeLp={true} size={17} />
              </Box>
              <Text size="12px">{parseFloat(zapInto.tokenBAmount).toFixed(3)}</Text>
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: 'column', marginTop: '15px' }}>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {t('Share of Pool')}
              </Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {shareOfPool}
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text
                size="12px"
                sx={{ lineHeight: '18px' }}
              >{`${zapInto.tokenASymbol} per ${zapInto.tokenBSymbol}`}</Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {(parseFloat(zapInto.tokenAAmount) / parseFloat(zapInto.tokenBAmount)).toFixed(5)}
              </Text>
            </Flex>
            <Flex sx={{ justifyContent: 'space-between' }}>
              <Text
                size="12px"
                sx={{ lineHeight: '18px' }}
              >{`${zapInto.tokenBSymbol} per ${zapInto.tokenASymbol}`}</Text>
              <Text size="12px" sx={{ lineHeight: '18px' }}>
                {(parseFloat(zapInto.tokenBAmount) / parseFloat(zapInto.tokenAAmount)).toFixed(5)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default React.memo(DistributionPanel)
