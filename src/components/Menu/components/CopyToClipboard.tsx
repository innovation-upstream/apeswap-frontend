import React, { useState } from 'react'
import styled from 'styled-components'
import { Text } from '@innovationupstream/apeswap-uikit'
import { CopyIcon } from '../../Icons'

interface Props {
  toCopy?: string | number
}

const StyleButton = styled(Text).attrs({ role: 'button' })`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ fontWeight = 600 }) => fontWeight};
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'block' : 'none')};
  position: absolute;
  bottom: -22px;
  right: 0;
  left: 0;
  text-align: center;
  font-family: poppins;
  font-weight: 700;
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.primaryBright : theme.colors.white4)};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 16px;
  opacity: 0.7;
`

const CopyToClipboard: React.FC<Props> = ({ toCopy, children, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  return (
    <StyleButton
      small
      onClick={() => {
        navigator.clipboard.writeText(JSON.stringify(toCopy))
        setIsTooltipDisplayed(true)
        setTimeout(() => {
          setIsTooltipDisplayed(false)
        }, 1000)
      }}
      {...props}
    >
      {children}
      <CopyIcon />
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </StyleButton>
  )
}

CopyToClipboard.defaultProps = {
  toCopy: '',
}

export default CopyToClipboard
