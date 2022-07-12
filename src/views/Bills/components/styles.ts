import styled from 'styled-components'
import { Button, ArrowDropUpIcon, Flex } from '@apeswapfinance/uikit'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  links: {
    alignItems: 'center',
    display: 'flex',
    width: 90,
    height: 52.5,
    justifyContent: 'space-between',
    marginBottom: '0.3em',
  },
}

export const StyledButton = styled(Button)<{ buttonSize?: number }>`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  min-width: ${({ buttonSize }) => buttonSize || 200}px;
  height: 44px;
  ${({ theme }) => theme.mediaQueries.md} {
    min-width: ${({ buttonSize }) => buttonSize || 190}px;
  }
`

export const NextArrow = styled(ArrowDropUpIcon)`
  transform: rotate(90deg);
`

export const Container = styled(Flex)`
  position: relative;
  flex-direction: column;
  margin-top: 20px;
`
