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
}

export const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  min-width: 270px;
  max-height: 307px;
  height: 307px;
  align-items: center;
  margin-left: 16px;
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
  height: 307px;
  flex-direction: row;
  overflow: hidden;
  margin-bottom: 20px;
  & :nth-child(1) {
    margin-left: 0px;
  }
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

export const BillGifImage = styled.div<{ image?: string }>`
  width: 270px;
  height: 150px;
  background-image: url(/images/bills-gif.gif);
  background-repeat: no-repeat;
  background-size: contain;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 606px;
    max-height: 341px;
    height: 100%;
    width: 100%;
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
  padding: 15px;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.white2};
  min-width: 300px;
  max-width: 500px;
  width: 100%;
  align-self: center;
  height: 225px;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 180px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    min-height: 59px;
    height: 100%;
    padding: 0px 50px 0px 30px;
    align-items: center;
    max-width: 100%;
    height: auto;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding: 0px 50px 0px 30px;
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

export const StyledText = styled(Text)`
  font-weight: 700;
  font-size: 16px !important;
`

export const ClaimAllWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

export const Container = styled.div<{ toggled: boolean }>``

export const StyledInput = styled(Input)`
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white3};
  font-weight: 800;
  border: none;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 180px;
  }
  @media screen and (min-width: 900px) {
    width: 200px;
  }
  @media screen and (min-width: 1000px) {
    width: 300px;
  }
`
