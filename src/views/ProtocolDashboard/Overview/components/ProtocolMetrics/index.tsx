/** @jsxImportSource theme-ui */
import { Flex, Svg, Text, TooltipBubble } from '@ape.swap/uikit'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import CountUp from 'react-countup'
import { useFetchOverviewProtocolMetrics } from 'state/protocolDashboard/hooks'
import { styles } from './styles'

const ProtocolMetrics: React.FC = () => {
  const protocolMetrics = useFetchOverviewProtocolMetrics()
  console.log(protocolMetrics)
  const { t } = useTranslation()
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', marginBottom: '20px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Protocol Metrics')}
        </Text>
      </Flex>
      {protocolMetrics?.map((data) => {
        return (
          <Flex sx={{ justifyContent: 'space-between', margin: '8.5px 0px' }} key={data.description}>
            <Flex sx={{ alignItems: 'center' }}>
              <Text weight={500} mr="5px">
                {t(data.description)}
              </Text>
              <TooltipBubble body="10">
                <Svg icon="info" width="15px" color="gray" />
              </TooltipBubble>
            </Flex>
            <Text weight={700}>
              <CountUp end={data.amount} decimals={2} duration={1} separator="," />
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default ProtocolMetrics
