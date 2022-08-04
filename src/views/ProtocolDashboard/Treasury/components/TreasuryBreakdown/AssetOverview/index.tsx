/** @jsxImportSource theme-ui */
import { Tvl } from 'components/Icons'
import { Flex, Text } from '@ape.swap/uikit'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
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

const AssetOverview: React.FC = () => {
  const { t } = useTranslation()
  const total = stubData.reduce((a, b) => a + b.amount, 0)
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Assets Overview')}
        </Text>
      </Flex>
      <Flex
        sx={{
          width: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      >
        <Flex sx={{ margin: '10px 0px' }}>
          <Flex sx={{ width: '300px' }}>
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
                cutout: 90,
              }}
            />
          </Flex>
        </Flex>
        <Flex sx={{ flexDirection: 'column', maxWidth: '300px', width: '100%', margin: '10px 0px' }}>
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
                    maxWidth: '150px',
                    width: '100%',
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

export default AssetOverview
