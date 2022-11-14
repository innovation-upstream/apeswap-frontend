/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const StakeSlide = () => {
  const { t } = useTranslation()
  const farm = window.location.pathname.includes('farms')

  return (
    <Flex sx={styles.container}>
      <Text sx={styles.step}>{t('Step 3')}</Text>
      <Text sx={styles.head}>{t('Stake')}</Text>

      <Text sx={styles.content}>
        <Text sx={styles.content}>
          {t(
            `Once you have the ${farm ? 'LP' : ''} tokens, ENABLE your desired ${
              farm ? 'Farm' : 'Pool'
            } and then click DEPOSIT to stake and start earning`,
          )}
        </Text>
      </Text>
    </Flex>
  )
}

export default StakeSlide
