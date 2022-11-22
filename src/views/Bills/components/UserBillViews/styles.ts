import { Card, Flex, Text, Input } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  links: {
    alignItems: 'center',
    display: 'flex',
    width: 'max-content',
    justifyContent: 'space-between',
    marginBottom: '0.3em',
  },
  input: {
    borderRadius: '10px',
    fontWeight: 800,
    border: 'none',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '170px',
    },
    '@media screen and (min-width: 1000px)': {
      width: '240px',
    },
  },
}

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 270px;
  max-height: 307px;
  align-items: center;
  margin: 0 0 16px 12px;
`

export const BillsImage = styled.div<{ image?: string }>`
  width: 270px;
  height: 150px;
  background-image: ${({ image }) => `url(${image});`}
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 8px;
`

export const BillCardsContainer = styled(Flex)`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-around;
`

export const FirstTimeCardContainer = styled(Flex)`
  max-width: 500px;
  height: auto;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  padding: 10px 20px;
  flex-direction: column;
  align-self: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 410px;
    max-width: 100%;
    align-self: auto;
  }
`

export const BillGifContainer = styled(Flex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 620px;
    width: 100%;
  }
`

export const DescriptionContainer = styled(Flex)`
  flex-direction: column;
  padding-left: 20px;
  padding: 21px 0px 20px 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 530px;
  }
`

export const BillDiagramContainer = styled(Flex)`
  margin-top: 10px;
`

export const ControlContainer = styled(Flex)`
  align-items: center;
  position: relative;
  flex-wrap: wrap;
  border-radius: 10px;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px 20px;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.white2};
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  align-self: center;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
    max-width: 100%;
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

export const SearchText = styled(Text)`
  font-weight: 700;
  font-size: 16px !important;
  display: none;
  align-items: center;
  @media screen and (min-width: 1050px) {
    display: inherit;
  }
`

export const ClaimAllWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`
