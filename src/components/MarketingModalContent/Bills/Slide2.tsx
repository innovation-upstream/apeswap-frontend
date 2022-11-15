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
      <Text sx={styles.head}>{t('Select & Enable')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t('Click or tap BUY on the desired Bill and ENABLE it. Then, approve the transaction in your wallet.')}
        </Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t("You'll see the tokens' discount compared to market price.")}</Text>
      </Text>
    </Flex>
  )
}

export default Slide2
