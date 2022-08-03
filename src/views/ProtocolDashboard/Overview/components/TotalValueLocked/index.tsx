/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Tvl } from 'components/Icons'
import { Flex, Text } from '@ape.swap/uikit'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { useFetchOverviewTvl } from 'state/protocolDashboard/hooks'
import { useTranslation } from 'contexts/Localization'
import CountUp from 'react-countup'
import { styles } from './styles'
import stubData from './stubData'
import { OverviewTvlInterface } from 'state/protocolDashboard/types'
import { useFetchHomepageStats } from 'state/hooks'

const COLORS = [
  'rgba(244, 190, 55, 1)',
  'rgba(84, 141, 225, 1)',
  'rgba(231, 79, 79, 1)',
  'rgba(144, 51, 246, 1)',
  'rgba(105, 165, 136, 1)',
]

const setData = (tvl: OverviewTvlInterface | string[]) => {
  if (!tvl) return
  return {
    labels: Object.entries(tvl)?.map((data) => data[0]),
    datasets: [
      {
        data: Object.entries(tvl)?.map((data) => data[1]),
        backgroundColor: Object.entries(tvl)?.map((_, i) => COLORS[i]),
        hoverOffset: 4,
      },
    ],
  }
}

const TotalValueLocked: React.FC = () => {
  useFetchHomepageStats(true)
  const tvl = useFetchOverviewTvl()
  const data = setData(tvl)
  const { t } = useTranslation()
  const { theme } = useTheme()
  const total = tvl && Object.entries(tvl)?.reduce((a, b) => a + b[1], 0)
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Total Value Locked')}
        </Text>
        <Text size="12px" weight={500}>
          Amount Staked
        </Text>
        <Text size="22px" weight={700}>
          $<CountUp end={total} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
        {data && (
          <Flex sx={{ position: 'relative', margin: '10px 0px' }}>
            <Flex sx={{ width: '200px' }}>
              <Doughnut
                data={data}
                options={{
                  elements: {
                    arc: {
                      borderWidth: 0,
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  cutout: 60,
                }}
              />
            </Flex>
            <Flex
              sx={{
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '85%',
              }}
            >
              <Tvl fill={theme.colors.text} color={theme.colors.background} width="90px" />
            </Flex>
          </Flex>
        )}
        <Flex sx={{ flexDirection: 'column', maxWidth: '310px', width: '100%', margin: '10px 0px' }}>
          {tvl &&
            Object.entries(tvl)?.map((data, i) => {
              return (
                <Flex key={data[0]} sx={{ alignItems: 'center', justifyContent: 'space-between', margin: '5px 0px' }}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex sx={{ background: COLORS[i], width: '8px', height: '8px', borderRadius: '4px' }} />
                    <Text ml="10px" weight={500} sx={{ textTransform: 'capitalize' }}>
                      {data[0]}
                    </Text>
                  </Flex>
                  <Flex
                    sx={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      maxWidth: '180px',
                      width: '100%',
                    }}
                  >
                    <Text weight={700} mr="10px">
                      $<CountUp end={data[1]} decimals={0} duration={1} separator="," />
                    </Text>
                    <Text weight={500} sx={{ opacity: 0.5 }}>
                      <CountUp end={(data[1] / total) * 100} decimals={2} duration={1} separator="," />%
                    </Text>
                  </Flex>
                </Flex>
              )
            })}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TotalValueLocked
