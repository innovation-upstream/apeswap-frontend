import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { ResetCSS } from '@apeswapfinance/uikit'
import { Box } from 'theme-ui'
import GlobalStyle from 'style/Global'
import ToastListener from 'components/ToastListener'
import MarketingModalCheck from 'components/MarketingModalCheck'
import { PageWrapper } from 'components/PageWrapper'
import Footer from 'components/Footer/Footer'
import Menu from 'components/Menu'
import PageLoader from 'components/PageLoader'
import { SSRContextProvider } from 'contexts/SSRContext'
import Providers from '../Providers'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!router) return
    const handleChange =
      (state = false) =>
      () =>
        setLoading(state)
    router.events.on('routeChangeStart', handleChange(true))
    router.events.on('routeChangeComplete', handleChange())

    // eslint-disable-next-line consistent-return
    return () => {
      router.events.off('routeChangeStart', handleChange(true))
      router.events.off('routeChangeComplete', handleChange)
    }
  }, [router])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
      </Head>
      <Providers>
        <SSRContextProvider desktop={pageProps.isDesktop}>
          <ResetCSS />
          <GlobalStyle />
          <MarketingModalCheck />
          <PageWrapper>
            <Menu chain={pageProps?.chainId} />
            {loading ? (
              <PageLoader />
            ) : (
              <Box sx={{ pt: '60px' }}>
                <Component {...pageProps} />
              </Box>
            )}
            <Footer />
          </PageWrapper>
          <ToastListener />
        </SSRContextProvider>
      </Providers>
    </>
  )
}

export default MyApp
