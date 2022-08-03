/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import React, { useEffect, useState } from 'react'
import { orderBy } from 'lodash'
import { useFetchTreasuryBreakdown } from 'state/protocolDashboard/hooks'
import fetchTreasuryBreakdown from 'state/protocolDashboard/api'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import AssetCard from './AssetCard'

const AssetBreakdown: React.FC = () => {
  const { t } = useTranslation()
  const treasury = useFetchTreasuryBreakdown()
  console.log(treasury)

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
