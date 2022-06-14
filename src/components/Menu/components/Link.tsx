/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React from 'react'
import Link from 'next/link'
import { Text } from '@ape.swap/uikit'
import { menuLink } from './styles'

export const NextLink: React.FC<{ href: string; csx?: any; target?: string }> = ({
  children,
  href,
  csx = {},
  target = '_self',
}) => (
  <Link href={href} passHref>
    <a target={target}>
      <Text
        sx={{
          ...menuLink,
          ...csx,
        }}
      >
        {children}
      </Text>
    </a>
  </Link>
)
