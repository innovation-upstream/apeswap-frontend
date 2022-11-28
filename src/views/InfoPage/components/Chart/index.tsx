/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React, { useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useFetchChartData } from '../../../../state/info/hooks'
import { INFO_PAGE_CHAIN_PARAMS } from 'config/constants/chains'

import { Section } from '../../../Info/styles'
import moment from 'moment/moment'
import useTheme from '../../../../hooks/useTheme'
import { ChartWrapper, RangeSelectorsWrapper } from '../styles'
import Figure from '../Figures/figure'
import CircleLoader from '../../../../components/Loader/CircleLoader'

interface ChartProps {
  chartType: string
  sevenDayVolume: (input: number) => void
  liquidity: number
}

const Chart: React.FC<ChartProps> = (props) => {
  const { isDark } = useTheme()

  const [dataAmount, setDataAmount] = useState(props.chartType === 'liquidity' ? 30 : 7)
  const [sevenDayVolume, setSevenDayVolume] = useState(0)

  const chartData = useFetchChartData(dataAmount)
  const activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  function processChartData() {
    const data = []

    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]

      if (chartData[chain].data === null || chartData[chain].data === undefined) {
        continue
      }
      if (activeChains === null || activeChains.includes(Number(chain))) {
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
      }
    }

    //  }

    return data.reverse()
  }

  function processChartLiquidityData() {
    const data = []

    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]

      if (chartData[chain].data === null || chartData[chain].data === undefined) {
        continue
      }
      if (activeChains === null || activeChains.includes(Number(chain))) {
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
      }
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

  const UpdateChart = (amount: number) => {
    setDataAmount(amount)
  }

  function checkChartDataInitialized() {
    let total = 0
    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]
      total += chartData[chain].initialized === true && chartData[chain].loading === false ? 1 : 0
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
        // width: `${mobile ? '95vw' : '100%'}`,
        width: '100%',
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

          <RangeSelectorsWrapper>
            <ul>
              <li className={dataAmount === 7 && 'active'} onClick={() => UpdateChart(7)}>
                1W
              </li>
              <li className={dataAmount === 30 && 'active'} onClick={() => UpdateChart(30)}>
                1M
              </li>
              <li className={dataAmount === 180 && 'active'} onClick={() => UpdateChart(180)}>
                6M
              </li>
            </ul>
          </RangeSelectorsWrapper>

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
        <CircleLoader />
      )}
    </Flex>
  )
}

export default Chart
