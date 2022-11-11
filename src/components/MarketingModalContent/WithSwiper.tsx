import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper.min.css'
import useSwiper from 'hooks/useSwiper'

interface WithSwiperProps {
  children?: React.ReactNode[]
  setStep?: (arg0: number) => void
  step?: number
  goNext?: (func) => void
}

const WithSwiper: React.FC<WithSwiperProps> = ({ children, step, setStep, goNext }) => {
  const { swiper, setSwiper } = useSwiper()

  const handleSlide = (event: SwiperCore) => {
    setStep(event.activeIndex)
  }

  const slideNav = (index: number, swiper) => {
    setStep(index)
    swiper.slideTo(index)
  }

  goNext(slideNav(step + 1, swiper))

  return (
    <Swiper
      id="tutorialSwiper"
      onSwiper={setSwiper}
      spaceBetween={20}
      centeredSlides
      resizeObserver
      lazy
      preloadImages={false}
      onSlideChange={handleSlide}
    >
      {children.map((slide) => {
        return <SwiperSlide key={step}>{slide}</SwiperSlide>
      })}
    </Swiper>
  )
}

export default WithSwiper
