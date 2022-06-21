import { gql } from 'graphql-request'

interface IParams {
  currentPage: number
  prevPage: number
  state?: string
}

export const getProposals = ({ currentPage, prevPage, state }: IParams) => {
  const selectedState = state ? state.toLowerCase() : 'all'
  return gql`
  {
    proposals(
      first: ${currentPage}
      skip: ${prevPage}
      where: { space_in: ["yam.eth"], state: "${selectedState}" }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      snapshot
      state
      scores
      scores_by_strategy
      scores_total
      scores_updated
      author
      space {
        id
        name
      }
    }
  }
`
}

export const singleProposal = (id: string) => {
  return gql`
    {
      proposal(id: "${id}") {
        id
        title
        body
        choices
        start
        end
        snapshot
        state
        author
        created
        scores
        scores_by_strategy
        scores_total
        scores_updated
        plugins
        network
        strategies {
          name
          network
          params
        }
        space {
          id
          name
        }
      }
    }
  `
}
