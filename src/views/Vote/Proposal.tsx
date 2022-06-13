import React from 'react'

const Proposal: React.FC<any> = ({
  match: {
    params: { id },
  },
}) => {
  return <div>Proposal {id}</div>
}

export default Proposal
