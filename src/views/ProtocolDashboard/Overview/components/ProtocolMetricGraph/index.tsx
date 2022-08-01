/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Flex, Tab, Tabs, Text } from '@ape.swap/uikit'
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import CountUp from 'react-countup'

const ProtocolMetricsGraph: React.FC = () => {
  const [activeCatTab, setActiveCatTab] = useState(0)
  const [activeTimeTab, setActiveTimeTab] = useState(0)
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
  const switchCatTab = (index) => {
    setActiveCatTab(index)
  }
  const switchTimeTab = (index) => {
    setActiveTimeTab(index)
  }
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ marginBottom: '10px', justifyContent: 'space-between' }}>
        <Flex sx={{ width: 'fit-content' }}>
          <Tabs activeTab={activeCatTab} size="md" variant="centered">
            <Tab
              index={0}
              size="md"
              label={t('Holders')}
              activeTab={activeCatTab}
              variant="centered"
              onClick={switchCatTab}
            />
            <Tab
              index={1}
              size="md"
              label={t('Market Cap')}
              variant="fullWidth"
              activeTab={activeCatTab}
              onClick={switchCatTab}
            />
            <Tab
              index={2}
              size="md"
              label={t('Burned')}
              variant="centered"
              activeTab={activeCatTab}
              onClick={switchCatTab}
            />
            <Tab
              index={3}
              size="md"
              label={t('POL')}
              variant="centered"
              activeTab={activeCatTab}
              onClick={switchCatTab}
            />
          </Tabs>
        </Flex>
        <Flex>
          <Tabs activeTab={activeTimeTab} size="md" variant="centered">
            <Tab
              index={0}
              size="sm"
              label={t('24h')}
              activeTab={activeTimeTab}
              variant="centered"
              onClick={switchTimeTab}
            />
            <Tab
              index={1}
              size="sm"
              label={t('7d')}
              variant="centered"
              activeTab={activeTimeTab}
              onClick={switchTimeTab}
            />
            <Tab
              index={2}
              size="sm"
              label={t('30d')}
              variant="centered"
              activeTab={activeTimeTab}
              onClick={switchTimeTab}
            />
            <Tab
              index={3}
              size="sm"
              label={t('Total')}
              variant="centered"
              activeTab={activeTimeTab}
              onClick={switchTimeTab}
            />
          </Tabs>
        </Flex>
      </Flex>
      <Flex sx={{ width: '100%', height: '200px' }}>
        <Line
          data={data}
          options={{
            scales: {
              y: {
                position: 'right',
                grid: { color: theme.colors.white4 },
                ticks: { stepSize: 20, color: theme.colors.text, font: { family: 'poppins', weight: '500' } },
              },
              x: {
                grid: { display: false },
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

export default ProtocolMetricsGraph
