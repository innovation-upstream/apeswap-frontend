import React, { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { Svg, Heading, Text, Button } from '@ape.swap/uikit'
import styles from '../styles'

const ProposalBody: React.FC = () => {
  const [shoreMore, setShowMore] = useState(false)

  return (
    <>
      <Heading as="h1">BANANA Buyback & DeFi Acquisition</Heading>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Flex sx={styles.proposalBodyProfile}>
          <Box sx={styles.proposalStatus}>
            <Text size="2">Close</Text>
          </Box>
          <Box sx={styles.cardListProfile}>{}</Box>
          <Text>ApeSwap by</Text>
          <Text>0xFAc1...D23B</Text>
          <Box sx={styles.coreLabel}>
            <Text size="1">Core</Text>
          </Box>
        </Flex>
        <Flex sx={{ alignItems: 'center', columnGap: '10px' }}>
          <Text>Share</Text>
          <Svg icon="more" />
        </Flex>
      </Flex>
      <Box sx={{ height: shoreMore ? 'auto' : '380px', overflow: 'hidden', position: 'relative' }}>
        <Text>
          Recently, the ApeSwap Core Team was approached by another entity about a potentially innovative business
          agreement. The opportunity would serve two purposes: (i) Buy back $250,000 worth of BANANA; and (ii) acquire
          an existing DeFi protocol & transition their token holders into the ApeSwap protocol. This governance proposal
          intends to outline the terms of the agreement and seek approval from our community to execute on this
          opportunity. Unfortunately, the counterparty cannot be specified by name until the governance proposal is
          decided upon, as the suggestion of the following steps may influence decision making by the 3rd-party
          protocol’s community. For the purposes of this document, the counterparty will be referred to as “The
          Protocol”. In lieu of naming The Protocol, we can highlight several key components of their platform:
          Cross-chain DeFi Protocol Native token listed on several major exchanges 5,500 token holders 9,000+ Twitter
          Followers, 3,000+ Telegram Members Current market cap of approximately $2.5M Please read on for the proposed
          arrangement with The Protocol. The Arrangement The Protocol is proposing to use $250,000 in assets taken from
          their protocol-owned liquidity sources to buy back $250,000 worth of BANANA. This money would come directly
          out of The Protocol, and not out of the ApeSwap treasury. Additionally ApeSwap would utilize $50,000 in
          BANANA, taken from reflect fees accumulated in GNANA staking pools, to add to the BANANA buy-back. The
          cumulative $300,000 in BANANA tokens would then be distributed to The Protocol’s token holders to “convert
          them” to BANANA holders. This would be done through an airdrop system where The Protocol token holders would
          be given through airdrops over a 30 day vesting period. Once complete, The Protocol would change all social
          media accounts and domain names to redirect to ApeSwap or clearly link to information about the acquisition.
          Public information about the arrangement would be published to the ApeSwap Medium and social media channels.
          What is not in scope: The ApeSwap Team will not maintain the protocol in any capacity. Instead, it will sunset
          in favor of the ApeSwap protocol. None of the rewards provided in this agreement will go to the team of The
          Protocol. The end users were aiming to acquire will receive all rewards. ApeSwap retains the option of
          utilizing the existing protocol’s codebases for future projects. Voting Options Option 1: Approve Proposal A
          vote to approve the proposal authorizes the ApeSwap Core Team to move forward with the proposal, and begin the
          transition of The Protocol’s user base from their platform to the ApeSwap protocol. Option 2: Reject Proposal
          A vote to reject the proposal would direct the ApeSwap Core Team to not move forward in transitioning The
          Protocol’s users into the ApeSwap protocol. The $50,000 BANANA buy-back using reflect fees from GNANA staking
          pools would not commence, no BANANA tokens would be distributed to members of The Protocol, and the ApeSwap
          Core Team would not acquire The Protocol’s codebases.
        </Text>
        <Box sx={{ display: shoreMore ? 'none' : 'block', ...styles.expandBodyText }}>{}</Box>
        <Flex
          sx={{
            position: shoreMore ? 'relative' : 'absolute',
            bottom: '0px',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Button variant="secondary" onClick={() => setShowMore(!shoreMore)}>
            Show More
          </Button>
        </Flex>
      </Box>

      <Box sx={{ marginTop: '10px' }}>
        <Heading as="h3">Discussion</Heading>
        <Flex sx={styles.discussion}>
          <Box sx={styles.cardListProfile}>{}</Box>
          <Box sx={{ width: '90%' }}>
            <Text>ApeSwap Governance Proposal 18: Recently, the ApeSwap...</Text>
            <Box sx={{ marginTop: '5px' }}>19 votes and 15 comments so far on Reddit</Box>
          </Box>
        </Flex>
      </Box>

      <Box sx={styles.votesContainer}>
        <Flex sx={{ alignItems: 'center', ...styles.voteItems, justifyContent: 'start', columnGap: '20px' }}>
          <Text>Votes</Text>
          <Flex sx={styles.votesIconContainer}>
            <Text size="0">32</Text>
          </Flex>
        </Flex>
        <Flex sx={styles.voteItems}>
          <Flex sx={{ columnGap: '10px', alignItems: 'center' }}>
            <Flex sx={styles.votesIconContainer}>{}</Flex>
            <Text>0xF71C...b4aA</Text>
          </Flex>
          <Box>Approve Proposal</Box>
          <Flex>
            <Text>18K GNANA</Text>
          </Flex>
        </Flex>
        <Flex sx={styles.voteItems}>
          <Flex sx={{ columnGap: '10px', alignItems: 'center' }}>
            <Flex sx={styles.votesIconContainer}>{}</Flex>
            <Text>0xF71C...b4aA</Text>
          </Flex>
          <Box>Approve Proposal</Box>
          <Flex>
            <Text>18K GNANA</Text>
          </Flex>
        </Flex>
        <Flex sx={{ ...styles.voteItems, justifyContent: 'center' }}>
          <Button variant="text">See more</Button>
        </Flex>
      </Box>
    </>
  )
}

export default ProposalBody
