import React, { useState, useEffect } from 'react'
import {
  // IconButton,
  Svg,
  Button,
  Text,
  Modal,
  ModalHeader,
  Heading,
  // ModalFooter,
} from '@innovationupstream/apeswap-uikit'
import useSwitchNetwork from 'hooks/useSelectNetwork'

const BNBButton: React.FC<any> = () => {
  const [showNetworkPopup, setShowNetwork] = useState(false)
  const { switchNetwork } = useSwitchNetwork()
  const [bnb, setBnb] = useState(true)

  useEffect(() => {
    const bnbState = localStorage.getItem('chainIdStatus')
    if (+bnbState === 137) {
      setBnb(false)
    }
  }, [bnb])

  const handleBnb = () => {
    switchNetwork(56)
    setShowNetwork(false)
    setBnb(true)
  }

  const handlePolygon = () => {
    switchNetwork(137)
    setShowNetwork(false)
    setBnb(false)
  }

  return (
    <>
      {bnb ? (
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
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 5px' }}>
            BNB
          </Text>
          <Svg
            color="info"
            direction="down"
            icon="caret"
            // width={40}
          />
        </Button>
      ) : (
        <Button
          colorMode="dark"
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
          }}
          size="sm"
          variant="secondary"
          onClick={() => setShowNetwork(true)}
        >
          <Svg color="yellow" direction="down" icon="polygon_token" width={25} />
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            POLYGON
          </Text>
          <Svg
            color="info"
            direction="down"
            icon="caret"
            // width={40}
          />
        </Button>
      )}

      <Modal handleClose={() => setShowNetwork(false)} minWidth="20%" open={showNetworkPopup}>
        <ModalHeader handleClose={() => setShowNetwork(false)}>
          <Heading as="h4">Select a Network</Heading>
        </ModalHeader>
        <Button
          csx={{
            width: '100%',
            height: '48px',
            alignItems: 'center',
            justifyContent: 'center',
            margin:'10px 0'
          }}
          size="sm"
          variant={bnb ? 'primary' : 'secondary'}
          onClick={() => handleBnb()}
          disabled={bnb}
        >
          <Svg color="yellow" direction="down" icon="bnb_token" width={22} />
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            BNB
          </Text>
        </Button>

        <Button
          csx={{
            width: '100%',
            height: '48px',
            justifyContent: 'center',
            margin:'10px 0'
          }}
          size="sm"
          variant={bnb ? 'secondary' : 'primary'}
          onClick={() => handlePolygon()}
          disabled={!bnb}
        >
          <Svg color="yellow" direction="down" icon="polygon_token" width={22} />
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            POLYGON
          </Text>
        </Button>
      </Modal>
    </>
  )
}

export default BNBButton
