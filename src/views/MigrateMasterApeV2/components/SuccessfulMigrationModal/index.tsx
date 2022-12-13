import { Flex, Modal, Svg, Text, Link } from '@ape.swap/uikit'
import React from 'react'
import { Image } from 'theme-ui'
import { MigrationCompleteLog } from '../../provider/types'

const SuccessfulMigrationModal: React.FC<{ migrationCompleteLog: MigrationCompleteLog[] }> = ({
  migrationCompleteLog,
}) => {
  return (
    <Modal maxWidth="400px" minWidth="350px" zIndex={98} title="Successful Migration! 🎉" onDismiss={null}>
      <Flex sx={{ background: 'white2', flexDirection: 'column', width: '100%' }}>
        <Flex sx={{ margin: '10px 0px' }}>
          <Text size="14px">Your LPs have been migrated and staked on ApeSwap.</Text>
        </Flex>
        <Flex
          sx={{
            flexDirection: 'column',
            width: '100%',
            mt: '10px',
            background: 'white3',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          {migrationCompleteLog?.map(({ lpSymbol, location, stakeAmount }) => {
            return (
              <Flex key={lpSymbol} sx={{ justifyContent: 'space-between', margin: '2.5px 0px' }}>
                <Flex sx={{ alignItems: 'center' }}>
                  <Svg icon="success" width="15px" />
                  <Text margin="0px 5px" weight={600}>
                    {lpSymbol}
                  </Text>
                  <Flex
                    sx={{
                      width: 'fit-content',
                      padding: '0px 7.5px',
                      height: '17px',
                      borderRadius: '10px',
                      background: location === 'farm' ? 'green' : 'orange',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text size="11px" weight={700} color="primaryBright">
                      {location.toUpperCase()}
                    </Text>
                  </Flex>
                </Flex>
                <Text>{stakeAmount?.substring(0, 8)}</Text>
              </Flex>
            )
          })}
        </Flex>
        <Text margin="20px 0px"> Want to earn more?</Text>
        <Link href="/maximizers" style={{ width: '100%' }}>
          <Flex
            sx={{
              backgroundImage: 'url(/images/cta/maximizers-banner.svg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100px',
              borderRadius: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Image src="/images/cta/maximizers-icon.svg" width="100px" />
            <Text mr="50px" mb="30px" weight={600} size="20px">
              MAXIMIZERS
            </Text>
          </Flex>
        </Link>
        <Link href="/treasury-bills" style={{ width: '100%' }}>
          <Flex
            sx={{
              mt: '20px',
              backgroundImage: 'url(/images/new-banners/56-treasury-bills-night.svg)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100px',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '10px',
            }}
          >
            <Flex sx={{ flexDirection: 'column', ml: '30px' }}>
              <Text weight={600} size="20px">
                BILLS
              </Text>
              <Text weight={500} size="16px">
                Access Discounted Tokens
              </Text>
            </Flex>
          </Flex>
        </Link>
      </Flex>
    </Modal>
  )
}

export default React.memo(SuccessfulMigrationModal)
