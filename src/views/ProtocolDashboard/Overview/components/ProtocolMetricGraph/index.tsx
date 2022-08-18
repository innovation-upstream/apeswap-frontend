/** @jsxImportSource theme-ui */
import { Flex, Tab, Tabs, Text } from '@ape.swap/uikit'
import { Select, SelectItem } from '@apeswapfinance/uikit'
import React, { useMemo, useState } from 'react'
import { Line } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import { useFetchOverviewProtocolMetrics } from 'state/protocolDashboard/hooks'

const setData = (data: any, theme: any) => {
  return {
    labels: data?.history?.map((history) => history.time * 1000),
    datasets: [
      {
        data: data?.history?.map((history) => history.amount),
        fill: false,
        borderColor: theme.colors.text,
        backgroundColor: theme.colors.text,
        tension: 0.3,
      },
    ],
  }
}

const ProtocolMetricsGraph: React.FC = () => {
  const currentDate = new Date()
  const minDateMap = {
    total: '',
    '7d': new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000).getTime(),
    '30d': new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000).getTime(),
  }
  const metrics = useFetchOverviewProtocolMetrics()
  const bananaHolders = metrics?.filter((data) => data.description === 'Banana Holders')[0]
  const marketCap = metrics?.filter((data) => data.description === 'Market Cap')[0]
  const bananaBurned = metrics?.filter((data) => data.description === 'Banana Burned')[0]
  const pol = metrics?.filter((data) => data.description === 'POL')[0]
  const listOfMetrics = useMemo(
    () => [bananaHolders, marketCap, bananaBurned, pol],
    [bananaHolders, marketCap, bananaBurned, pol],
  )
  const [activeCatTab, setActiveCatTab] = useState(0)
  const [activeTime, onSetTime] = useState('total')
  const { t } = useTranslation()
  const { theme } = useTheme()
  const data = useMemo(() => setData(listOfMetrics[activeCatTab], theme), [listOfMetrics, activeCatTab, theme])

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
        {data && (
          <Line
            data={data}
            options={{
              elements: {
                point: {
                  radius: 0,
                },
              },
              scales: {
                y: {
                  position: 'right',
                  grid: { color: theme.colors.white4, drawBorder: false },
                  ticks: { stepSize: 20, color: theme.colors.text, font: { family: 'poppins', weight: '500' } },
                },

                x: {
                  type: 'time',
                  min: minDateMap[activeTime],
                  grid: { display: false, drawBorder: false },
                  ticks: {
                    color: theme.colors.text,
                    font: { family: 'poppins', weight: '500' },
                  },
                  time: {
                    unit: activeTime === 'total' ? 'month' : activeTime === '24h' ? 'hour' : 'day',
                  },
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
        )}
      </Flex>
    </Flex>
  )
}

export default ProtocolMetricsGraph
