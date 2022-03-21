import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { customMeta, DEFAULT_META } from 'config/constants/meta'
import Head from 'next/head'
import { MenuContext } from '@innovationupstream/apeswap-uikit'
import { Box } from 'theme-ui'
import Container from './Container'

interface SizeProps {
  width?: string
}

const StyledPage = styled(Container)<SizeProps>`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
    max-width: ${({ width }) => width || '992px'};
  }
`

const PageMeta = () => {
  const { pathname } = useRouter()
  const pageMeta = customMeta[pathname] || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }

  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  )
}

const Page: React.FC<SizeProps> = ({ children, ...props }) => {
  const { collapse } = useContext(MenuContext)

  return (
    <>
      <PageMeta />
      <Box
        sx={{
          marginLeft: collapse ? [0, 0, '56px'] : [0, 0, '240px'],
        }}
      >
        <StyledPage {...props}>{children}</StyledPage>
      </Box>
    </>
  )
}

export default Page
