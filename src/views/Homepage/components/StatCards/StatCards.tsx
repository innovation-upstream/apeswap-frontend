/** @jsxImportSource theme-ui */
import React, { useContext, useEffect, useState } from 'react'
import { Flex, Text, Skeleton } from '@apeswapfinance/uikit'
import CountUp from 'react-countup'
import { useTheme } from 'styled-components'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useFetchHomepageStats, useHomepageStats } from 'state/hooks'
import { SSRContext } from 'contexts/SSRContext'
import { useTranslation } from 'contexts/Localization'
import { StyledCard, CardWrapper } from './styles'
import { statsData } from './statsData'

const StatCards: React.FC = () => {
  const { isBrowser } = useContext(SSRContext)
  const [loadStats, setLoadStats] = useState(!isBrowser)
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { t } = useTranslation()
  useFetchHomepageStats(loadStats)
  const rawStats = useHomepageStats()
  const theme = useTheme()
  const stats = statsData(t).map((stat) => {
    return { ...stat, value: rawStats ? rawStats[stat.id] : null }
  })

  useEffect(() => {
    if (isIntersecting) {
      setLoadStats(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <Flex alignItems="center" justifyContent="center" style={{ width: '100%' }}>
        <CardWrapper>
          {stats?.map((stat) => {
            return (
              <StyledCard key={stat.id}>
                <Flex
                  mb="20px"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    height: '10px',
                    display: ['none', 'flex', 'flex'],
                  }}
                >
                  <stat.logo fill={theme.colors.text} color={theme.colors.background} />
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '20px', textAlign: 'center' }}>{stat.title}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  {stat?.value ? (
                    <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                      {stat?.title !== t('Partners') && '$'}
                      {!isBrowser ? (
                        parseInt(stat?.value).toLocaleString()
                      ) : (
                        <CountUp end={stat?.value} decimals={0} duration={1} separator="," />
                      )}
                    </Text>
                  ) : (
                    <Skeleton width="220px" height="30px" />
                  )}
                </Flex>
              </StyledCard>
            )
          })}
        </CardWrapper>
      </Flex>
    </>
  )
}

export default React.memo(StatCards)
