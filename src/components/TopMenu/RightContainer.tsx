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
import ConnectButton from './ConnectButton'
import BNBButton from './BNBButton'

const RightContainer: React.FC<any> = () => {
  const [showNetworkPopup, setShowNetwork] = useState(false)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: [4, 8],
        'button:nth-of-type(1)': {
          display: ['none', 'none', 'inline-flex'],
        },
      }}
    >
      <BNBButton />
      <ConnectButton />

      <IconButton
        background="info"
        color="backgroundDisabled"
        icon="profileLight"
        variant="circular"
        csx={{ border: 0 }}
      />
    </Box>
  )
}

export default RightContainer
