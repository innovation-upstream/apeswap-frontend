/** @jsxImportSource theme-ui */
import 'chart.js/auto'
import { Flex, Svg, Text, TooltipBubble } from '@ape.swap/uikit'
import React from 'react'
import { Line } from 'react-chartjs-2'
import useTheme from 'hooks/useTheme'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import CountUp from 'react-countup'

const ProtocolMetrics: React.FC = () => {
  const { t } = useTranslation()
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', marginBottom: '20px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Protocol Metrics')}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '7.5px 0px' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text weight={500} mr="5px">
            {t('BANANA Holders')}
          </Text>
          <TooltipBubble body="10">
            <Svg icon="info" width="15px" color="gray" />
          </TooltipBubble>
        </Flex>
        <Text weight={700}>
          <CountUp end={75534} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '7.5px 0px' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text weight={500} mr="5px">
            {t('Market Cap')}
          </Text>
          <TooltipBubble body="10">
            <Svg icon="info" width="15px" color="gray" />
          </TooltipBubble>
        </Flex>
        <Text weight={700}>
          $<CountUp end={66456.22} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '7.5px 0px' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text weight={500} mr="5px">
            {t('BANANA Burned')}
          </Text>
          <TooltipBubble body="10">
            <Svg icon="info" width="15px" color="gray" />
          </TooltipBubble>
        </Flex>
        <Text weight={700}>
          $<CountUp end={345456982} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '7.5px 0px' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text weight={500} mr="5px">
            {t('POL')}
          </Text>
          <TooltipBubble body="10">
            <Svg icon="info" width="15px" color="gray" />
          </TooltipBubble>
        </Flex>
        <Text weight={700}>
          <CountUp end={123456} decimals={2} duration={1} separator="," />
        </Text>
      </Flex>
    </Flex>
  )
}

export default ProtocolMetrics
