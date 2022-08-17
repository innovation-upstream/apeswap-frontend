import React from 'react'
import { Button, Link, Text, TwitterIcon } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'

const StyledButton = styled(Button)`
  height: 100%;
  max-height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-transform: capitalize;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white3};
  transition: all 0.2s ease;

  :hover {
    background: ${({ theme }) => theme.colors.white3} !important;
    filter: brightness(1.25);
  }
`

export const ShareButton: React.FC = () => {
  const { theme } = useTheme()

  return (
    <Link
      href="https://twitter.com/compose/tweet?text=Some%20text%20about%20the%20new%20Stats%20Page%0Ahttps%3A%2F%2Fapeswap.finance%2Fstats%20on%20%40ape_swap"
      target="_blank"
      style={{ textDecoration: 'none', width: '100%', maxWidth: '107px', marginLeft: '10px' }}
    >
      <StyledButton startIcon={<TwitterIcon color={theme.colors.white4} fill={theme.colors.text} />}>
        <Text paddingRight="16px" fontSize="12px" fontWeight={500}>
          Share
        </Text>
      </StyledButton>
    </Link>
  )
}
