import React, { useContext, useEffect, useState } from 'react'
import { Flex, Text, Skeleton } from '@apeswapfinance/uikit'
import { useMatchBreakpoints } from '@innovationupstream/apeswap-uikit'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { SSRContext } from 'contexts/SSRContext'
import { Bubble, ValueCard, ValueImage, ValuesWrapper, ValueText } from './styles'
import { defaultValues } from './defaultValues'

const SLIDE_DELAY = 5000
const spaceBetween = 30
SwiperCore.use([Autoplay])

const Values: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const { isBrowser, isDesktop } = useContext(SSRContext)
  const [loadValues, setLoadValues] = useState(!isBrowser)
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const swiperFlag = isBrowser ? isMd || isSm || isXs : !isDesktop

  const slideVal = (index: number) => {
    setActiveSlide(index)
    swiper.slideTo(defaultValues.length + index)
    swiper.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(
      event.activeIndex - defaultValues.length === defaultValues.length ? 0 : event.activeIndex - defaultValues.length,
    )
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadValues(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <ValuesWrapper>
        <ValueText bold> Our Values </ValueText>
        <Flex justifyContent="center" style={{ width: '100%', overflow: 'hidden' }}>
          {swiperFlag ? (
            <Swiper
              id="valuesSwiper"
              initialSlide={defaultValues.length}
              autoplay={{
                delay: SLIDE_DELAY,
                disableOnInteraction: false,
              }}
              loop
              onSwiper={setSwiper}
              spaceBetween={spaceBetween}
              slidesPerView="auto"
              loopedSlides={defaultValues.length}
              centeredSlides
              onSlideChange={handleSlide}
            >
              {defaultValues.map((value) => {
                return (
                  <SwiperSlide
                    style={{ marginRight: `${spaceBetween}px`, maxWidth: '338px', minWidth: '338px' }}
                    key={value.title}
                  >
                    <ValueCard key={value.title}>
                      {loadValues ? (
                        <ValueImage image={value.logoImg} />
                      ) : (
                        <Skeleton animation="waves" variant="circle" height="200px" width="200px" />
                      )}
                      <Text fontSize="25px" bold>
                        {value.title}
                      </Text>
                      <Text textAlign="center">{value.description}</Text>
                    </ValueCard>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            defaultValues.map((value) => {
              return (
                <ValueCard key={value.title}>
                  {loadValues ? (
                    <ValueImage image={value.logoImg} />
                  ) : (
                    <Skeleton animation="waves" variant="circle" height="200px" width="200px" />
                  )}
                  <Text fontSize="25px" bold>
                    {value.title}
                  </Text>
                  <Text textAlign="center">{value.description}</Text>
                </ValueCard>
              )
            })
          )}
        </Flex>
        <Flex
          justifyContent="center"
          alignContent="center"
          style={{ position: 'absolute', bottom: '35px', left: '0', width: '100%' }}
        >
          {[...Array(defaultValues.length)].map((_, i) => {
            return <Bubble isActive={i === activeSlide} onClick={() => slideVal(i)} />
          })}
        </Flex>
      </ValuesWrapper>
    </>
  )
}

export default Values
