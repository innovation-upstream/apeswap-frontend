import styled, { keyframes } from 'styled-components'

const ExpandLargeAnimation = keyframes`
    0%{height: 0;}
    100%{height: 150px;}
`

export const ExpandedContainer = styled('div')<{ size?: number; justifyContent?: string }>`
  flex-direction: column;
  margin-top: 20px;
  animation: ${ExpandLargeAnimation} 0.3s ease;
  overflow: hidden;
`
