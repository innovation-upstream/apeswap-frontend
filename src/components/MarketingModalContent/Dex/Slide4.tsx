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
      <Text sx={styles.head}>{t('Confirm The Swap!')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            'Select SWAP and click CONFIRM SWAP. Approve the transaction in your wallet. In a few seconds, the trade will go through and you will receive your output tokens.',
          )}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide4
