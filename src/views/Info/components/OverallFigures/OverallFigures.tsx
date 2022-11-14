import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import moment from 'moment/moment'
import useTheme from '../../../../hooks/useTheme'
import { CenteredImage } from '../../../Ifos/components/HowItWorks/styles'
import { IconBox } from '../../styles'
import { daysDataQuery, graphQuery, uniswapFactoriesQuery } from '../../queries'
import { CHAINS } from '../../config/config'
import { ResponsiveBar } from '@nivo/bar'

interface IconProps {
  name: string
}

interface OverallFigureProps {
  nativePrices: any
  oneDayBlocks: any
}

const Icon = ({ name }: IconProps) => {
  const { isDark } = useTheme()

  return (
    <IconBox>
      <CenteredImage src={`/images/info/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
    </IconBox>
  )
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

export const SectionsWrapper = styled.div`
  position: relative;
  max-width: 1412px;
  width: 95vw;
  z-index: 1;
  align-items: center;
  @media screen and (min-width: 1200px) {
    width: 95vw;
    display: flex;
    flex-direction: row;
    padding: 0px;
  }
`

export const Section = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white2};
  border-radius: 10px;
  z-index: 1;
  padding: 15px 20px 0px 20px;
  :first-child {
    margin-right: 20px;
  }
  :last-child {
    margin-left: 20px;
  }
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: grid;
    grid-template-rows: 50px 150px 20px;
    width: 95vw;
    padding: 20px calc(40% - 200px);
  }
  @media screen and (min-width: 1200px) {
    width: 95vw;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
  }

  .figure {
    flex-grow: 1;
    width: 33.33%;
    padding: 10px 0px;

    .figureValue {
      font-weight: 600;
    }
  }

  .showcase {
    width: calc(50% - 10px);
    margin-bottom: 10px;
  }

  .graphFrame {
    height: 388px;
    width: 100%;
  }
`

const OverallFigures: React.FC<OverallFigureProps> = (props) => {
  const [state, setState] = useState({
    currentDayData: [],
    oneDayData: [],
    graphData: [],
  })

  const [isLoading, setIsLoading] = useState(false)

  function getBarColor(bar: any) {
    if (bar.id === 'bnb') return '#FAB701'

    if (bar.id === 'polygon') return '#8C3EED'

    if (bar.id === 'telos') return '#9D68E8'

    return '#637DEA'
  }

  useEffect(() => {
    setIsLoading(true)

    const currentTime = moment()
    const oneDayBack = currentTime.subtract(2, 'day').unix()

    for (let i = 0; i < CHAINS.length; i++) {
      const chain = CHAINS[i].chain

      const oneDayBackRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(daysDataQuery(oneDayBack)),
      }

      const uniswapFactoriesRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(uniswapFactoriesQuery(CHAINS[i].id, props.oneDayBlocks[chain])),
      }

      const graphRequestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(graphQuery()),
      }

      fetch(CHAINS[i].graphAddress, oneDayBackRequestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          const temp = state.currentDayData
          temp[chain] = result.data.uniswapDayDatas[0]

          setState({
            currentDayData: temp,
            oneDayData: state.oneDayData,
            graphData: state.graphData,
          })
        })

      //This gets the data 24 hours ago
      fetch(CHAINS[i].graphAddress, uniswapFactoriesRequestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          const temp = state.oneDayData
          temp[chain] = result.data.uniswapFactories[0]

          setState({
            currentDayData: state.currentDayData,
            oneDayData: temp,
            graphData: state.graphData,
          })
        })

      fetch(CHAINS[i].graphAddress, graphRequestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          //First one - run that dates
          if (state.graphData.length === 0) {
            //Make an array for just the dates
            const temp = []

            for (let j = 0; j < result.data.uniswapDayDatas.length; j++) {
              temp.push({
                date: result.data.uniswapDayDatas[j].date,
                [chain]: result.data.uniswapDayDatas[j].dailyVolumeUSD,
              })
            }
            setState({
              graphData: temp,
              currentDayData: state.currentDayData,
              oneDayData: state.oneDayData,
            })
          } else {
            const temp = state.graphData
            for (let j = 0; j < result.data.uniswapDayDatas.length; j++) {
              temp[j][chain] = result.data.uniswapDayDatas[j].dailyVolumeUSD
              //temp[j].data.push({ chain: chain, dailyVolumeUSD: result.data.uniswapDayDatas[j].dailyVolumeUSD })
            }
            setState({ graphData: temp, currentDayData: state.currentDayData, oneDayData: state.oneDayData })
          }
        })
    }

    setIsLoading(false)
  }, [isLoading])

  function calculateCurrentFigures(key: string) {
    let total = 0
    for (let i = 0; i < CHAINS.length; i++) {
      total += Number(state.currentDayData[CHAINS[i].chain][key])
    }

    return total
  }

  function calculateOneDayFigures(key: string) {
    let total = 0
    for (let i = 0; i < CHAINS.length; i++) {
      total += Number(state.oneDayData[CHAINS[i].chain][key])
    }

    return total
  }

  return (
    <>
      {Object.keys(state.currentDayData).length === CHAINS.length &&
      Object.keys(state.oneDayData).length === CHAINS.length ? (
        <div>
          <Container>
            <SectionsWrapper>
              <Section>
                <div className="figure">
                  <Icon name="chart" />
                  <Text className="figureValue">
                    {(calculateCurrentFigures('txCount') - calculateOneDayFigures('txCount')).toLocaleString()}
                  </Text>
                  <Text fontSize="12px">Transactions (24h)</Text>
                </div>
                <div className="figure">
                  <Icon name="dollar" />
                  <Text className="figureValue">
                    {Math.round(calculateCurrentFigures('totalLiquidityUSD')).toLocaleString()}
                  </Text>
                  <Text fontSize="12px">Liquidity</Text>
                </div>
                <div className="figure">
                  <Icon name="dollar" />
                  <Text className="figureValue">
                    {Math.round(calculateCurrentFigures('dailyVolumeUSD')).toLocaleString()}
                  </Text>
                  <Text fontSize="12px">Volume (24h)</Text>
                </div>
                <div className="figure">
                  <Icon name="dollar" />
                  <Text className="figureValue">
                    {Math.round(calculateCurrentFigures('dailyVolumeUSD')).toLocaleString()}
                  </Text>
                  <Text fontSize="12px">Volume (7d)</Text>
                </div>
                <div className="figure">
                  <Icon name="dollar" />
                  <Text className="figureValue">
                    ${(Math.round(calculateCurrentFigures('dailyVolumeUSD') * 0.002 * 100) / 100).toLocaleString()}
                  </Text>
                  <Text fontSize="12px">Fees (24h)</Text>
                </div>
                <div className="figure">
                  <Icon name="chart" />
                  <Text className="figureValue">{calculateOneDayFigures('pairCount').toLocaleString()}</Text>
                  <Text fontSize="12px">Pairs</Text>
                </div>
                {/*Placeholders for sizing*/}
                <img src="/images/info/farms-bg.png" className="showcase" />
                <img src="/images/info/maximizers-bg.png" className="showcase" />
              </Section>
              <Section>
                <div className="graphFrame">
                  {state.graphData.length > 0 ? (
                    <ResponsiveBar
                      data={state.graphData}
                      keys={['ethereum', 'bnb', 'polygon', 'telos']}
                      indexBy="date"
                      groupMode="stacked"
                      padding={0.3}
                      theme={{
                        fontSize: 14,
                        textColor: '#333333',
                      }}
                      colors={getBarColor}
                      axisBottom={{
                        tickSize: 0,
                        tickPadding: 10,
                        tickRotation: 0,
                        format: (x) =>
                          moment.unix(x).format('DD').valueOf() == '01' ? moment.unix(x).format('MMM').valueOf() : '',
                      }}
                      axisLeft={null}
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      axisTop={null}
                      axisRight={{
                        tickValues: [
                          6000000, 9000000, 12000000, 15000000, 18000000, 21000000, 24000000, 27000000, 30000000,
                          33000000, 36000000,
                        ],
                        tickSize: 0,
                        tickPadding: -82,
                        tickRotation: 0,
                        legend: '',
                        legendOffset: 0,
                        format: (x) => `$${x.toLocaleString('en-US')}`,
                      }}
                      enableLabel={false}
                      enableGridX={false}
                      enableGridY={false}
                      animate={false}
                      tooltip={() => <></>}
                      margin={{ top: 0, right: 0, bottom: 25, left: 0 }}
                    />
                  ) : (
                    <div>Loading</div>
                  )}
                </div>
              </Section>
            </SectionsWrapper>
          </Container>
        </div>
      ) : null}
    </>
  )
}

export default OverallFigures
