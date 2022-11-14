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
      <Text sx={styles.step}>{t('Heads up, Apes!')}</Text>
      <Text sx={styles.head}>{t('Conversion Fee')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('Converting from BANANA to GNANA involves paying a 28% burn fee and a 2%')}</Text>{' '}
        <TooltipBubble
          placement={isMobile ? 'topLeft' : 'topRight'}
          transformTip="translate(0, 2%)"
          body={
            <Flex sx={styles.tipBody}>
              {t(
                'A fee charged when transferring a reflect token, that is then redistributed among the token holders.',
              )}
            </Flex>
          }
          sx={{ width: ['250px', '250px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>reflect fee</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}>{t('for a total cost of 30%')}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('(For every 1 BANANA you convert, you will receive 0.7 GNANA)')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide4
