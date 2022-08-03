/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Flex, Tab, Tabs, Text } from '@ape.swap/uikit'
import { Select, SelectItem } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import { useFetchOverviewProtocolMetrics } from 'state/protocolDashboard/hooks'

const ProtocolMetricsGraph: React.FC = () => {
  const metrics = useFetchOverviewProtocolMetrics()
  console.log(metrics)
  const [activeCatTab, setActiveCatTab] = useState(0)
  const [activeTime, onSetTime] = useState('total')
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

  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ marginBottom: '10px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Flex sx={{ width: 'fit-content' }}>
          <Tabs activeTab={activeCatTab} size="sm" variant="centered">
            <Tab
              index={0}
              size="sm"
              label={t('Holders')}
              activeTab={activeCatTab}
              variant="centered"
              onClick={switchCatTab}
            />
            <Tab
              index={1}
              size="sm"
              label={t('Market Cap')}
              variant="fullWidth"
              activeTab={activeCatTab}
              onClick={switchCatTab}
            />
            <Tab
              index={2}
              size="sm"
              label={t('Burned')}
              variant="centered"
              activeTab={activeCatTab}
              onClick={switchCatTab}
            />
            <Tab
              index={3}
              size="sm"
              label={t('POL')}
              variant="centered"
              activeTab={activeCatTab}
              onClick={switchCatTab}
            />
          </Tabs>
        </Flex>
        <Flex sx={{ height: '40px' }}>
          <Select size="sm" width="126px" onChange={(e) => onSetTime(e.target.value)} active={activeTime}>
            <SelectItem size="sm" value="24h" key="24h">
              <Text>{t('24h')}</Text>
            </SelectItem>
            <SelectItem size="sm" value="7d" key="7d">
              <Text>{t('7d')}</Text>
            </SelectItem>
            <SelectItem size="sm" value="30d" key="30d">
              <Text>{t('30d')}</Text>
            </SelectItem>
            <SelectItem size="sm" value="total" key="total">
              <Text>{t('Total')}</Text>
            </SelectItem>
          </Select>
        </Flex>
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

export default ProtocolMetricsGraph
