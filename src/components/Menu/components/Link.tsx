/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React from 'react'
import Link from 'next/link'
import { Text } from '@innovationupstream/apeswap-uikit'

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
          color: 'text',
          fontWeight: '400',
          fontSize: 2,
          pl: '20px',
          '&:after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          },
          ...csx,
        }}
      >
        {children}
      </Text>
    </a>
  </Link>
)
