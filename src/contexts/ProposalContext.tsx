import React, { useState } from 'react'

interface IProposals {
  proposals: any[]
  addProposals: (proposals: any) => void
}

const ProposalContext = React.createContext<IProposals | null>(null)

const ProposalContextProvider = ({ children }) => {
  const [proposals, setProposals] = useState(null)

  const addProposals = (newProposals: any[]) => {
    setProposals(newProposals)
  }

  return <ProposalContext.Provider value={{ proposals, addProposals }}>{children}</ProposalContext.Provider>
}

export { ProposalContext, ProposalContextProvider }
