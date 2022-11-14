/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide2 = () => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 2')}</Text>
      <Text sx={styles.head}>{t('Get Tokens')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'Open the desired Maximizer and click GET LP or GET BANANA. This will allow you to easily obtain tokens to stake.',
          )}
        </Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={{ ...styles.content, fontWeight: 300 }}>{t('⚡NEW: You can also')}</Text>{' '}
        <TooltipBubble
          placement={'topRight'}
          transformTip={`translate(${isMobile ? '10%' : '6%'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t('Convert one token directly into an LP token or other product in a single transaction.')}
            </Flex>
          }
          sx={{ width: ['210px', '210px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>ZAP</Text>
        </TooltipBubble>{' '}
        <Text sx={{ ...styles.content, fontWeight: 300 }}> {t('to')}</Text>{' '}
        <TooltipBubble
          placement={'topLeft'}
          transformTip={`translate(${isMobile ? '10%' : '0'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t('Contribute equal amounts of two tokens to the DEX to facilitate swaps between them.')}
            </Flex>
          }
          sx={{ width: ['240px', '240px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>add liquidity</Text>
        </TooltipBubble>{' '}
        <Text sx={{ ...styles.content, fontWeight: 300 }}> {t('with single tokens!')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide2
