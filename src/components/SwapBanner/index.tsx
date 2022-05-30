import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { SwapContext } from 'contexts/SSRContext/Swap/SwapContext'

const SwapBanner: React.FC = () => {
  const { swap: banners } = useContext(SwapContext)
  const { query } = useRouter()
  const bannerToDisplay = banners.swapBannersData.find((banner) => {
    if (query?.banner === banner?.param) {
      return banner
    }
    return null
  })
  const defaultBanner = banners.swapBannersData.find((banner) => {
    if (banner?.param === 'default') {
      return banner
    }
    return null
  })

  return (
    <>
      {bannerToDisplay ? (
        <a href={bannerToDisplay?.link} target="_blank" rel="noopener noreferrer">
          <StyledBanner image={bannerToDisplay?.desktop?.url} />
        </a>
      ) : (
        <a href={defaultBanner?.link} target="_blank" rel="noopener noreferrer">
          <StyledBanner image={defaultBanner?.desktop?.url} />
        </a>
      )}
    </>
  )
}

const StyledBanner = styled.div<{ image: string }>`
  width: 360px;
  height: 64px;
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 120px;
    width: 680px;
  }
  margin-bottom: 20px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

export default React.memo(SwapBanner)
