import React from 'react'
import { Box } from 'theme-ui'
import ProposalList from './components/ProposalList'
import { ProposalContextProvider } from '../../contexts/ProposalContext'
import SideMenu from './components/sideMenu'
import styles from './styles'

const Vote: React.FC = () => {
  return (
    <ProposalContextProvider>
      <Box sx={styles.pageWrapper}>
        <Box sx={styles.sideMenuWrapper}>
          <SideMenu />
        </Box>
        <ProposalList />
      </Box>
    </ProposalContextProvider>
  )
}

export default Vote
