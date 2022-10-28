import { Flex, Modal, Svg, Text } from '@ape.swap/uikit'
import React from 'react'
import { useMigrateAll } from '../../provider'

const SuccessfulMigrationModal: React.FC = () => {
  const { migrationCompleteLog } = useMigrateAll()
  return (
    <Modal maxWidth="400px" minWidth="350px" zIndex={98} title="Successful Migration!">
      <Flex sx={{ background: 'white2', flexDirection: 'column', width: '100%' }}>
        <Flex sx={{ margin: '10px 0px' }}>
          <Text size="14px">You are no longer a virgin, congratulations. Heres a summary of your migration:</Text>
        </Flex>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            mt: '10px',
            background: 'white3',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          {migrationCompleteLog?.map(({ lpSymbol, location, stakeAmount }) => {
            return (
              <>
                <Flex sx={{ alignItems: 'center' }}>
                  <Svg icon="success" width="15px" />
                  <Text margin="0px 5px" weight={500}>
                    {lpSymbol}
                  </Text>
                  <Flex
                    sx={{
                      width: 'fit-content',
                      padding: '0px 7.5px',
                      height: '20px',
                      borderRadius: '10px',
                      background: 'orange',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text size="12px" weight={600} color="primaryBright">
                      {location}
                    </Text>
                  </Flex>
                </Flex>
                <Text>${stakeAmount}</Text>
              </>
            )
          })}
        </Flex>
      </Flex>
    </Modal>
  )
}

export default SuccessfulMigrationModal
