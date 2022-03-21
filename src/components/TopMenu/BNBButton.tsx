import React, { useState } from 'react'
import { Box } from 'theme-ui'
import {
  IconButton,
  Svg,
  Button,
  Text,
  Modal,
  ModalHeader,
  Heading,
  ModalFooter,
} from '@innovationupstream/apeswap-uikit'
import { setNetwork } from 'state/network'

const BNBButton: React.FC<any> = () => {
  const [showNetworkPopup, setShowNetwork] = useState(false)
  return (
    <>
      <Button
        colorMode="light"
        csx={{
          background: 'white4',
          border: 0,
          '&:hover': {
            background: 'white4',
          },
        }}
        size="sm"
        variant="primary"
        onClick={() => setShowNetwork(true)}
      >
        <Svg color="yellow" direction="down" icon="bnb_token" width={18} />
        <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
          BNB
        </Text>
        <Svg
          color="info"
          direction="down"
          icon="caret"
          // width={40}
        />
      </Button>

      <Modal handleClose={() => setShowNetwork(false)} minWidth="20%" open={showNetworkPopup}>
        <ModalHeader handleClose={() => setShowNetwork(false)}>
          <Heading as="h4">Select a Network</Heading>
        </ModalHeader>
        <Button
          colorMode="light"
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
          }}
          size="md"
          variant="primary"
          onClick={function noRefCheck() {}}
        >
          <Svg color="yellow" direction="down" icon="bnb_token" width={25} />
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            BNB
          </Text>
        </Button>

        <Button colorMode="dark" csx={{}} size="sm" variant="secondary">
          <Svg color="yellow" direction="down" icon="polygon_token" width={25} />
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            POLYGON
          </Text>
        </Button>
      </Modal>
    </>
  )
}

export default BNBButton
