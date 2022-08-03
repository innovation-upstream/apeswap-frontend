/** @jsxImportSource theme-ui */
// @ts-nocheck
// ChartJS has borderRadius in vs 3^, but react-chartjs does not have the type for it
import { Flex, Text } from '@ape.swap/uikit'
import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { styles } from './styles'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'

ChartJS.register(LineElement, PointElement, LinearScale, Title)

const BananaSupplyDistribution: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: theme.colors.text,
        hoverOffset: 4,
      },
    ],
  }

  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="5px">
          {t('BANANA Supply Distribution')}
        </Text>
        <Text size="16px" weight={500} mb="10px">
          $<CountUp end={444584.28} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ width: '160px' }}>
        <Doughnut
          data={data}
          options={{
            elements: {
              arc: {
                borderWidth: 3,
                borderColor: theme.colors.white2,
              },
            },
            plugins: { legend: { display: false } },
            borderRadius: 8,
          }}
        />
      </Flex>
    </Flex>
  )
}

export default BananaSupplyDistribution
