/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Heading, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const QuestSlide3 = () => {
  const { t } = useTranslation()
  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Box sx={styles.text}>
        <Heading as="h5" color="yellow" style={{ fontSize: '12px' }}>
          {t('Get it done').toUpperCase()}
        </Heading>
        <Heading>{t('Can You Complete Them All?')}</Heading>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Text size="14px">{t('Complete the Quests - the more you complete, the more chances you get!')}</Text>
      </Box>
    </Box>
  )
}

export default QuestSlide3
