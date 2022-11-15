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
      <Text sx={styles.head}>{t('Get BANANA')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>{t('In order to convert into GNANA, you must first hold BANANA.')}</Text>{' '}
        <Text sx={styles.yellow}>
          <a href="https://apeswap.finance/swap" target="_blank" rel="noreferrer noopener">
            {t('Click here')}
          </a>
        </Text>{' '}
        <Text sx={styles.content}>{t('to trade any of your tokens for BANANA!')}</Text>{' '}
      </Text>
    </Flex>
  )
}

export default Slide2
