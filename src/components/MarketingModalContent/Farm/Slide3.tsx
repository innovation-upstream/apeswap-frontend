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
      <Text sx={styles.head}>{t('Stake')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t('Once you have the LP tokens, ENABLE your desired Farm and then click DEPOSIT to stake and start earning')}
        </Text>
      </Text>
    </Flex>
  )
}

export default Slide3
