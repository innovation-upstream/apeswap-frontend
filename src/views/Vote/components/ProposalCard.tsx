import React from 'react'
import { Box, Text as ThemeuiText } from 'theme-ui'
import { Link } from 'react-router-dom'
import { Flex, Text, Heading, Svg, Link as UikitLink } from '@ape.swap/uikit'
import styles from '../styles'

interface proposalProps {
  proposal: {
    id?: string
    title?: string
    author?: string
    body?: string
    state?: string
  }
}

const ProposalCard: React.FC<proposalProps> = ({ proposal: { id, title, body, state } }, ...props) => {
  const accountEllipsis = `${id.substring(0, 5)}...${id.substring(id.length - 4)}`
  const bodyEllipsis = (content: string) => `${content.substring(0, 140)}...`

  return (
    <Link to={{ pathname: `vote/proposal/${id}` }} style={{ textDecoration: 'none' }}>
      <Box sx={styles.cardContentContainer}>
        <Flex sx={styles.cardContentProfile}>
          <Flex sx={styles.listProfileWrapper}>
            <Box sx={styles.cardListProfile}>{}</Box>
            <Flex sx={styles.listProfileWrapper}>
              <ThemeuiText sx={{ display: ['none', 'block'] }}>Apeswap</ThemeuiText> by
              <UikitLink href="https://github.com" target="_blank" style={{ textDecoration: 'none' }}>
                <Text>{accountEllipsis}</Text>
                <Box sx={styles.coreLabel}>
                  <Text size="1">Core</Text>
                </Box>
              </UikitLink>
            </Flex>
          </Flex>
          <Box sx={styles.proposalStatus}>
            <Text size="2">{state}</Text>
          </Box>
        </Flex>

        <Heading as="h3">{title}</Heading>
        <Box sx={styles.cardTextContent}>
          <Text>{bodyEllipsis(body)}</Text>
        </Box>
        <Flex sx={styles.cardListFooter}>
          <Svg color="success" icon="success" width="18px" />
          <Text>Approve Proposal - 407K GNANA</Text>
        </Flex>
      </Box>
    </Link>
  )
}

export default ProposalCard
