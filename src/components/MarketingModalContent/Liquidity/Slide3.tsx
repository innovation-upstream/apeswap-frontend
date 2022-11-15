/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide3 = () => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 3')}</Text>
      <Text sx={styles.head}>{t('Confirm Add Liquidity')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'Select ADD LIQUIDITY, click CONFIRM and approve the transaction in your wallet. You will receive your liquidity provider (LP) tokes shortly.',
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

export default Slide3
