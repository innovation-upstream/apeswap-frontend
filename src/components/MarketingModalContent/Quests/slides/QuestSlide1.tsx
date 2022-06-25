/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Heading, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const QuestSlide1 = () => {
  const { t } = useTranslation()
  return (
    <Box>
      <Box sx={styles.text}>
        <Heading as="h5" color="yellow" style={{ fontSize: '12px' }}>
          {t("Let's get started").toUpperCase()}
        </Heading>
        <Heading>{t('Hello, Crypto Adventurer.')}</Heading>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Text size="14px">{t('Complete the introductory Quests to earn great rewards while you learn!')}</Text>
      </Box>
    </Box>
  )
}

export default QuestSlide1
