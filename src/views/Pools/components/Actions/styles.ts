import { Button } from '@ape.swap/uikit'
import styled from '@emotion/styled'

export const StyledButtonSquare = styled(Button)<{ height?: string }>`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 20px;
  width: 100%;
  height: ${({ height }) => height || '44px'};
  justify-content: center;
`

export const SmallButtonSquare = styled(Button)`
  max-width: 60px;
  width: 100%;
  min-width: 44px;
  height: 44px;
`
