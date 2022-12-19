/** @jsxImportSource theme-ui */
import { Flex, Text, Button, Spinner, Svg } from '@ape.swap/uikit'
import React, { useState } from 'react'
import useIsMobile from '../../../../hooks/useIsMobile'
import Pairs from '../../components/Pairs'
import Transactions from '../../components/Transactions'
import {
  useFetchFavTokens,
  useFetchInfoBlock,
  useFetchInfoTokenDaysData,
  useFetchInfoTokensData,
} from '../../../../state/info/hooks'
import { useParams } from 'react-router-dom'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useHistory } from 'react-router-dom'
import LineChart from 'views/InfoPage/components/LineChart'
import { RangeSelectorsWrapper } from '../../components/styles'
import CountUp from 'react-countup'

const TokenPage = () => {
  const history = useHistory()
  const [favs, toggleFav] = useFetchFavTokens()

  const { chainId, tokenId } = useParams<{ chainId: string; tokenId: string }>()
  const [chartInfo, setChartInfo] = useState({ type: 'price', xField: 'date', yField: 'priceUSD' })

  const UpdateChartType = (type: string, xField: string, yField: string) => {
    setChartInfo({ type: type, xField: xField, yField: yField })
  }

  useFetchInfoBlock()
  const [dataAmount, setDataAmount] = useState(30)
  const tokenDaysData = useFetchInfoTokenDaysData(Number(chainId), tokenId, dataAmount)
  const tokenData = useFetchInfoTokensData(1, true, tokenId, Number(chainId))
  const tokenDayOldData = useFetchInfoTokensData(1, false, tokenId, Number(chainId))
  const mobile = useIsMobile()

  const calculate7DayVolume = () => {
    let total = 0

    for (let i = tokenDaysData[chainId].data.length - 7; i < tokenDaysData[chainId].data.length; i++) {
      total += Number(tokenDaysData[chainId].data[i].dailyVolumeUSD)
    }

    return total
  }

  const isFav = (token: string) => {
    return favs !== null && favs.filter((x) => x === token).length > 0
  }

  function percentageDifferenceText(previousValue: number, currentValue: number) {
    const value = ((currentValue - previousValue) / previousValue) * 100
    return (
      <Text fontSize="12px" color={value < 0 ? 'error' : 'success'} mt={0} mb={20}>
        <CountUp end={value} decimals={2} duration={1.5} />%
      </Text>
    )
  }

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Flex
        sx={{
          height: 'fit-content',
          width: '95vw',
          maxWidth: '1200px',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '40px 0px',
        }}
      >
        {tokenDaysData[chainId].data !== null &&
        tokenData[chainId].data !== null &&
        tokenData[chainId].data[0] !== [] &&
        tokenDayOldData[chainId].data !== null ? (
          <>
            <Flex
              sx={{
                width: '100%',
                justifyContext: 'flex-start',
              }}
              mb={20}
            >
              <Flex sx={{ width: '50%' }}>
                <a href="/info/tokens">&lt; All Tokens</a>
              </Flex>
              <Flex
                pl={6}
                onClick={() => toggleFav(tokenId)}
                sx={{
                  cursor: 'pointer',
                  justifyContent: 'flex-end',
                  width: '50%',
                }}
              >
                <Svg icon="Fav" color={isFav(tokenId) === true ? 'yellow' : 'gray'} />
              </Flex>
            </Flex>
            <Flex
              sx={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <Flex
                sx={{
                  width: `${mobile ? '100%' : '50%'}`,
                }}
              >
                <ServiceTokenDisplay token1={tokenDaysData[chainId].data[0].token.symbol} size={25} />
                <Text margin="10px 10px 0px 10px" weight={700} size="20px">
                  {tokenDaysData[chainId].data[0].token.name}
                </Text>
                <Text margin="10px 10px 0px 0px" weight={400} size="20px" opacity={0.6}>
                  ({tokenDaysData[chainId].data[0].token.symbol})
                </Text>
              </Flex>
              <Flex
                sx={{
                  width: `${mobile ? '100%' : '50%'}`,
                  justifyContent: 'flex-end',
                }}
              >
                <Button onClick={() => history.push(`/add-liquidity/ETH/${tokenId}`)}>Add Liquidity</Button>
                <Button onClick={() => history.push('/swap')} ml={20}>
                  Trade
                </Button>
              </Flex>
            </Flex>

            <Flex
              sx={{
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Text margin="20px 10px 0px 10px" weight={700} size="35px">
                ${(Math.round(tokenDaysData[chainId].data[0].priceUSD * 100) / 100).toLocaleString()}
              </Text>
            </Flex>

            <Flex
              sx={{
                gap: '20px',
                width: `${mobile ? '95vw' : '100%'}`,
                maxWidth: '1200px',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Flex
                sx={{
                  width: `${mobile ? '100%' : '300px'}`,
                  height: '440px',
                  background: 'white2',
                  flexDirection: 'column',
                  padding: '30px',
                  borderRadius: '10px',
                  mt: '20px',
                }}
              >
                <Text margin="0px 10px 0px 0px" weight={500} size="16px" opacity={0.6}>
                  Total Liquidity
                </Text>
                <Text margin="5px 10px 5px 0px" weight={700} size="25px">
                  $
                  {(
                    Math.round(
                      tokenData[chainId].data[0].totalLiquidity * tokenDaysData[chainId].data[0].priceUSD * 100,
                    ) / 100
                  ).toLocaleString('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    useGrouping: true,
                    notation: 'compact',
                    compactDisplay: 'short',
                  })}
                </Text>
                {percentageDifferenceText(
                  tokenDayOldData[chainId].data[0].totalLiquidity,
                  tokenData[chainId].data[0].totalLiquidity,
                )}
                <Text margin="0px 10px 0px 0px" weight={500} size="16px" opacity={0.6}>
                  24h Trading Vol
                </Text>
                <Text margin="5px 10px 30px 0px" weight={700} size="25px">
                  $
                  {(
                    Math.round(
                      (tokenData[chainId].data[0].tradeVolumeUSD - tokenDayOldData[chainId].data[0].tradeVolumeUSD) *
                        100,
                    ) / 100
                  ).toLocaleString('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    useGrouping: true,
                    notation: 'compact',
                    compactDisplay: 'short',
                  })}
                </Text>
                <Text margin="0px 10px 0px 0px" weight={500} size="16px" opacity={0.6}>
                  7d Trading Vol
                </Text>
                <Text margin="5px 10px 30px 0px" weight={700} size="25px">
                  {`$${Math.round((calculate7DayVolume() * 100) / 100).toLocaleString('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    useGrouping: true,
                    notation: 'compact',
                    compactDisplay: 'short',
                  })}`}
                </Text>
                <Text margin="0px 10px 0px 0px" weight={500} size="16px" opacity={0.6}>
                  24h Fees
                </Text>
                <Text margin="5px 10px 5px 0px" weight={700} size="25px">
                  $
                  {Math.round(
                    ((tokenData[chainId].data[0].tradeVolumeUSD - tokenDayOldData[chainId].data[0].tradeVolumeUSD) *
                      0.002 *
                      100) /
                      100,
                  ).toLocaleString('en-US', {
                    style: 'decimal',
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                    useGrouping: true,
                    notation: 'compact',
                    compactDisplay: 'short',
                  })}
                </Text>
              </Flex>
              <Flex
                sx={{
                  flex: '1',
                  height: '440px',
                  background: 'white2',
                  flexDirection: 'column',
                  padding: '10px',
                  borderRadius: '10px',
                  mt: '20px',
                }}
              >
                <Flex>
                  <Flex sx={{ width: '50%' }}>
                    <RangeSelectorsWrapper>
                      <ul>
                        <li
                          className={chartInfo.type === 'price' && 'active'}
                          onClick={() => UpdateChartType('price', 'date', 'priceUSD')}
                        >
                          Price
                        </li>
                        <li
                          className={chartInfo.type === 'volume' && 'active'}
                          onClick={() => UpdateChartType('volume', 'date', 'dailyVolumeUSD')}
                        >
                          Volume
                        </li>
                        <li
                          className={chartInfo.type === 'liquidity' && 'active'}
                          onClick={() => UpdateChartType('liquidity', 'date', 'totalLiquidityUSD')}
                        >
                          Liquidity
                        </li>
                      </ul>
                    </RangeSelectorsWrapper>
                  </Flex>
                  <Flex sx={{ width: '50%', justifyContent: 'right' }} mr={5}>
                    <RangeSelectorsWrapper>
                      <ul>
                        <li className={dataAmount === 7 && 'active'} onClick={() => setDataAmount(7)}>
                          1W
                        </li>
                        <li className={dataAmount === 30 && 'active'} onClick={() => setDataAmount(30)}>
                          1M
                        </li>
                        <li className={dataAmount === 365 && 'active'} onClick={() => setDataAmount(365)}>
                          1Y
                        </li>
                        <li className={dataAmount === 999 && 'active'} onClick={() => setDataAmount(999)}>
                          ALL
                        </li>
                      </ul>
                    </RangeSelectorsWrapper>
                  </Flex>
                </Flex>
                <LineChart
                  data={tokenDaysData[chainId].data}
                  xField={chartInfo.xField}
                  yField={chartInfo.yField}
                  type={chartInfo.type}
                />
              </Flex>
            </Flex>

            {/*BREAK*/}

            <Pairs
              token={tokenId}
              headerText={`${tokenDaysData[chainId].data[0].token.symbol} Pairs`}
              chain={Number(chainId)}
            />
            <Transactions headerText="Transactions" token={tokenId} chain={Number(chainId)} />
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
    </Flex>
  )
}

export default TokenPage
