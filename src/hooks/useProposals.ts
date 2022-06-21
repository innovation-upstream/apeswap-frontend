import React, { useEffect, useState } from 'react'
import { request } from 'graphql-request'
import { ProposalContext } from '../contexts/ProposalContext'

const url = process.env.REACT_APP_SNAPSHOT_URL

const useProposals = (query: string) => {
  const { proposals, addProposals } = React.useContext(ProposalContext)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setLoading(true)
    setHasMore(true)
    request(url, query)
      .then((data) => {
        if (data.proposals.length > 1 && proposals) {
          const proposalUpdate = [...proposals, ...data.proposals]
          addProposals(proposalUpdate)
        } else {
          addProposals(data.proposals)
          if (data.proposals.length === 0) {
            setHasMore(false)
          }
        }
        setLoading(false)
      })
      .catch((e) => console.error(e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
  return { loading, hasMore }
}

export default useProposals
