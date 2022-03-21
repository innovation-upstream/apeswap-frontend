import React from 'react'

const GTAG_ID = process.env.NEXT_PUBLIC_GTAG

export const GTAG = () => (
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
)