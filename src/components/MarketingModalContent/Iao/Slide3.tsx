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
      <Text sx={styles.head}>{t('3, 2, 1... Commit!')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t('Once the IAO goes live, input the desired amount of tokens to commit and select CONTRIBUTE')}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide3
