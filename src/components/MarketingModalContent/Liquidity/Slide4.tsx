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
      <Text sx={styles.head}>{t('Enjoy The Rewards!')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('You are now earning')}</Text>{' '}
        <TooltipBubble
          placement={'topRight'}
          transformTip={`translate(${isMobile ? '8%' : '5%'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t(
                'LP token holders receive a portion of the fees charged when swaps occur between the tokens that comprise that LP.',
              )}
            </Flex>
          }
          sx={{ width: ['210px', '210px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>fees</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}>
          {t('for each transaction that uses this pair of tokens on the network. Some LPs can also be staked on')}
        </Text>{' '}
        <Text sx={styles.yellow}>
          <a href="https://apeswap.finance/banana-farms" target="_blank" rel="noreferrer noopener">
            {t('Yield Farms')}
          </a>
        </Text>{' '}
        <Text sx={styles.content}>{t('or')}</Text>{' '}
        <Text sx={styles.yellow}>
          <a href="https://apeswap.finance/maximizers" target="_blank" rel="noreferrer noopener">
            {t('BANANA Maximizers')}
          </a>
        </Text>{' '}
        <Text sx={styles.content}>{t('for additional rewards!')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide4
