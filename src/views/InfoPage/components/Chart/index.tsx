/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useFetchChartData } from '../../../../state/info/hooks'
import { INFO_PAGE_CHAIN_PARAMS } from 'config/constants/chains'

import { Section } from '../../../Info/styles'
import moment from 'moment/moment'
import useTheme from '../../../../hooks/useTheme'
import { ChartWrapper } from '../styles'
import Figure from '../Figures/figure'

interface ChartProps {
  chartType: string
  sevenDayVolume: (input: number) => void
  liquidity: number
}

const Chart: React.FC<ChartProps> = (props) => {
  const { isDark } = useTheme()

  const chartData = useFetchChartData(30)
  const activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  function processChartData() {
    const data = []

    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]
      if (data.length === 0) {
        for (let j = 0; j < chartData[chain].data.length; j++) {
          data.push({
            date: chartData[chain].data[j].date,
            [chain]: chartData[chain].data[j].dailyVolumeUSD,
          })
        }
      } else {
        for (let j = 0; j < chartData[chain].data.length; j++) {
          data[j][chain] = chartData[chain].data[j].dailyVolumeUSD
        }
      }
      //  }
    }

    return data.reverse()
  }

  function processChartLiquidityData() {
    const data = []

    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]
      //  if (activeChains.includes(Number(chain))) {
      if (data.length === 0) {
        for (let j = 0; j < chartData[chain].data.length; j++) {
          data.push({
            date: chartData[chain].data[j].date,
            [chain]: chartData[chain].data[j].totalLiquidityUSD,
          })
        }
      } else {
        for (let j = 0; j < chartData[chain].data.length; j++) {
          data[j][chain] = chartData[chain].data[j].totalLiquidityUSD
        }
      }
      //   }
    }

    return data.reverse()
  }

  function calculate7DayVolume() {
    let total = 0

    processChartData()
      .reverse()
      .slice(0, 7)
      .forEach((item: any) => {
        for (let i = 0; i < Object.keys(INFO_PAGE_CHAIN_PARAMS).length; i++) {
          total += item[Object.keys(INFO_PAGE_CHAIN_PARAMS)[i]]
            ? Number(item[Object.keys(INFO_PAGE_CHAIN_PARAMS)[i]])
            : 0
        }
      })

    return total
  }

  function getBarColor(bar: any) {
    const chain = INFO_PAGE_CHAIN_PARAMS[bar.id]
    return chain ? chain.color : '#000000'
  }

  function UpdateChart(amount: number) {
    return amount
    //chartData = useFetchChartData(amount)
  }

  function checkChartDataInitialized() {
    let total = 0
    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]
      total += chartData[chain].initialized === true ? 1 : 0
    }

    if (total === Object.keys(chartData).length) {
      //Update 7 day volume to pass over to figures
      props.sevenDayVolume(calculate7DayVolume())
    }

    return total === Object.keys(chartData).length
  }

  function getChartTextColor() {
    return isDark ? '#FFFFFF' : '#333333'
  }

  function generateToolTip(data: any) {
    return (
      <Section className="smallSection">
        <div className="header">
          <div className="wrapper">
            Date: <div className="value">{moment.unix(Number(data.data.date)).format('MMM DD, YYYY').valueOf()}</div>
          </div>
          <div className="wrapper">
            Total:{' '}
            <div className="value">
              $
              {Math.round(
                Number(data.data[1] ?? 0) +
                  Number(data.data[40] ?? 0) +
                  Number(data.data[56] ?? 0) +
                  Number(data.data[137] ?? 0),
              ).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="body">
          {/*{activeChains.includes(Number(1)) && (*/}

          <div className="wrapper">
            <div className="indicator eth"></div>Ethereum:{' '}
            <div className="value">${Math.round(data.data[1]).toLocaleString()}</div>
          </div>
          {/*)}*/}
          {/*{activeChains.includes(Number(40)) && (*/}
          <div className="wrapper">
            <div className="indicator telos"></div>Telos:{' '}
            <div className="value">${Math.round(data.data[40]).toLocaleString()}</div>
          </div>
          {/*)}*/}
          {/*{activeChains.includes(Number(56)) && (*/}
          <div className="wrapper">
            <div className="indicator bnb"></div>BNB:{' '}
            <div className="value">${Math.round(data.data[56]).toLocaleString()}</div>
          </div>
          {/*)}*/}
          {/*{activeChains.includes(Number(137)) && (*/}
          <div className="wrapper">
            <div className="indicator polygon"></div>Polygon:{' '}
            <div className="value">${Math.round(data.data[137]).toLocaleString()}</div>
          </div>
          {/*)}*/}
        </div>
      </Section>
    )
  }

  return (
    <Flex
      sx={{
        maxWidth: '100%',
        minWidth: '100%',
        minHeight: '402px',
        maxHeight: '402px',
        background: 'white2',
        borderRadius: '10px',
        padding: '20px',
        flexWrap: 'wrap',
      }}
    >
      {checkChartDataInitialized() === true ? (
        <>
          {props.chartType === 'volume' ? (
            <Figure
              label="Volume (7d)"
              icon="dollar"
              value={Math.round((calculate7DayVolume() * 100) / 100).toLocaleString()}
            />
          ) : (
            <Figure label="Liquidty" icon="chart" value={Math.round(props.liquidity).toLocaleString()} />
          )}

          <ChartWrapper>
            <ResponsiveBar
              data={props.chartType === 'volume' ? processChartData() : processChartLiquidityData()}
              keys={['1', '56', '137', '40']}
              indexBy="date"
              groupMode="stacked"
              padding={0.3}
              theme={{
                fontSize: 14,
                fontFamily: 'Poppins',
                textColor: getChartTextColor(),
              }}
              colors={getBarColor}
              axisBottom={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                format: (x) => '',
              }}
              axisLeft={null}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              axisTop={null}
              enableLabel={false}
              enableGridX={false}
              enableGridY={false}
              animate={false}
              tooltip={(data) => generateToolTip(data)}
              margin={{ top: 0, right: 0, bottom: 25, left: 0 }}
            />
          </ChartWrapper>
        </>
      ) : (
        <div>Loading</div>
      )}
    </Flex>
  )
}

export default Chart
