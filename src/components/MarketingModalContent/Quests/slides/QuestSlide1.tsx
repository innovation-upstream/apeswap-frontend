/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Heading, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const QuestSlide1 = () => {
  const { t } = useTranslation()
  return (
    <>
      <Box sx={styles.text}>
        <Heading sx={styles.first}>{t('A new challenge').toUpperCase()}</Heading>
        <Heading sx={styles.second}>{t('Hello Again, Adventurer')}</Heading>
      </Box>
      <Box sx={styles.thirdWrapper}>
        <Text sx={styles.third}>{t('This time we’re getting deep into the Telos Jungle. Will you join us?')}</Text>
        <br />
        <Text sx={styles.third}>{t('Complete simple tasks to earn amazing rewards!')}</Text>
      </Box>
    </>
  )
}

export default QuestSlide1
