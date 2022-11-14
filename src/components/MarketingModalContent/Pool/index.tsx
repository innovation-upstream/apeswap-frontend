import React from 'react'
import WelcomeSlide from '../GeneralSlides/WelcomeSlide'
import StakeSlide from '../GeneralSlides/StakeSlide'
import CollectSlide from '../GeneralSlides/CollectSlide'
import Slide2 from './Slide2'

export const PoolSlides = [
  <WelcomeSlide key="welcome" />,
  <Slide2 key="pool2" />,
  <StakeSlide key="stake" />,
  <CollectSlide key="collect" />,
]
