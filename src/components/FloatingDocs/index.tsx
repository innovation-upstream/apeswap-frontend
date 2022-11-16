/** @jsxImportSource theme-ui */
import React from 'react'
import { Flex, Svg, useMatchBreakpoints } from '@ape.swap/uikit'
import { useRouteLinks } from 'hooks/useRouteLinks'
import { FloatingDocsProps } from './types'

export const FloatingDocs: React.FC<FloatingDocsProps> = ({ iconProps, ...props }) => {
  const { isLg, isXl, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const { link } = useRouteLinks()

  return link ? (
    <Flex
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 5,
        cursor: 'pointer',
      }}
      onClick={() => window.open(link, '_blank')}
      {...props}
    >
      <Svg icon="docs" width={isMobile ? 40 : 50} color="primaryBright" {...iconProps} />
    </Flex>
  ) : null
}

export default FloatingDocs
