/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React from 'react'
import Link from 'next/link'
import { Text } from '@innovationupstream/apeswap-uikit'

export const NextLink: React.FC<{ href: string; csx?: any }> = ({ children, href, csx = {} }) => (
  <Link href={href} passHref>
    <a>
      <Text
        sx={{
          color: 'text',
          paddingLeft: '16px',
          fontWeight: '400',
          fontSize: 2,
          ...csx,
        }}
      >
        {children}
      </Text>
    </a>
  </Link>
)
