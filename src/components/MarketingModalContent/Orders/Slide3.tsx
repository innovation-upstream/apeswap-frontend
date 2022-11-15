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
      <Text sx={styles.head}>{t('Place Your Order')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t('Select APPROVE and click PLACE ORDER, then confirm the transaction in your wallet.')}
        </Text>
      </Text>

      <Text sx={{ ...styles.content, fontStyle: 'italic' }}>
        <Text sx={styles.content}>{t('You will see your open and past orders below!')}</Text>
      </Text>
    </Flex>
  )
}

export default Slide3
