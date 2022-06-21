import React from 'react'
import { Text, Button } from '@ape.swap/uikit'
import { Box } from 'theme-ui'
import styles from '../styles'

const ResultNotFound: React.FC = () => {
  return (
    <Box sx={styles.cardContentContainer}>
      <Box sx={styles.notFound}>
        <Text sx={{ mb: '10px' }}>Oops, we can&apos;t find any results</Text>
        <Button variant="primary">Create Proposal</Button>
      </Box>
    </Box>
  )
}

export default ResultNotFound
