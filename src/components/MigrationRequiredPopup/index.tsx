/** @jsxImportSource theme-ui */
import { Button, Flex, Svg, Text } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIsMobile from 'hooks/useIsMobile'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMigrationPhase } from 'state/migrationTimer/hooks'
import { MigrationPhases } from 'state/migrationTimer/types'
import { useVaults } from 'state/vaults/hooks'
import { useFarms, usePollFarms } from 'state/farms/hooks'
import { useFarmsV2, usePollFarmsV2 } from 'state/farmsV2/hooks'
import { usePollVaultsData, usePollVaultUserData } from 'state/vaults/hooks'
import { usePollVaultsV3Data, usePollVaultV3UserData } from 'state/vaultsV3/hooks'
import { CURRENT_MIGRATE_PATH } from 'components/Menu/chains/bscConfig'
import { useTranslation } from 'contexts/Localization'
import {
  useMergedV1Products,
  useMergedV2Products,
  useMigrateStatus,
  useMonitorActiveIndex,
  useSetInitialMigrateStatus,
  useSetMigrationLoading,
} from 'state/masterApeMigration/hooks'

const MigrationRequiredPopup = () => {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  // TODO: Remove after the migration process
  useSetInitialMigrateStatus()
  useSetMigrationLoading()
  useMonitorActiveIndex()
  useMergedV1Products()
  useMergedV2Products()
  useMigrateStatus()
  // Loading migration data on load.
  // This should be removed after the migration process has finished
  // This has high performance impact
  usePollVaultsData()
  usePollVaultUserData()
  usePollVaultsV3Data()
  usePollVaultV3UserData()
  usePollFarms()
  usePollFarmsV2()
  useFarms(account)
  useFarmsV2(account)
  const currentPhase = useMigrationPhase()
  const isMobile = useIsMobile()
  const farms = useFarms(account)
  const v2Farms = useFarmsV2(null)
  const { vaults } = useVaults()
  const { pathname } = useLocation()
  // Filter out farms that do not exists on v2Farms
  const filteredFarms = farms?.filter(({ tokenAddresses }) => {
    return v2Farms?.find(({ tokenAddresses: tokenAddressV2 }) => {
      return tokenAddressV2[chainId]?.toLowerCase() === tokenAddresses[chainId]?.toLowerCase()
    })
  })
  const filteredVaults = vaults?.filter(({ stakeToken }) => {
    return v2Farms?.find(({ tokenAddresses }) => {
      return tokenAddresses[chainId]?.toLowerCase() === stakeToken[chainId]?.toLowerCase()
    })
  })
  const userHasFarmOrVault =
    [...filteredFarms, ...filteredVaults].filter((product) => new BigNumber(product?.userData?.stakedBalance).gt(0))
      ?.length > 0
  const [open, setOpen] = useState(true)
  const onMigration = pathname.includes(CURRENT_MIGRATE_PATH)
  return (
    open &&
    !onMigration &&
    userHasFarmOrVault &&
    currentPhase !== MigrationPhases.MIGRATE_PHASE_0 && (
      <Flex
        sx={{
          position: 'fixed',
          flexDirection: 'column',
          padding: isMobile ? '10px' : '15px',
          maxWidth: '400px',
          alignSelf: 'center',
          top: 100,
          right: isMobile ? 'auto' : 50,
          margin: isMobile ? '0px 5px' : 'auto',
          background: 'white3',
          borderRadius: '10px',
          zIndex: 999,
        }}
      >
        <Flex sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Flex>
            <Svg icon="info" width={20} />
            <Text size="22px" weight={700} ml="10px">
              {currentPhase === MigrationPhases.MIGRATE_PHASE_2 ? 'Migration Required' : 'Migration Starting Soon'}
            </Text>
          </Flex>
          <Text weight={500} size="20px" sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>
            x
          </Text>
        </Flex>
        <Flex sx={{ margin: '15px 0px', flexDirection: 'column', alignSelf: 'center' }}>
          <Text size="14px" weight={400} sx={{ lineHeight: 1.35 }}>
            {t(`In order to continue earning rewards on your staked tokens, you must migrate them to the new MasterApe V2
            contract. The current MasterApe v1 contract will no longer grant rewards as of January 26th, 22:00 UTC`)}
          </Text>
          <Text size="14px" weight={400} sx={{ lineHeight: 1.35 }}>
            {t('Please visit our Migration page to migrate your tokens or learn more.')}
          </Text>
        </Flex>
        <Flex>
          <Button fullWidth mr="5px" as={Link} to={CURRENT_MIGRATE_PATH} onClick={() => setOpen(false)}>
            {t('Migrate')}
          </Button>
          <a
            href="https://ape-swap.medium.com/apeswap-upgrades-contracts-to-implement-hard-cap-88de5e5f4c94"
            target="_blank"
            rel="noreferrer noopener"
            sx={{ width: '100%' }}
          >
            <Button fullWidth ml="5px" sx={{ background: 'transparent', color: 'yellow' }}>
              {t('Learn More')}
            </Button>
          </a>
        </Flex>
      </Flex>
    )
  )
}

export default MigrationRequiredPopup
