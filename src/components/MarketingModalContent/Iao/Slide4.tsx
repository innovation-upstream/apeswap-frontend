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
      <Text sx={styles.step}>{t('Keep in mind')}</Text>
      <Text sx={styles.head}>{t('Overflow')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('After the sale ends, if the IAO is')}</Text>{' '}
        <TooltipBubble
          placement={isMobile ? 'topLeft' : 'topRight'}
          transformTip={`translate(${isMobile ? '0' : '-6%'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t(
                'When more than the target amount of funds are raised, all extra funds will be proportionally distributed to their owners.',
              )}
            </Flex>
          }
          sx={{ width: ['270px', '270px', '400px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>oversubscribed,</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}>{t("you'll automatically receive any excess overflow tokens.")}</Text>
      </Text>
    </Flex>
  )
}

export default Slide4
