/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'

const NextLink: React.FC<LinkProps> = ({ children, ...props }) => (
  <Link {...props}>
    <a>{children}</a>
  </Link>
)

// An internal link from the react-router-dom library that is correctly styled
const StyledInternalLink = styled(NextLink)`
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export default StyledInternalLink
