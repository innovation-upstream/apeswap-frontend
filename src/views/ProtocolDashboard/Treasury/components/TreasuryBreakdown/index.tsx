import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { useFetchTreasuryAssetOverview } from 'state/protocolDashboard/hooks'
import AssetBreakdown from './AssetBreakdown'
import AssetOverview from './AssetOverview'
import { styles } from './styles'

const TreasuryBreakdown: React.FC = () => {
  const { t } = useTranslation()
  const treasury = useFetchTreasuryAssetOverview()
  console.log(treasury)
  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Treasury Breakdown')}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <AssetOverview />
        {/* <AssetBreakdown /> */}
      </Flex>
    </Flex>
  )
}

export default TreasuryBreakdown
