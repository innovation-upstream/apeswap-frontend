import React from 'react'
import { Box } from 'theme-ui'
import styles from '../styles'

const Loading: React.FC = () => {
  return (
    <Box sx={styles.cardContentContainer}>
      <Box sx={styles.loading}>
        <Box />
        <Box />
      </Box>
    </Box>
  )
}

export default Loading
