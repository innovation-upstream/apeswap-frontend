/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide4 = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 4')}</Text>
      <Text sx={styles.head}>{t('Hold Tight!')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('Wait for your order to execute, or cancel it at any time.')}</Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>
          {t(
            "Remember: you'll need to be holding the funds for the trade to be successful once the market price reaches the price you set.",
          )}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide4
