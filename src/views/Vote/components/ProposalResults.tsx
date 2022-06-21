import React from 'react'
import { Box, Flex } from 'theme-ui'
import { Heading, Text, Progress } from '@ape.swap/uikit'
import styles from '../styles'

const ProposalResults: React.FC = () => {
  return (
    <Box sx={styles.proposalResultContainer}>
      <Box sx={styles.proposalInfoHeader}>
        <Heading as="h4">Results</Heading>
      </Box>
      <Box sx={styles.proposalResultBody}>
        <Flex sx={styles.proposalResultBodyItems}>
          <Text>Approve Proposal</Text>
          <Text>100%</Text>
        </Flex>
        <Progress height="15px" to={100} width="300px" />

        <Box sx={{ marginTop: '10px' }}>
          <Flex sx={styles.proposalResultBodyItems}>
            <Text>Reject Proposal</Text>
            <Text>0 GNANA 0%</Text>
          </Flex>
          <Progress height="15px" to={100} width="300px" />
        </Box>
      </Box>
    </Box>
  )
}

export default ProposalResults
