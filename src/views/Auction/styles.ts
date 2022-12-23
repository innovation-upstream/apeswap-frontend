import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
`

export const AuctionCardsWrapper = styled.div`
  margin-top: 50px;
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
  position: absolute;
  width: 100%;
  right: 0;
  height: 60px;
  display: flex;
  flex-wrap: wrap-reverse;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
