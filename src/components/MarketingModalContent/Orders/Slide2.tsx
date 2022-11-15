/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide2 = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 2')}</Text>
      <Text sx={styles.head}>{t('Set Conditions')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'Select the tokens you want to trade and enter your preferred amount. Then, enter the price at which you want to trade',
          )}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide2
