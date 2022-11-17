/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { CHAIN_PARAMS } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import CountUp from 'react-countup'
import { Swaps } from 'state/info/types'
import { Grid } from 'theme-ui'
import getTimePeriods from 'utils/getTimePeriods'

const Rows = ({ transactions }: { transactions: Swaps[] }) => {
  const { t } = useTranslation()
  const currentTime = useCurrentTime()

  return (
    <Flex
      sx={{
        width: '100%',
        maxWidth: '1200px',
        height: '500px',
        flexDirection: 'column',
        overflowX: 'scroll',
        overflowY: 'hidden',
        '-ms-overflow-style': 'none',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Grid
        gap="0px"
        columns={[`.05fr 3.5fr 1.5fr 2fr 2fr  1.5fr 2fr`]}
        sx={{ minHeight: '40px', alignItems: 'center', minWidth: '850px' }}
      >
        <span />
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Swaps')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Total Value')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Token 1')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Token 2')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Address')}
        </Text>
        <Text size="14px" weight={700} sx={{ alignSelf: 'center' }}>
          {t('Time')}
        </Text>
      </Grid>
      <Flex sx={{ flexDirection: 'column', height: '500px' }}>
        {transactions.map(
          ({ amount0In, amount0Out, amount1In, amount1Out, amountUSD, pair, to, transaction, chainId }, index) => {
            const { id, timestamp } = transaction
            const { token0, token1 } = pair
            const token0Amount = Math.abs(parseFloat(amount0In) - parseFloat(amount0Out))
            const token1Amount = Math.abs(parseFloat(amount1In) - parseFloat(amount1Out))
            const transactionTime = getTimePeriods(currentTime / 1000 - parseFloat(timestamp))
            const timeToDisplay = () => {
              if (transactionTime.days > 0) {
                return transactionTime.days === 1
                  ? transactionTime.days + ' day ago'
                  : transactionTime.days + ' days ago'
              }
              if (transactionTime.minutes > 0) {
                return transactionTime.minutes === 1
                  ? transactionTime.minutes + ' minute ago'
                  : transactionTime.minutes + ' minutes ago'
              }
              if (transactionTime.seconds > 0) {
                return transactionTime.seconds.toFixed(0) + ' seconds ago'
              }
            }
            return (
              <Grid
                key={`${token0.id}-${id}-${to}-${amount0In}-${token1.id}`}
                gap="0px"
                columns={[`.05fr  3.5fr 1.5fr 2fr 2fr 1.5fr 2fr`]}
                sx={{
                  background: index % 2 === 0 ? 'white3' : 'white2',
                  height: '40px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '850px',
                }}
              >
                <span />
                <Flex sx={{ alignItems: 'center' }}>
                  <ServiceTokenDisplay token1={CHAIN_PARAMS[chainId]?.nativeCurrency.symbol} size={20} />
                  <Text size="14px" weight={400} ml="10px">
                    Swap {`${token0.symbol} > ${token1.symbol}`}
                  </Text>
                </Flex>
                <Flex>
                  {' '}
                  <Text size="14px" weight={400}>
                    $
                    <CountUp
                      start={parseFloat(amountUSD)}
                      end={parseFloat(amountUSD)}
                      duration={0}
                      decimals={2}
                      separator=","
                    />
                  </Text>
                </Flex>
                <Flex>
                  {' '}
                  <Text size="14px" weight={400}>
                    <CountUp
                      start={token0Amount}
                      end={token0Amount}
                      duration={0}
                      decimals={token0Amount?.toLocaleString()?.length > 5 ? 5 : token0Amount?.toLocaleString()?.length}
                      separator=","
                    />{' '}
                    {token0.symbol}
                  </Text>
                </Flex>
                <Flex>
                  {' '}
                  <Text size="14px" weight={400}>
                    <CountUp
                      start={token1Amount}
                      end={token1Amount}
                      decimals={token1Amount?.toLocaleString()?.length > 5 ? 5 : token1Amount?.toLocaleString()?.length}
                      duration={0}
                      separator=","
                    />{' '}
                    {token1.symbol}
                  </Text>
                </Flex>
                <Flex>
                  <Text size="14px" weight={400}>
                    {`${to.slice(0, 4)}...${to.slice(to.length - 4, to.length)}`}
                  </Text>
                </Flex>
                <Flex>
                  {' '}
                  <Text size="14px" weight={400}>
                    {timeToDisplay()}
                  </Text>
                </Flex>
              </Grid>
            )
          },
        )}
      </Flex>
    </Flex>
  )
}

export default React.memo(Rows)
