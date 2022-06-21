import React from 'react'
import { Box, Flex } from 'theme-ui'
import { Svg, Heading, Text } from '@ape.swap/uikit'
import styles from '../styles'

const ProposalInfo: React.FC = () => {
  return (
    <Box sx={styles.proposalInfoContainer}>
      <Box sx={styles.proposalInfoHeader}>
        <Heading as="h4">Information</Heading>
      </Box>
      <Box sx={styles.proposalInfoBody}>
        <Flex sx={styles.proposalInfoBodyItems}>
          <Text weight="bold">Strategie(s)</Text>
          <Box sx={styles.cardListProfile}>{}</Box>
        </Flex>
        <Flex sx={styles.proposalInfoBodyItems}>
          <Text weight="bold">IPFS</Text>
          <a href="https://www.ee.com" target="_blank" rel="noreferrer">
            <Text>#QmXQXVF </Text>
            <Svg icon="external" />
          </a>
        </Flex>
        <Flex sx={styles.proposalInfoBodyItems}>
          <Text weight="bold">Voting system</Text>
          <Text>Single choice voting</Text>
        </Flex>
        <Flex sx={styles.proposalInfoBodyItems}>
          <Text weight="bold">Start date</Text>
          <Text>Apr 17, 2022, 11:00 PM</Text>
        </Flex>
        <Flex sx={styles.proposalInfoBodyItems}>
          <Text weight="bold">End date</Text>
          <Text>Apr 19, 2022, 11:00 PM</Text>
        </Flex>
        <Flex sx={styles.proposalInfoBodyItems}>
          <Text weight="bold">Snapshot</Text>
          <a href="https://www.ee.com" target="_blank" rel="noreferrer">
            <Text>17,035,964 </Text>
            <Svg icon="external" />
          </a>
        </Flex>
      </Box>
    </Box>
  )
}

export default ProposalInfo
