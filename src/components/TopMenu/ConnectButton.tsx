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

const ConnectButton: React.FC<any> = () => {
  const [showConnectPopup, setShowConnect] = useState(false)
  return (
    <>
      <Button colorMode="dark" csx={{}} size="sm" variant="primary" onClick={() => setShowConnect(true)}>
        <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
          CONNECT
        </Text>
      </Button>

      <Modal handleClose={() => setShowConnect(false)} minWidth="20%" open={showConnectPopup}>
        <ModalHeader handleClose={() => setShowConnect(false)}>
          <Heading as="h4">Connect to a wallet</Heading>
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
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            METAMASK
          </Text>
          <Svg color="yellow" direction="down" icon="bnb_token" width={25} />
        </Button>

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
      </Modal>
    </>
  )
}

export default ConnectButton
