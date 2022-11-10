import styled from 'styled-components'
import { Flex, Input, Text } from '@apeswapfinance/uikit'

export const MainContainer = styled(Flex)`
  position: relative;
  flex-direction: column;
`

export const ClaimAllWrapper = styled(Flex)`
  width: 100%;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
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
