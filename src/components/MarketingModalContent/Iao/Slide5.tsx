/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text, TooltipBubble, useMatchBreakpoints } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide5 = () => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 4')}</Text>
      <Text sx={styles.head}>{t('Claim')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('The tokens will')}</Text>{' '}
        <TooltipBubble
          placement={'topRight'}
          transformTip={`translate(${isMobile ? '2%' : '-3%'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t(
                'Tokens become available incrementally over time, starting immediately after the sale, and ending when the vesting period is completed.',
              )}
            </Flex>
          }
          sx={{ width: ['210px', '210px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>vest linearly</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}>
          {t('until the end of the vesting period. You can CLAIM as you earn, or all at once after fully vested.')}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide5
