/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import React, { useState } from 'react'
import useIsMobile from '../../../../hooks/useIsMobile'
import Figure from './figure'
import { useFetchInfoUniswapFactories } from '../../../../state/info/hooks'
import { ShowcaseWrapper } from '../styles'

interface FiguresProps {
  switchChart: () => void
  sevenDayVolume: number
  liquidity: (input: number) => void
}

const Figures: React.FC<FiguresProps> = (props) => {
  const mobile = useIsMobile()
  const [chart, setChart] = useState('liquidity')

  const currentDayData = useFetchInfoUniswapFactories(true)
  const dayOldData = useFetchInfoUniswapFactories()
  const activeChains = JSON.parse(localStorage.getItem('infoActiveChains'))

  function checkDatasInitialized() {
    let total = 0
    for (let i = 0; i < Object.keys(currentDayData).length; i++) {
      const chain = Object.keys(currentDayData)[i]
      total += currentDayData[chain].initialized === true ? 1 : 0
    }
    for (let i = 0; i < Object.keys(dayOldData).length; i++) {
      const chain = Object.keys(dayOldData)[i]
      total += dayOldData[chain].initialized === true ? 1 : 0
    }

    if (total === Object.keys(currentDayData).length + Object.keys(dayOldData).length) {
      props.liquidity(calculateCurrentFigures('totalLiquidityUSD'))
    }
    return total === Object.keys(currentDayData).length + Object.keys(dayOldData).length
  }

  function calculateCurrentFigures(key: string) {
    let total = 0

    for (let i = 0; i < Object.keys(currentDayData).length; i++) {
      const chain = Object.keys(currentDayData)[i]
      // if (activeChains.includes(Number(chain))) {
      total += Number(currentDayData[chain].data[key])
      //  }
    }

    return total
  }

  function calculateOneDayFigures(key: string) {
    let total = 0
    for (let i = 0; i < Object.keys(dayOldData).length; i++) {
      const chain = Object.keys(dayOldData)[i]
      //  if (activeChains.includes(Number(chain))) {
      total += Number(dayOldData[chain].data[key])
      //  }
    }

    return total
  }

  function calculateFees() {
    return (calculateCurrentFigures('totalVolumeUSD') - calculateOneDayFigures('totalVolumeUSD')) * 0.002
  }

  function updateChart(input: string) {
    setChart(input)
    props.switchChart()
  }

  return (
    <Flex
      sx={{
        maxWidth: '100%',
        minHeight: '402px',
        height: '100%',
        background: 'white2',
        borderRadius: '10px',
        gap: '20px',
        padding: '20px',
        flex: `1 0 ${mobile ? '100%' : '40%'}`,
        flexWrap: 'wrap',
      }}
    >
      {checkDatasInitialized() === true && (
        <>
          <Figure
            label="Transactions (24h)"
            icon="chart"
            value={(calculateCurrentFigures('txCount') - calculateOneDayFigures('txCount')).toLocaleString()}
          />
          <Figure
            label="Liquidity"
            icon="dollar"
            clickable={true}
            value={Math.round(calculateCurrentFigures('totalLiquidityUSD')).toLocaleString()}
            highlighted={chart === 'liquidity'}
            onClick={() => updateChart('liquidity')}
          />
          <Figure
            label="Volume (24h)"
            icon="dollar"
            value={Math.round(
              calculateCurrentFigures('totalVolumeUSD') - calculateOneDayFigures('totalVolumeUSD'),
            ).toLocaleString()}
          />
          <Figure
            label="Volume (7d)"
            icon="dollar"
            clickable={true}
            value={Math.round((props.sevenDayVolume * 100) / 100).toLocaleString()}
            highlighted={chart === 'volume'}
            onClick={() => updateChart('volume')}
          />
          <Figure label="Fees (24h)" icon="dollar" value={(Math.round(calculateFees() * 100) / 100).toLocaleString()} />

          <Figure label="Pairs" icon="chart" value={calculateCurrentFigures('pairCount').toLocaleString()} />
          <ShowcaseWrapper>
            <a href="/farms">
              <img src="/images/info/farms-bg.png" alt="Farms Spotlight" />
            </a>
          </ShowcaseWrapper>
          <ShowcaseWrapper>
            <a href="/maximizers">
              <img src="/images/info/maximizers-bg.png" alt="Maximizers Spotlight" />
            </a>
          </ShowcaseWrapper>
        </>
      )}
    </Flex>
  )
}

export default Figures
