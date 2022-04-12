import React from 'react'

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG

export const Metatags = () => (
  <>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
    <meta
      name="description"
      content="Cheaper and faster than Uniswap? Discover ApeSwap, the #1 AMM and yield farm for apes by apes."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="twitter:image" content="https://apeswap.finance/logo.png" />
    <meta
      name="twitter:description"
      content="The best AMM on BSC by apes for apes! Earn BANANA through yield farming."
    />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="ApeSwap - A next evolution DeFi exchange on Binance Smart Chain (BSC)" />
  </>
)

export const GTAG = () => (
  <>
    <script
      id="gtag-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function (w, d, s, l, i) {
            w[l] = w[l] || []
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : ''
            j.async = true
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
            f.parentNode.insertBefore(j, f)
          })(window, document, 'script', 'dataLayer', '${GTAG_ID}')
        `,
      }}
    />
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${GTAG_ID}`}
        height="0"
        width="0"
        style={{
          display: 'none',
          visibility: 'hidden',
        }}
      />
    </noscript>
  </>
)
