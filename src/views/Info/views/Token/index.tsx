/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { HeadingContainer } from '../../components/Tokens/Tokens'
import { useFetchInfoNativePrice, useFetchInfoTokenDaysData } from '../../../../state/info/hooks'
import { useParams } from 'react-router-dom'
import { IconBox, Container, SectionsWrapper, Section, SearchInput, HeadingWrapper } from '../../styles'
import { Button, Text } from '@apeswapfinance/uikit'
import Pairs from '../../components/Pairs/Pairs'
import Transactions from '../../components/Transactions/Transactions'
import PageLoader from '../../../../components/PageLoader'
import { ResponsiveBar } from '@nivo/bar'
import moment from 'moment/moment'
import { CHAINS } from '../../config/config'
import useTheme from '../../../../hooks/useTheme'
import { CenteredImage } from '../../../Ifos/components/HowItWorks/styles'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

const ActionButton = styled(Button)`
  height: 44px;
  font-weight: 700;
  @media screen and (min-width: 1180px) {
    margin: 0 5px;
  }
`

const ActionWrapper = styled.div`
  flex: 2;
  text-align: right;
  height: 44px;
  padding-top: 35px;
`

const TokenPage: React.FC = () => {
  const history = useHistory()

  interface IconProps {
    name: string
  }

  const Icon = ({ name }: IconProps) => {
    const { isDark } = useTheme()

    return (
      <IconBox>
        <CenteredImage src={`/images/info/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
      </IconBox>
    )
  }

  const { chain, tokenId } = useParams<{ chain: string; tokenId: string }>()

  const [state, setState] = useState({
    displayedValue: 0,
    displayedValueDate: '',
  })

  const tokenDaysData = useFetchInfoTokenDaysData(Number(chain), tokenId)

  const nativePrices = useFetchInfoNativePrice()

  function getBarColor(bar: any) {
    return CHAINS.filter((x) => x.chainId == bar.id)[0].color
  }

  function processChartData() {
    const data = []

    for (let i = 0; i < tokenDaysData[chain].data.length; i++) {
      data.push({
        date: tokenDaysData[chain].data[i].date,
        [chain]: tokenDaysData[chain].data[i].dailyVolumeUSD,
      })
    }
    return data.reverse()
  }

  function checkChartDataInitialized() {
    return tokenDaysData[chain].data.length > 0
  }

  return (
    <>
      {tokenDaysData[chain].data !== null ? (
        <>
          <HeadingContainer>
            <HeadingWrapper>
              <img
                width="30px"
                className="logo"
                src={`https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenDaysData[chain].data[0].token.symbol}.svg`}
                onError={(e) => {
                  e.currentTarget.src = `/images/info/unknownToken.svg`
                }}
              />
              <Text margin="20px 10px 0px 10px" className="heading">
                {tokenDaysData[chain].data[0].token.name} ({tokenDaysData[chain].data[0].token.symbol})
              </Text>
              <ActionWrapper>
                <ActionButton onClick={() => history.push('/swap')}>Trade</ActionButton>
                <ActionButton onClick={() => history.push('/add-liquidity')}>Add Liquidity</ActionButton>
              </ActionWrapper>
            </HeadingWrapper>
          </HeadingContainer>
          <HeadingContainer>
            <HeadingWrapper>
              <Text margin="0px 10px 0px 10px" className="heading heading-large">
                ${(Math.round(tokenDaysData[chain].data[0].priceUSD * 100) / 100).toLocaleString()}
              </Text>
            </HeadingWrapper>
          </HeadingContainer>
          <Container className="small-mt">
            <SectionsWrapper>
              <Section className="left-section">
                <div className="sectionFrame">
                  <div className="figure figure-full">
                    <Icon name="chart" />
                    <Text className="figureValue">{tokenDaysData[chain].data[0].dailyTxns.toLocaleString()}</Text>
                    <Text fontSize="12px">Transactions (24h)</Text>
                  </div>
                  <div className="figure figure-full">
                    <Icon name="dollar" />
                    <Text className="figureValue">
                      ${(Math.round(tokenDaysData[chain].data[0].dailyVolumeUSD * 100) / 100).toLocaleString()}
                    </Text>
                    <Text fontSize="12px">Volume (24h)</Text>
                  </div>
                  <div className="figure figure-full">
                    <Icon name="dollar" />
                    <Text className="figureValue">
                      ${(Math.round(tokenDaysData[chain].data[0].totalLiquidityUSD * 100) / 100).toLocaleString()}
                    </Text>
                    <Text fontSize="12px">Liquidity</Text>
                  </div>
                </div>
              </Section>
              <Section className="right-section section-large">
                <div className="figure">
                  <Icon name="chart" />
                  {state.displayedValueDate ? (
                    <Text className="figureValue">${Math.round(state.displayedValue).toLocaleString()}</Text>
                  ) : (
                    <Text className="figureValue">
                      ${(Math.round(tokenDaysData[chain].data[0].dailyVolumeUSD * 100) / 100).toLocaleString()}
                    </Text>
                  )}
                  <Text fontSize="12px">
                    Volume (
                    {state.displayedValueDate
                      ? moment.unix(Number(state.displayedValueDate)).format('MMM DD, YYYY').valueOf()
                      : 'Last 24 hours'}
                    )
                  </Text>
                </div>
                <div className="graphFrame">
                  {checkChartDataInitialized() === true ? (
                    <ResponsiveBar
                      data={processChartData()}
                      keys={['1', '56', '137', '40']}
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
                        tickValues: [2000000, 4000000, 6000000, 8000000, 10000000],
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
                      onMouseEnter={(data, event) => {
                        setState({
                          displayedValue: data.value,
                          displayedValueDate: data.indexValue as string,
                        })
                      }}
                    />
                  ) : (
                    <div>Loading</div>
                  )}
                </div>
              </Section>
            </SectionsWrapper>
          </Container>
          <Pairs amount={75} filter={tokenId} />
          <Transactions amount={250} filter={tokenId} />
        </>
      ) : (
        <PageLoader />
      )}
    </>
  )
}

export default React.memo(TokenPage)
