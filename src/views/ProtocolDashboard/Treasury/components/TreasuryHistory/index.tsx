/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import React, { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import stubData from './stubData'
import { styles } from './styles'
import useTheme from 'hooks/useTheme'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { useFetchTreasuryHistory } from 'state/protocolDashboard/hooks'
import { TreasuryHistoryInterface } from 'state/protocolDashboard/types'

const setData = (treasuryHistory: TreasuryHistoryInterface[]) => {
  return {
    labels: treasuryHistory?.map((data) => data.timestamp),
    datasets: [
      {
        label: 'treasury',
        data: treasuryHistory?.map((data) => data.oppFundValue),
        backgroundColor: 'rgba(243, 186, 47, .5)',
        fill: true,
        lineTension: 0.3,
      },
      {
        label: 'polValue',
        data: treasuryHistory?.map((data) => data.polValue),
        backgroundColor: 'rgba(77, 64, 64, 0.5)',
        borderColor: 'white',
        fill: true,
        lineTension: 0.3,
      },
    ],
  }
}

const TreasuryHistory: React.FC = () => {
  const treasuryHistory = useFetchTreasuryHistory()
  const { theme } = useTheme()
  const data = useMemo(() => setData(treasuryHistory), [treasuryHistory])
  const totalPol = treasuryHistory?.reduce((a, b) => a + b.polValue, 0)
  const totalTreasury = treasuryHistory?.reduce((a, b) => a + b.oppFundValue, 0)

  const { t } = useTranslation()

  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', marginBottom: '10px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Treasury & Protcol Owned Liquidity')}
        </Text>
        <Text size="16px" weight={500}>
          $<CountUp end={totalPol + totalTreasury} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>

      <Flex sx={{ position: 'absolute', flexWrap: 'wrap', flexDirection: 'column', top: '90px', left: '50px' }}>
        <Flex sx={{ alignItems: 'center', flexWrap: 'no-wrap', margin: '10px 0px' }}>
          <Flex
            sx={{ background: 'rgba(243, 186, 47, 1)', width: '25px', height: '10px', borderRadius: '10px', mr: '5px' }}
          />
          <Flex sx={{ alignItems: 'center', justifyContnet: 'center' }}>
            <Text weight={700} mr="5px" sx={{ lineHeight: '10px' }}>
              Treasury
            </Text>
            <Text sx={{ lineHeight: '10px' }}>
              $<CountUp end={totalTreasury} decimals={2} duration={1} separator="," />
            </Text>
          </Flex>
        </Flex>
        <Flex sx={{ alignItems: 'center', flexWrap: 'no-wrap', margin: '10px 0px' }}>
          <Flex
            sx={{ background: 'rgba(77, 64, 64, 1)', width: '25px', height: '10px', borderRadius: '10px', mr: '5px' }}
          />
          <Flex sx={{ alignItems: 'center', justifyContnet: 'center' }}>
            <Text weight={700} mr="5px" sx={{ lineHeight: '10px' }}>
              Protcol Owned Liquidity
            </Text>
            <Text sx={{ lineHeight: '10px' }}>
              $<CountUp end={totalPol} decimals={2} duration={1} separator="," />
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex sx={{ maxWidth: '100%', width: '99%', height: '100%' }}>
        <Line
          data={data}
          options={{
            color: theme.colors.text,
            elements: {
              point: {
                radius: 0,
              },
            },
            scales: {
              y: {
                grid: { display: false, drawBorder: false },
                ticks: { display: false },
              },
              x: {
                grid: { display: false, drawBorder: false },
                ticks: { display: false },
              },
            },
            plugins: {
              legend: {
                display: false,
                position: 'bottom',
                fullSize: true,
                labels: {
                  color: theme.colors.text,
                  font: { family: 'poppins', weight: '600' },
                },
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </Flex>
    </Flex>
  )
}

export default TreasuryHistory
