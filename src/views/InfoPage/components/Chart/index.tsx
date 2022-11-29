/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React, { useMemo, useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { useFetchChartData } from '../../../../state/info/hooks'
import { INFO_PAGE_CHAIN_PARAMS } from 'config/constants/chains'
import { Section } from '../../../Info/styles'
import moment from 'moment/moment'
import useTheme from '../../../../hooks/useTheme'
import { ChartWrapper, RangeSelectorsWrapper } from '../styles'
import Figure from '../Figures/figure'
import { map, groupBy } from 'lodash'
import { Spinner } from '@apeswapfinance/uikit'

interface ChartProps {
  chartType: string
  sevenDayVolume: (input: number) => void
  liquidity: number
}

type ChartData = {
  date?: string
  56?: string
  40?: string
  1?: string
  137?: string
}

const Chart: React.FC<ChartProps> = (props) => {
  const { isDark } = useTheme()

  const [dataAmount, setDataAmount] = useState(props.chartType === 'liquidity' ? 30 : 7)

  const chartData = useFetchChartData(dataAmount)
  const activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  const flattenedChartData = Object.values(chartData).flatMap((item) => (item.initialized ? item.data : []))
  const groupedData = groupBy(flattenedChartData, (x) => (x ? x.date : ''))

  const mappedLiquidityData = useMemo(
    () =>
      map(groupedData, (x) => {
        const item: ChartData = {}
        item.date = x ? x[0].date : ''
        for (let i = 0; i < x.length; i++) {
          if (activeChains === null || activeChains.includes(Number(x[i].chainId))) {
            item[x[i].chainId] = x[i].totalLiquidityUSD
          }
        }
        return item
      }),
    [groupedData, activeChains],
  )

  const mappedVolumeData = useMemo(
    () =>
      map(groupedData, (x) => {
        const item: ChartData = {}
        item.date = x ? x[0].date : ''
        for (let i = 0; i < x.length; i++) {
          if (activeChains === null || activeChains.includes(Number(x[i].chainId))) {
            item[x[i].chainId] = x[i].dailyVolumeUSD
          }
        }
        return item
      }),
    [groupedData, activeChains],
  )

  const checkChartDataInitialized = useMemo(() => {
    let total = 0
    for (let i = 0; i < Object.keys(chartData).length; i++) {
      const chain = Object.keys(chartData)[i]
      total += chartData[chain].initialized === true && chartData[chain].loading === false ? 1 : 0
    }

    return total === Object.keys(chartData).length
  }, [chartData])

  const calculate7DayVolume = useMemo(() => {
    let total = 0

    mappedVolumeData
      .reverse()
      .slice(0, 7)
      .forEach((item: any) => {
        for (let i = 0; i < Object.keys(INFO_PAGE_CHAIN_PARAMS).length; i++) {
          total += item[Object.keys(INFO_PAGE_CHAIN_PARAMS)[i]]
            ? Number(item[Object.keys(INFO_PAGE_CHAIN_PARAMS)[i]])
            : 0
        }
      })

    props.sevenDayVolume(total)

    return total
  }, [checkChartDataInitialized])

  function getBarColor(bar: any) {
    const chain = INFO_PAGE_CHAIN_PARAMS[bar.id]
    return chain ? chain.color : '#000000'
  }

  const UpdateChart = (amount: number) => {
    setDataAmount(amount)
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
          {(activeChains === null || activeChains.includes(Number(1))) && (
            <div className="wrapper">
              <div className="indicator eth"></div>Ethereum:
              <div className="value">${Math.round(data.data[1] ?? 0).toLocaleString()}</div>
            </div>
          )}
          {(activeChains === null || activeChains.includes(Number(40))) && (
            <div className="wrapper">
              <div className="indicator telos"></div>Telos:
              <div className="value">${Math.round(data.data[40] ?? 0).toLocaleString()}</div>
            </div>
          )}
          {(activeChains === null || activeChains.includes(Number(56))) && (
            <div className="wrapper">
              <div className="indicator bnb"></div>BNB:
              <div className="value">${Math.round(data.data[56] ?? 0).toLocaleString()}</div>
            </div>
          )}
          {(activeChains === null || activeChains.includes(Number(137))) && (
            <div className="wrapper">
              <div className="indicator polygon"></div>Polygon:
              <div className="value">${Math.round(data.data[137] ?? 0).toLocaleString()}</div>
            </div>
          )}
        </div>
      </Section>
    )
  }

  return (
    <Flex
      sx={{
        width: '100%',
        minHeight: '402px',
        maxHeight: '402px',
        background: 'white2',
        borderRadius: '10px',
        padding: '20px',
        flexWrap: 'wrap',
      }}
    >
      {checkChartDataInitialized === true ? (
        <>
          {props.chartType === 'volume' ? (
            <Figure
              type="chart"
              label="Volume (7d)"
              icon="dollar"
              value={`$${Math.round((calculate7DayVolume * 100) / 100).toLocaleString()}`}
            />
          ) : (
            <Figure
              type="chart"
              label="Liquidty"
              icon="dollar"
              value={`$${Math.round(props.liquidity).toLocaleString()}`}
            />
          )}

          <RangeSelectorsWrapper>
            <ul>
              <li className={dataAmount === 7 && 'active'} onClick={() => UpdateChart(7)}>
                1W
              </li>
              <li className={dataAmount === 30 && 'active'} onClick={() => UpdateChart(30)}>
                1M
              </li>
              <li className={dataAmount === 365 && 'active'} onClick={() => UpdateChart(365)}>
                1Y
              </li>
              <li className={dataAmount === 999 && 'active'} onClick={() => UpdateChart(999)}>
                ALL
              </li>
            </ul>
          </RangeSelectorsWrapper>

          <ChartWrapper>
            <ResponsiveBar
              data={props.chartType === 'volume' ? mappedVolumeData : mappedLiquidityData}
              keys={['1', '137', '40', '56']}
              indexBy="date"
              groupMode="stacked"
              padding={0.3}
              renderWrapper={true}
              theme={{
                fontSize: 14,
                fontFamily: 'Poppins',
                textColor: getChartTextColor(),
              }}
              colors={getBarColor}
              axisBottom={{
                tickSize: 0,
                tickPadding: 15,
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
        <Flex
          sx={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner size={250} />
        </Flex>
      )}
    </Flex>
  )
}

export default Chart
