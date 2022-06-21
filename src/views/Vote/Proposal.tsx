import React from 'react'
import { Box } from 'theme-ui'
import { Link } from 'react-router-dom'
import Icons, { Svg } from '@ape.swap/uikit'
import styles from './styles'
import ProposalInfo from './components/proposalInfo'
import ProposalResults from './components/ProposalResults'
import ProposalBody from './components/ProposalBody'

const Proposal: React.FC<any> = ({
  match: {
    params: { id },
  },
}) => {
  return (
    <Box sx={styles.pageWrapper}>
      <Box style={styles.propsalListWrapper}>
        <Box>
          <Link to="/vote">Back</Link>
        </Box>

        <ProposalBody />
      </Box>

      <Box sx={styles.proposalSideMenu}>
        <ProposalInfo />
        <ProposalResults />
      </Box>
    </Box>
  )
}

export default Proposal
