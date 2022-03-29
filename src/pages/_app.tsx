import React, { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ResetCSS } from '@apeswapfinance/uikit'
import GlobalStyle from 'style/Global'
import ToastListener from 'components/ToastListener'
import MarketingModalCheck from 'components/MarketingModalCheck'
import { PageWrapper } from 'components/PageWrapper'
import Menu from 'components/Menu'
import PageLoader from 'components/PageLoader'
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
    <Providers>
      <ResetCSS />
      <GlobalStyle />
      <MarketingModalCheck />
      <PageWrapper>
        {/* <TopMenu /> */}
        <Menu chain={pageProps?.chainId} />
        {loading ? <PageLoader /> : <Component {...pageProps} />}
      </PageWrapper>
      <ToastListener />
    </Providers>
  )
}

export default MyApp
