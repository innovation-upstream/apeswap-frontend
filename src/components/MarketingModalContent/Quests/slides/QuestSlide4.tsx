/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { Heading, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'

const QuestSlide4 = () => {
  const { t } = useTranslation()
  return (
    <Box sx={{ marginBottom: '20px' }}>
      <Box sx={styles.text}>
        <Heading as="h5" color="yellow" style={{ fontSize: '12px' }}>
          {t('Ready, steady, go').toUpperCase()}
        </Heading>
        <Heading>{t('Congratulations!')}</Heading>
      </Box>
      <Box sx={{ marginTop: '10px' }}>
        <Text size="14px">{t('You are officialy ready to begin your DeFi journey with ApeSwap. Good luck!')}</Text>
      </Box>
    </Box>
  )
}

export default QuestSlide4
