/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import React, { useEffect, useState } from 'react'
import fetchTreasuryBreakdown from 'state/protocolDashboard/api'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import AssetCard from './AssetCard'
import { orderBy } from 'lodash'

const AssetBreakdown: React.FC = () => {
  const { t } = useTranslation()
  const [treasury, setTreasuryBreakdown] = useState(null)
  useEffect(() => {
    const getTreasury = async () => {
      setTreasuryBreakdown(await fetchTreasuryBreakdown())
    }
    getTreasury()
  }, [])

  const sortedTreasury = orderBy(
    [...(treasury?.operationalFundsTokens || []), ...(treasury?.lpTokens || [])],
    (token) => token?.value,
    'desc',
  )

  return (
    <Flex sx={styles.cardContainer}>
      <Flex sx={{ flexDirection: 'column', textAlign: 'center', mb: '5px' }}>
        <Text size="22px" weight={700} mb="10px">
          {t('Asset Breakdown')}
        </Text>
      </Flex>
      <div sx={styles.assetBreakdownContainer}>
        {sortedTreasury?.map((token) => (
          <AssetCard token={token} key={token?.address} />
        ))}
      </div>
    </Flex>
  )
}

export default AssetBreakdown
