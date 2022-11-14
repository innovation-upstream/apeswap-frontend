/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const Slide3 = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 3')}</Text>
      <Text sx={styles.head}>{t('Convert')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'Input the desired amount of BANANA you would like to convert, and select CONVERT. Then, confirm the transaction in your wallet.',
          )}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide3
