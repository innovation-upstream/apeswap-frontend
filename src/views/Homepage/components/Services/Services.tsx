/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Text as V2Text, Flex as V2Flex, Skeleton } from '@ape.swap/uikit'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import useWindowSize from 'hooks/useDimensions'
import { ServiceData } from 'state/types'
import { useFetchHomepageServiceStats, useHomepageServiceStats } from 'state/hooks'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useTranslation } from 'contexts/Localization'
import { getDotPos } from 'utils/getDotPos'
import { styles } from './styles'
import { defaultServiceData } from './defaultServiceData'
import useTheme from 'hooks/useTheme'

const Services: React.FC<{ bab?: boolean }> = ({ bab }) => {
  const { swiper, setSwiper } = useSwiper()
  const { isDark } = useTheme()
  const [loadServices, setLoadServices] = useState(false)
  useFetchHomepageServiceStats(loadServices)
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const serviceData = useHomepageServiceStats()
  const displayData =
    serviceData &&
    defaultServiceData(t).map((service) => {
      return { ...service, stats: serviceData[service.id] }
    })
  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper.slideTo(displayData?.length + index)
    swiper.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, displayData.length)
    setActiveSlide(slideNumber)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadServices(true)
    }
  }, [isIntersecting])

  const handleEachService = (id: string, service: ServiceData) => {
    if (id === 'farmDetails' || id === 'poolDetails' || id === 'billDetails') {
      const tokenImage =
        id === 'farmDetails'
          ? service.stakeToken.name.split('-')
          : id === 'billDetails'
          ? service?.lpTokenName.split('-')
          : [service.stakeToken.name, service.rewardToken.name]
      const name =
        id === 'farmDetails'
          ? service.stakeToken.name
          : id === 'billDetails'
          ? service?.lpTokenName
          : service.rewardToken.name
      return { name, tokenImage }
    }
    if (id === 'lendingDetails') {
      return { name: service.marketName, tokenImage: [service.token.name] }
    }
    return {}
  }

  const displayStats = (id: string, link: string, stats: ServiceData[]) => {
    return (
      <>
        <V2Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: '60px',
            height: '250px',
            width: '93%',
          }}
        >
          {stats?.map((stat) => {
            const { name, tokenImage } = handleEachService(id, stat)
            return (
              <a href={stat?.link} rel="noopener noreferrer" key={stat?.apr}>
                <V2Flex
                  sx={{
                    width: '100%',
                    height: '70px',
                    background: 'rgba(11, 11, 11, .55)',
                    borderRadius: '10px',
                    marginTop: '5px',
                    marginBottom: '5px',
                    paddingLeft: '20px',
                  }}
                >
                  {id === 'farmDetails' ? (
                    <ServiceTokenDisplay
                      token1={tokenImage[0]}
                      token2={tokenImage[1]}
                      token3={stat.rewardToken.name}
                      stakeLp
                      iconFill="white"
                    />
                  ) : id === 'billDetails' ? (
                    <ServiceTokenDisplay
                      token1={tokenImage[0]}
                      token2={tokenImage[1]}
                      token3={stat.earnTokenName}
                      stakeLp
                      billArrow
                      iconFill="white"
                    />
                  ) : id === 'poolDetails' ? (
                    <ServiceTokenDisplay token1={tokenImage[0]} token2={tokenImage[1]} iconFill="white" />
                  ) : (
                    <ServiceTokenDisplay token1={tokenImage[0]} />
                  )}
                  <V2Flex sx={{ paddingLeft: '15px', justifyContent: 'center', flexDirection: 'column' }}>
                    <V2Text bold sx={{ width: '100%', color: 'white' }}>
                      {name}
                    </V2Text>
                    {id === 'lendingDetails' ? (
                      <V2Text sx={{ width: '100%', color: 'primaryBright', fontWeight: 400 }}>
                        APY: {stat.apy.toFixed(2)}%
                      </V2Text>
                    ) : id === 'billDetails' ? (
                      <V2Text sx={{ width: '100%', color: 'primaryBright', fontWeight: 400 }}>
                        Discount:{' '}
                        <V2Text sx={{ color: stat.discount > 0 ? 'primaryBright' : '#DF4141' }}>
                          {stat.discount.toFixed(2)}%
                        </V2Text>
                      </V2Text>
                    ) : (
                      <V2Text sx={{ width: '100%', color: 'primaryBright', fontWeight: 400 }}>
                        APR: {(stat.apr * 100).toFixed(2)}%
                      </V2Text>
                    )}
                  </V2Flex>
                </V2Flex>
              </a>
            )
          })}
        </V2Flex>
        <a href={link} rel="noopener noreferrer">
          <V2Flex sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <V2Text sx={{ color: 'primaryBright', fontSize: '16px' }} bold>
              {t('See All')} {'>'}
            </V2Text>
          </V2Flex>
        </a>
      </>
    )
  }

  return (
    <>
      <div ref={observerRef} />
      <V2Flex
        sx={{ ...styles.colorWrap, background: (bab && 'white1') || 'white2', paddingTop: bab && ['50px', '100px'] }}
      >
        {bab && (
          <V2Text
            sx={{
              textAlign: 'center',
              lineHeight: ['38px', '45px'],
              fontSize: ['25px', '30px'],
              fontWeight: 700,
              margin: '0 0 0 0',
            }}
          >
            {t('Featured ApeSwap Products')}
          </V2Text>
        )}
        <V2Flex sx={{ ...styles.serviceWrapper, padding: bab && '30px 0 90px 0', height: !bab && '610px' }}>
          {displayData ? (
            width < 1488 ? (
              <Swiper
                id="serviceSwiper"
                initialSlide={0}
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                loopedSlides={displayData?.length}
                loop
                centeredSlides
                resizeObserver
                lazy
                preloadImages={false}
                onSlideChange={handleSlide}
                breakpoints={{
                  480: {
                    centeredSlides: false,
                  },
                }}
              >
                {displayData?.map((service) => {
                  return (
                    <SwiperSlide
                      style={{
                        maxWidth: '338px',
                        minWidth: '300px',
                      }}
                      key={service.title}
                    >
                      <V2Flex
                        sx={{
                          ...styles.yieldCard,
                          background: `url(${service.backgroundImg}-${isDark ? 'dark' : 'light'}.svg)`,
                        }}
                      >
                        <V2Flex
                          sx={{
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '100%',
                            width: '100%',
                          }}
                        >
                          <V2Flex sx={{ flexDirection: 'column', padding: ['15px 5px', '20px 5px'], gap: '5px' }}>
                            <V2Text
                              sx={{
                                fontSize: '23px',
                                color: 'primaryBright',
                                fontWeight: 'bold',
                              }}
                            >
                              {service.title}
                            </V2Text>
                            <V2Text
                              sx={{
                                fontSize: '15px',
                                color: 'primaryBright',
                                fontWeight: 'bold',
                              }}
                            >
                              {service.description}
                            </V2Text>
                          </V2Flex>
                          {displayStats(service.id, service.link, service.stats)}
                        </V2Flex>
                      </V2Flex>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              displayData?.map((service) => {
                return (
                  <V2Flex
                    sx={{
                      ...styles.yieldCard,
                      background: `url(${service.backgroundImg}-${isDark ? 'dark' : 'light'}.svg)`,
                    }}
                    key={service.id}
                  >
                    <V2Flex
                      sx={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%',
                      }}
                    >
                      <V2Flex sx={{ flexDirection: 'column', padding: ['15px 5px', '20px 5px'], gap: '5px' }}>
                        <V2Text
                          sx={{
                            fontSize: '23px',
                            color: 'primaryBright',
                            fontWeight: 'bold',
                          }}
                        >
                          {service.title}
                        </V2Text>
                        <V2Text
                          sx={{
                            fontSize: '15px',
                            color: 'primaryBright',
                            fontWeight: 'bold',
                          }}
                        >
                          {service.description}
                        </V2Text>
                      </V2Flex>
                      {displayStats(service.id, service.link, service.stats)}
                    </V2Flex>
                  </V2Flex>
                )
              })
            )
          ) : (
            [...Array(4)].map((i) => {
              return (
                <V2Flex sx={{ ...styles.yieldCard }} key={i}>
                  <Skeleton height="100%" width="100%" />
                </V2Flex>
              )
            })
          )}
          <V2Flex
            sx={{
              justifyContent: 'center',
              alignContent: 'center',
              position: 'absolute',
              bottom: '35px',
              left: '0',
              width: '100%',
            }}
          >
            {[...Array(displayData?.length)].map((_, i) => {
              return (
                <V2Flex
                  sx={{
                    ...styles.bubble,
                    background:
                      (i === activeSlide && 'linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%)') || 'white4',
                  }}
                  onClick={() => slideNewsNav(i)}
                  key={i}
                />
              )
            })}
          </V2Flex>
        </V2Flex>
      </V2Flex>
    </>
  )
}

export default React.memo(Services)
