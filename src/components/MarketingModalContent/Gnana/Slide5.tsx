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
      <Text sx={styles.head}>{t("You're Golden!")}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t('Enjoy your new, shiny GNANA! You can now access exclusive pools, hold them to earn')}
        </Text>{' '}
        <TooltipBubble
          placement={isMobile ? 'topLeft' : 'topRight'}
          transformTip="translate(0%, 2%)"
          body={
            <Flex sx={styles.tipBody}>
              {t(
                'A fee charged when transferring a reflect token, that is then redistributed among the token holders.',
              )}
            </Flex>
          }
          sx={{ width: ['230px', '230px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>reflect fees,</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}> {t('or participate in GNANA IAOs.')}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('Additionally, you can now vote in the')}</Text>{' '}
        <TooltipBubble
          placement={isMobile ? 'topLeft' : 'topRight'}
          transformTip={`translate(${isMobile ? '-3%' : '3%'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t('Convert one token directly into an LP token or other product in a single transaction.')}
            </Flex>
          }
          sx={{ width: ['275px', '275px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>DAO&apos;s</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.yellow}>
          <a href={'void'} target="_blank" rel="noreferrer noopener">
            {t('Governance!')}
          </a>
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide5
