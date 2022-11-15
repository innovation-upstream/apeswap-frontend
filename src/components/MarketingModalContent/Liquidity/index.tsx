import React from 'react'
import SelectTokenSlide from '../GeneralSlides/SelectTokenSlide'
import WelcomeSlide from '../GeneralSlides/WelcomeSlide'
import Slide3 from './Slide3'
import Slide4 from './Slide4'

export const LiquiditySlides = [
  <WelcomeSlide key="welcome" />,
  <SelectTokenSlide key="selectToken" />,
  <Slide3 key="liquidity3" />,
  <Slide4 key="liquidity4" />,
]
