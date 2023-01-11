import styled from 'styled-components'
import { Button, ArrowDropUpIcon, Flex } from '@apeswapfinance/uikit'

export const FarmButton = styled(Button)`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: 129px;
  height: 44px;
  justify-content: space-evenly;
`

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
  margin: 0 3px;
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: inherit;
  }
`

export const Container = styled(Flex)`
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`
