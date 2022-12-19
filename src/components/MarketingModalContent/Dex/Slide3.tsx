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
      <Text sx={styles.step}>{t('Step 3')}</Text>
      <Text sx={styles.head}>{t('Approve Router')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t("You'll need to APPROVE the router just once.")}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}></Text>
    </Flex>
  )
}

export default Slide2
