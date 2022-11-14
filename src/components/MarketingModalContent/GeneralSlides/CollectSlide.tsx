/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const CollectSlide = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 4')}</Text>
      <Text sx={styles.head}>{t('Collect!')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t("Don't forget to HARVEST your earnings periodically. You can reinvest them or cash out at any time!")}
        </Text>
      </Text>
    </Flex>
  )
}

export default CollectSlide
