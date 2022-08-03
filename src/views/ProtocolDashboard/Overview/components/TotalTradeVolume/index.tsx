/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Flex, Text } from '@ape.swap/uikit'
import React from 'react'
import { Line } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { useFetchOverviewVolume } from 'state/protocolDashboard/hooks'
import stubData from './stubData'
import { styles } from './styles'
import { useFetchHomepageStats, useHomepageStats } from 'state/hooks'

// {
//   label: 'BNB Chain',
//   data: tradeVolume?.map((data) => data.history.map((hist) => hist.amount)),
//   backgroundColor: 'rgba(243, 186, 47, .5)',
//   borderColor: 'rgba(243, 186, 47, 1)',
//   fill: true,
//   drawTicks: false,
//   lineTension: 0.5,
// },
// {
//   data: tradeVolume?.map((data) => data.history.map((hist) => hist.amount)),
//   label: 'Polygon',
//   backgroundColor: 'rgba(130, 71, 229, .5)',
//   borderColor: 'rgba(130, 71, 229, 1)',
//   fill: true,
//   lineTension: 0.8,
// },
// {
//   label: 'Ethereum',
//   data: tradeVolume?.map((data) => data.history.map((hist) => hist.amount)),
//   backgroundColor: 'rgba(98, 126, 234, .5)',
//   borderColor: 'rgba(98, 126, 234, 1)',
//   fill: true,
//   lineTension: 0.8,
// },

const BACKGROUND_COLORS = ['rgba(243, 186, 47, .5)', 'rgba(130, 71, 229, .5)', 'rgba(98, 126, 234, .5)']
const BORDER_COLORS = ['rgba(243, 186, 47, 1)', 'rgba(130, 71, 229, 1)', 'rgba(98, 126, 234, 1)']

const TotalTradeVolume: React.FC = () => {
  const tradeVolume = useFetchOverviewVolume()
  const totalVolume = useHomepageStats()?.totalVolume
  const { theme } = useTheme()
  console.log(totalVolume)
  const data = {
    labels: tradeVolume?.[0]?.history.map((hist) => hist.time),
    legend: { position: 'bottom' },
    color: 'red',
    drawBorder: true,
    datasets: tradeVolume?.map((data, i) => {
      return {
        label: data.description,
        data: data.history?.map((hist) => hist.amount),
        backgroundColor: BACKGROUND_COLORS[i],
        borderColor: BORDER_COLORS[i],
        fill: true,
        drawTicks: false,
        lineTension: 0.5,
      }
    }),
  }

  const { t } = useTranslation()

  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', marginBottom: '10px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Total Trade Volume')}
        </Text>
        <Text size="16px" weight={500}>
          {totalVolume && (
            <>
              $<CountUp end={totalVolume} decimals={2} duration={1} separator="," />
            </>
          )}
        </Text>
      </Flex>
      <Flex sx={{ position: 'relative', maxWidth: '100%', width: '99%', height: '100%' }}>
        {data && (
          <Line
            datasetIdKey="totalTradeVolume"
            data={data}
            options={{
              color: theme.colors.text,
              scales: {
                y: {
                  grid: { color: theme.colors.white4, drawBorder: false },
                  ticks: { color: theme.colors.text, font: { family: 'poppins', weight: '500' } },
                },
                x: {
                  grid: { display: false, drawBorder: false },
                  ticks: { color: theme.colors.text, font: { family: 'poppins', weight: '500' } },
                },
              },
              plugins: {
                legend: {
                  position: 'bottom',
                  fullSize: true,
                  labels: {
                    color: theme.colors.text,
                    font: { family: 'poppins', weight: '600' },
                  },
                },
              },
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </Flex>
    </Flex>
  )
}

export default TotalTradeVolume
