import React, { useState } from 'react'
import { Button, Text, Modal, ModalHeader, Heading, MetamaskIcon, Flex } from '@innovationupstream/apeswap-uikit'

import {
  TrustWallet,
  BinanceChain,
  Coinbase,
  MathWallet,
  Nabox,
  OntoWallet,
  SafePalWallet,
  TokenPocket,
  WalletConnect,
} from '../Icons'

const ConnectButton: React.FC<any> = () => {
  const [showConnectPopup, setShowConnect] = useState(false)
  return (
    <>
      <Button colorMode="dark" size="sm" variant="primary" onClick={() => setShowConnect(true)}>
        <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
          CONNECT
        </Text>
      </Button>

      <Modal handleClose={() => setShowConnect(false)} minWidth="20%" open={showConnectPopup}>
        <ModalHeader handleClose={() => setShowConnect(false)}>
          <Heading as="h4">Connect to a wallet</Heading>
        </ModalHeader>
        {/* METAMASK */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            METAMASK
          </Text>
          <MetamaskIcon />
        </Button>
        {/* TRUSTWALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            TRUSTWALLET
          </Text>
          <TrustWallet />
        </Button>

        {/* WALLETCONNECT */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"

          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            WALLETCONNECT
          </Text>
          <WalletConnect />
        </Button>
        {/* SAFEPAL WALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            SAFEPAL WALLET
          </Text>
          <SafePalWallet />
        </Button>
        {/* TOKENPOCKET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            TOKENPOCKET
          </Text>
          <TokenPocket />
        </Button>
        {/* COINBASE WALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            COINBASE WALLET
          </Text>
          <Coinbase />
        </Button>
        {/* BINANCE CHAIN WALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            BINANCE CHAIN WALLET
          </Text>
          <BinanceChain />
        </Button>
        {/* NABOX WALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            NABOX WALLET
          </Text>
          <Nabox />
        </Button>

        {/* ONTO WALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            ONTO WALLET
          </Text>
          <OntoWallet />
        </Button>

        {/* MATH WALLET */}
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            width: '100%',
            height: '48px',
            justifyContent: 'space-between',
          }}
          size="md"
          variant="primary"
          //  onClick={function noRefCheck() {}}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
            MATH WALLET
          </Text>
          <MathWallet />
        </Button>
      </Modal>
    </>
  )
}

export default ConnectButton
