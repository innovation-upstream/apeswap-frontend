import React, { useState, useRef, useCallback } from 'react'
import { Heading, Select, SelectItem, Text } from '@ape.swap/uikit'
import { Box } from 'theme-ui'
import ProposalCard from './ProposalCard'
import useProposals from '../../../hooks/useProposals'
import { ProposalContext } from '../../../contexts/ProposalContext'
import { getProposals } from '../gqlQueries/getProposals'
import Loader from './Loading'
import ResultNotFound from './NoResult'
import styles from '../styles'

const proposalStatus = ['All', 'Active', 'Pending', 'Closed', 'Core']
const pageCount = 10

const ProposalList: React.FC = () => {
  const [activeState, setActiveState] = useState(proposalStatus[0])
  const [pagination, setPagination] = useState({ currentPage: pageCount, prevPage: 0 })

  const { proposals: proposalData, addProposals } = React.useContext(ProposalContext)

  const query = getProposals({
    currentPage: pagination.currentPage,
    prevPage: pagination.prevPage,
    state: activeState,
  })
  const { loading, hasMore } = useProposals(query)

  const observer = useRef(null)
  const lastProposalRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) {
        observer.current.disconnect()
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPagination((prev) => ({
            currentPage: prev.currentPage + pageCount,
            prevPage: prev.prevPage + pageCount,
          }))
        }
      })
      if (node) {
        observer.current.observe(node)
      }
    },
    [loading, hasMore],
  )

  const filterProposals = (e: any) => {
    addProposals(null)
    setActiveState(e.target.value)
    setPagination({
      currentPage: pageCount,
      prevPage: 0,
    })
  }

  return (
    <Box sx={styles.propsalListWrapper}>
      {!loading && (
        <Box sx={styles.listHeaderSection}>
          <Heading as="h2">Proposals</Heading>

          <Box sx={styles.statusSelectContainer}>
            <Select active={activeState} size="md" width="fit-content" onChange={filterProposals}>
              {proposalStatus.map((item) => {
                return (
                  <SelectItem key={item} value={item}>
                    <Text>{item}</Text>
                  </SelectItem>
                )
              })}
            </Select>
          </Box>
        </Box>
      )}

      <Box sx={styles.cardWrapper}>
        {proposalData &&
          proposalData.length > 0 &&
          proposalData.map((proposal, index) => {
            if (proposalData.length === index + 1) {
              return (
                <Box ref={lastProposalRef}>
                  <ProposalCard key={proposal.id} proposal={proposal} />
                </Box>
              )
            }
            return <ProposalCard key={proposal.id} proposal={proposal} />
          })}
      </Box>
      {proposalData && proposalData.length === 0 && !loading && <ResultNotFound />}
      {loading && <Loader />}
    </Box>
  )
}

export default ProposalList
