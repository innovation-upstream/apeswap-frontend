/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Tvl } from 'components/Icons'
import { Flex, Text } from '@ape.swap/uikit'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import stubData from './stubData'
import CountUp from 'react-countup'

const data = {
  labels: stubData.map((data) => data.type),
  datasets: [
    {
      data: stubData.map((data) => data.amount),
      backgroundColor: stubData.map((data) => data.color),
      hoverOffset: 4,
    },
  ],
}

const TotalValueLocked: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const total = stubData.reduce((a, b) => a + b.amount, 0)
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Total Value Locked')}
        </Text>
        <Text size="12px" weight={500}>
          Amount Staked
        </Text>
        <Text size="22px" weight={700}>
          $<CountUp end={444584.28} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
        <Flex sx={{ position: 'relative' }}>
          <Flex sx={{ width: '200px' }}>
            <Doughnut
              data={data}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                cutout: 50,
              }}
            />
          </Flex>
          <Flex
            sx={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Tvl fill={theme.colors.text} color={theme.colors.background} width="50px" height="70px" />
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: 'column', width: '325px' }}>
          {stubData.map((data) => {
            return (
              <Flex key={data.type} sx={{ alignItems: 'center', justifyContent: 'space-between', margin: '5px 0px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <Flex sx={{ background: data.color, width: '8px', height: '8px', borderRadius: '4px' }} />
                  <Text ml="10px" weight={500}>
                    {data.type}
                  </Text>
                </Flex>
                <Flex
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '160px',
                  }}
                >
                  <Text weight={700} mr="10px">
                    $<CountUp end={data.amount} decimals={0} duration={1} separator="," />
                  </Text>
                  <Text weight={500} sx={{ opacity: 0.5 }}>
                    <CountUp end={(data.amount / total) * 100} decimals={2} duration={1} separator="," />%
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
