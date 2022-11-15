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
      <Text sx={styles.head}>{t('Prepare For Takeoff')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('You can commit with either BNB or  ')}</Text>{' '}
        <TooltipBubble
          placement={isMobile ? 'topLeft' : 'topRight'}
          transformTip={`translate(${isMobile ? '0' : '3%'}, 2%)`}
          body={
            <Flex sx={styles.tipBody}>
              {t("ApeSwap's governance token that also enables access to exclusive pools and IAO allocations")}
            </Flex>
          }
          sx={{ width: ['270px', '270px', '350px'] }}
        >
          <Text sx={{ ...styles.content, ...styles.tipTitle }}>GNANA</Text>
        </TooltipBubble>{' '}
        <Text sx={styles.content}>{t('(or both!). Select GET BNB or GET GNANA to acquire the tokens you need.')}</Text>
      </Text>
      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('Make sure you have the tokens ready for when the sale goes live!')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide2
