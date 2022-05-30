/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React from 'react'
import Link from 'next/link'
import { Text } from '@innovationupstream/apeswap-uikit'
import { alpha } from '@theme-ui/color'

export const NextLink: React.FC<{ href: string; csx?: any; target?: string }> = ({
  children,
  href,
  csx = {},
  target = children === 'Exchange' ? '_self' : '_blank',
}) => (
  <Link href={href} passHref>
    <a target={target}>
      <Text
        sx={{
          background: (t) =>
            children === 'GNANA'
              ? `
          linear-gradient(
            53.53deg,
            ${alpha('rgb(161, 101, 82)', 0.9)(t)},
            ${alpha('rgb(225, 178, 66)', 1)(t)}
          ) 
        `
              : '',
          backgroundClip: 'text',
          WebkitTextFillColor: children === 'GNANA' ? 'transparent' : '',
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
