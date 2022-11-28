/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import useIsMobile from '../../../../hooks/useIsMobile'
import { ShowcaseWrapper, Bubble } from '../styles'
import SwiperProvider from 'contexts/SwiperProvider'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import { Flex } from '@apeswapfinance/uikit'
import useSwiper from 'hooks/useSwiper'

const InfoShowcases = () => {
  const mobile = useIsMobile()
  const [activeSlide, setActiveSlide] = useState(0)
  // const { swiper, setSwiper } = useSwiper()

  const showcases = [
    {
      id: 0,
      img: '/images/info/farms-bg.png',
      alt: 'Farms Spotlight',
      link: '/farms',
    },
    {
      id: 1,
      img: '/images/info/maximizers-bg.png',
      alt: 'Maximizers Spotlight',
      link: '/maximizers',
    },
  ]

  const updateSlide = (index) => {
    // swiper.slideTo(index)
    setActiveSlide(index)
  }

  return (
    <>
      {mobile === false ? (
        showcases.map((showcase, index) => {
          return (
            <ShowcaseWrapper key={showcase.id}>
              <a href={showcase.link}>
                <img src={showcase.img} alt={showcase.alt} />
              </a>
            </ShowcaseWrapper>
          )
        })
      ) : (
        <Flex
          sx={{
            width: '95vw',
            height: 'fit-content',
            mt: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <SwiperProvider>
            <Swiper
              id="serviceSwiper"
              initialSlide={0}
              spaceBetween={15.5}
              slidesPerView="auto"
              loopedSlides={2}
              loop={false}
              centeredSlides
              resizeObserver
              lazy
              //onSwiper={setSwiper}
            >
              {showcases.map((showcase, index) => {
                return (
                  <SwiperSlide style={{ maxWidth: '100%', minWidth: '100%' }} key={showcase.id}>
                    <a href={showcase.link}>
                      <img src={showcase.img} alt={showcase.alt} />
                    </a>
                  </SwiperSlide>
                )
              })}
            </Swiper>
            <Flex sx={{ width: '100%', mt: '10px' }} justifyContent="center" alignContent="center">
              {showcases.map((showcase, index) => {
                return <Bubble isActive={index === activeSlide} onClick={() => updateSlide(index)} key={index} />
              })}
            </Flex>
          </SwiperProvider>
        </Flex>
      )}
    </>
  )
}

export default InfoShowcases
