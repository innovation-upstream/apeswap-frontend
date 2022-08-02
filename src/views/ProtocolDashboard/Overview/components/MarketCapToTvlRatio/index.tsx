/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Flex, Text } from '@ape.swap/uikit'
import React from 'react'
import { Line } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import CountUp from 'react-countup'

const MarketCapToTvlRatio: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const data = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 52],
        fill: false,
        borderColor: theme.colors.text,
        backgroundColor: theme.colors.text,
        tension: 0.1,
      },
    ],
  }
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', marginBottom: '10px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Market Cap to TVL Ratio')}
        </Text>
        <Text size="16px" weight={500}>
          <CountUp end={52} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ maxWidth: '100%', width: '99%', height: '200px' }}>
        <Line
          data={data}
          options={{
            scales: {
              y: {
                position: 'right',
                grid: { color: theme.colors.white4, drawBorder: false },
                ticks: { stepSize: 20, color: theme.colors.text, font: { family: 'poppins', weight: '500' } },
              },
              x: {
                grid: { display: false, drawBorder: false },
                ticks: { color: theme.colors.text, font: { family: 'poppins', weight: '500' } },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
            color: 'red',
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </Flex>
    </Flex>
  )
}

export default MarketCapToTvlRatio
