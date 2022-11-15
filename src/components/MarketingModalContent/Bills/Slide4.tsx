/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide4 = () => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 4')}</Text>
      <Text sx={styles.head}>{t('Buy')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'Input the desired amount of LPs to deposit and select BUY. Then, confirm the transaction in your wallet.',
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
        <Text sx={{ ...styles.content, fontWeight: 300 }}> {t('to add liquidity with single tokens!')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide4
