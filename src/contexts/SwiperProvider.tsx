import React, { createContext, Dispatch, useState } from 'react'
import SwiperCore from 'swiper'

interface Context {
  swiper: SwiperCore
  setSwiper: Dispatch<React.SetStateAction<SwiperCore>>
  destroySwiper: () => void
}

export const SwiperContext = createContext<Context>(undefined as any)

const SwiperProvider = ({ children }) => {
  const [swiper, setSwiper] = useState<SwiperCore>(null as any)

  const destroySwiper = () => {
    if (swiper) {
      swiper.destroy()
      setSwiper(null as any)
    }
  }

  return <SwiperContext.Provider value={{ swiper, setSwiper, destroySwiper }}>{children}</SwiperContext.Provider>
}

export default SwiperProvider
