import React, { useEffect, useState } from 'react'
import { Flex, Text } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import moment from 'moment/moment'
import useTheme from '../../../../hooks/useTheme'
import { CenteredImage } from '../../../Ifos/components/HowItWorks/styles'
import { IconBox } from '../../styles'

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
`

const OverallFigures: React.FC<any> = (props) => {
  const [state, setState] = useState({
    dailyVolumeUSD: 0,
    totalLiquidityUSD: 0,
  })

  useEffect(() => {
    const currentTime = moment()
    const oneDayBack = currentTime.subtract(2, 'day').unix()

    const query = {
      query:
        'query uniswapDayDatas {\n' +
        '    uniswapDayDatas(first: 1, skip: 0, where: { date_gt: ' +
        oneDayBack +
        ' }, orderBy: date, orderDirection: asc) {\n' +
        '      id\n' +
        '      date\n' +
        '      totalVolumeUSD\n' +
        '      dailyVolumeUSD\n' +
        '      dailyVolumeETH\n' +
        '      totalLiquidityUSD\n' +
        '      totalLiquidityETH\n' +
        '    }\n' +
        '  }',
    }

    const url = 'https://bnb.apeswapgraphs.com/subgraphs/name/ape-swap/apeswap-subgraph'

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
    }

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then(async (result) => {
        setState({
          dailyVolumeUSD: result.data.uniswapDayDatas[0].dailyVolumeUSD,
          totalLiquidityUSD: result.data.uniswapDayDatas[0].totalLiquidityUSD,
        })
      })
  }, [])

  return (
    <div>
      <Container>
        <SectionsWrapper>
          <Section>
            <div className="figure">
              <Icon name="chart" />
              <Text className="figureValue">{Math.round(state.dailyVolumeUSD).toLocaleString()}</Text>
              <Text fontSize="12px">Transactions (24h)</Text>
            </div>
            <div className="figure">
              <Icon name="dollar" />
              <Text className="figureValue">{Math.round(state.dailyVolumeUSD).toLocaleString()}</Text>
              <Text fontSize="12px">Liquidity</Text>
            </div>
            <div className="figure">
              <Icon name="dollar" />
              <Text className="figureValue">{Math.round(state.dailyVolumeUSD).toLocaleString()}</Text>
              <Text fontSize="12px">Volume (24h)</Text>
            </div>
            <div className="figure">
              <Icon name="dollar" />
              <Text className="figureValue">{Math.round(state.dailyVolumeUSD).toLocaleString()}</Text>
              <Text fontSize="12px">Volume (7d)</Text>
            </div>
            <div className="figure">
              <Icon name="dollar" />
              <Text className="figureValue">{Math.round(state.dailyVolumeUSD).toLocaleString()}</Text>
              <Text fontSize="12px">Fees (24h)</Text>
            </div>
            <div className="figure">
              <Icon name="chart" />
              <Text className="figureValue">{Math.round(state.dailyVolumeUSD).toLocaleString()}</Text>
              <Text fontSize="12px">Pairs</Text>
            </div>
            {/*Placeholders for sizing*/}
            <img src="/images/info/farms-bg.png" className="showcase" />
            <img src="/images/info/maximizers-bg.png" className="showcase" />
          </Section>
          <Section>
            <Flex
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="space-between"
              style={{ width: '100%', marginBottom: 20 }}
            >
              <Flex flexDirection="column"></Flex>
              <Flex flexDirection="column"></Flex>
              <Flex flexDirection="column"></Flex>
            </Flex>
            <Flex flexWrap="wrap" justifyContent="space-between" alignItems="space-between" style={{ width: '100%' }}>
              <Flex flexDirection="column"></Flex>
              <Flex flexDirection="column"></Flex>
              <Flex flexDirection="column"></Flex>
            </Flex>
          </Section>
        </SectionsWrapper>
      </Container>
    </div>
  )
}

export default OverallFigures
