import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
`

export const AuctionCardsWrapper = styled.div`
  display: flex;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  & > div {
    flex: 1;
    overflow: hidden;
  }
`
export const SplitWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 12px 0;
  flex: 1;
  overflow: hidden;
`

export const MoreInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 790px;
    justify-content: flex-start;
  }
`
