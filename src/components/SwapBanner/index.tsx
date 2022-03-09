import React from 'react'
import { useFetchSwapBanners } from 'state/strapi/fetchStrapi'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const SwapBanner: React.FC = () => {
  const banners = useFetchSwapBanners()
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
      {(bannerToDisplay || defaultBanner) &&
        (bannerToDisplay ? (
          <a href={bannerToDisplay?.link} target="_blank" rel="noopener noreferrer">
            <StyledBanner image={bannerToDisplay?.desktop?.url} />
          </a>
        ) : (
          <a href={defaultBanner?.link} target="_blank" rel="noopener noreferrer">
            <StyledBanner image={defaultBanner?.desktop?.url} />
          </a>
        ))}
    </>
  )
}

const StyledBanner = styled.div<{ image: string }>`
  height: 120px;
  width: 360px;
  border-radius: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 680px;
  }
  margin-bottom: 20px;
  background: url(${({ image }) => image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
`

export default SwapBanner
