/** @jsxImportSource theme-ui */
import { Button, Flex, Svg, Text } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIsMobile from 'hooks/useIsMobile'
import useCurrentTime from 'hooks/useTimer'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFarms } from 'state/farms/hooks'
import { useMigrationPhase } from 'state/migrationTimer/hooks'
import { MigrationPhases } from 'state/migrationTimer/types'
import { useVaults } from 'state/vaults/hooks'

const MigrationRequiredPopup = () => {
  const { account } = useActiveWeb3React()
  const currentPhase = useMigrationPhase()
  const isMobile = useIsMobile()
  const farms = useFarms(account)
  const { vaults } = useVaults()
  const userHasFarmOrVault =
    [...farms, ...vaults].filter((product) => new BigNumber(product?.userData?.stakedBalance).gt(0))?.length > 0
  const [open, setOpen] = useState(true)
  return (
    open &&
    userHasFarmOrVault && (
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
            In order to continue earning rewards on your LP tokens, you must migrate them to the new MasterApe V2
            contract. The current MasterApe v1 contract will no longer grant rewards as of 1/1/1.
          </Text>
          <Text size="14px" weight={400} sx={{ lineHeight: 1.35 }}>
            Please visit our Migration page to migrate your tokens or learn more.
          </Text>
        </Flex>
        <Flex>
          <Button fullWidth mr="5px" as={Link} to="/migrate-v2" onClick={() => setOpen(false)}>
            Migrate
          </Button>
          <Button fullWidth ml="5px" sx={{ background: 'transparent', color: 'yellow' }} as={Link} to="">
            Learn More
          </Button>
        </Flex>
      </Flex>
    )
  )
}

export default MigrationRequiredPopup
