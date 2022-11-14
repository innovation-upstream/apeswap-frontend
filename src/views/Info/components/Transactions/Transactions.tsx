import React, { useEffect, useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import moment from 'moment/moment'
import { useTranslation } from '../../../../contexts/Localization'
import { CHAINS } from '../../config/config'
import { Row, Column, HeadingWrapper, RightArrowIcon, FiguresWrapper, BodyWrapper } from '../../styles'
import { transactionsQuery } from '../../queries'
import { HeadingContainer } from '../Tokens/Tokens'

interface Transaction {
  chain: string
  swaps: [
    {
      to: string
      amountUSD: number
      pair: {
        token0: {
          symbol: string
        }
        token1: {
          symbol: string
        }
      }
      amount0In: number
      amount0Out: number
      amount1In: number
      amount1Out: number
      transaction: {
        id: any
        timestamp: number
      }
    },
  ]
}

interface TransactionsProps {
  amount: number
}

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (min-width: 1200px) {
    flex-direction: row;
  }
`

const Transactions: React.FC<TransactionsProps> = (props) => {
  const { t } = useTranslation()
  const [state, setState] = useState({
    transactions: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionsQuery(props.amount)),
    }

    // Loop chains
    for (let i = 0; i < CHAINS.length; i++) {
      const chain = CHAINS[i].chain

      fetch(CHAINS[i].graphAddress, requestOptions)
        .then((res) => res.json())
        .then(async (result) => {
          for (let j = 0; j < result.data.transactions.length; j++) {
            result.data.transactions[j].chain = chain
            // Some come back with 0 swap data and it messes things up, not sure why but for now am just removing them (they might be a transcation that isn't a swap
            if (result.data.transactions[j].swaps.length === 0) {
              result.data.transactions.splice(j, 1)
            }
          }
          const temp = state.transactions
          setState({ transactions: temp.concat(result.data.transactions) })
        })
    }
    setIsLoading(false)
  }, [isLoading])

  function formatTime(unix: number) {
    const now = moment()
    const timestamp = moment.unix(unix)

    const inSeconds = now.diff(timestamp, 'second')
    const inMinutes = now.diff(timestamp, 'minute')
    const inHours = now.diff(timestamp, 'hour')
    const inDays = now.diff(timestamp, 'day')

    if (inHours >= 24) {
      return `${inDays} ${inDays === 1 ? 'day' : 'days'} ago`
    } else if (inMinutes >= 60) {
      return `${inHours} ${inHours === 1 ? 'hour' : 'hours'} ago`
    } else if (inSeconds >= 60) {
      return `${inMinutes} ${inMinutes === 1 ? 'minute' : 'minutes'} ago`
    } else {
      return `${inSeconds} ${inSeconds === 1 ? 'second' : 'seconds'} ago`
    }
  }

  return (
    <div>
      <HeadingContainer>
        <HeadingWrapper>
          <Text margin="20px 10px 5px 10px" className="heading">
            {t('Recent Transactions')}
          </Text>
          <Text style={{ float: 'right' }}>
            <a href="transactions">
              See more <RightArrowIcon />
            </a>
          </Text>
        </HeadingWrapper>
      </HeadingContainer>
      <Container>
        <FiguresWrapper>
          <BodyWrapper>
            <Row>
              <Column flex="2">{t('Info')}</Column>
              <Column>{t('Total Value')}</Column>
              <Column>{t('Token Amount')}</Column>
              <Column>{t('Token Amount')}</Column>
              <Column>{t('Account')}</Column>
              <Column>{t('Time')}</Column>
            </Row>
            {state.transactions
              .sort((a: Transaction, b: Transaction) =>
                a.swaps[0]?.transaction.timestamp
                  .toString()
                  .localeCompare(b.swaps[0]?.transaction.timestamp.toString()),
              )
              .reverse()
              .slice(0, props.amount)
              .map((tran: Transaction, index) => {
                return (
                  <Row key={tran.swaps[0].transaction.id} background={index % 2 === 0}>
                    <Column flex="2">
                      <img src={`/images/chains/${tran.chain}.png`} width="24px" className="logo" />
                      {`Swap ${tran.swaps[0]?.pair?.token0.symbol} for ${tran.swaps[0]?.pair?.token1.symbol}`}
                    </Column>
                    <Column>${(Math.round(tran.swaps[0]?.amountUSD * 100) / 100).toLocaleString()}</Column>
                    <Column>{`${Math.abs(tran.swaps[0]?.amount0In - tran.swaps[0]?.amount0Out).toLocaleString()} ${
                      tran.swaps[0]?.pair.token0.symbol
                    }`}</Column>
                    <Column>{`${Math.abs(tran.swaps[0]?.amount1In - tran.swaps[0]?.amount1Out).toLocaleString()} ${
                      tran.swaps[0]?.pair.token1.symbol
                    }`}</Column>
                    <Column>
                      <a
                        href={`${CHAINS.find((x) => x.chain === tran.chain)?.explorer}address/${tran.swaps[0]?.to}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tran.swaps[0]?.to.slice(0, 6) + '...' + tran.swaps[0]?.to.slice(38, 42)}
                      </a>
                    </Column>
                    <Column>{formatTime(tran.swaps[0]?.transaction.timestamp)}</Column>
                  </Row>
                )
              })}
          </BodyWrapper>
        </FiguresWrapper>
      </Container>
    </div>
  )
}

export default Transactions
