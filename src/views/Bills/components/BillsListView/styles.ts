import styled from '@emotion/styled'
import { Flex, Input, Text } from '@apeswapfinance/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const MainContainer = styled(Flex)`
  position: relative;
  flex-direction: column;
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
    min-height: 59px;
    padding: 0px 10px;
    align-items: center;
    max-width: 100%;
    height: auto;
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

export const styles: Record<string, ThemeUIStyleObject> = {
  input: {
    borderRadius: '10px',
    fontWeight: 800,
    border: 'none',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '165px',
    },
    '@media screen and (min-width: 1000px)': {
      width: '240px',
    },
  },
}
