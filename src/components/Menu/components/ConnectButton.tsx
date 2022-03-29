import React, { useEffect, useState } from 'react'
import { Button, Text, Modal, ModalHeader, Heading, Svg, Link } from '@innovationupstream/apeswap-uikit'
import { Box } from 'theme-ui'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
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
  Metamask,
} from '../../Icons'
import { ConnectorNames } from './types'
import AccountModal from './AccountModal'

const ConnectButton: React.FC<any> = () => {
  const [showConnectPopup, setShowConnect] = useState(false)
  const [accountPopup, setAccountPopUp] = useState(false)
  const [showaccountPopup, setShowAccountPopup] = useState(false)
  const { account } = useActiveWeb3React()
  const { login, logout } = useAuth()

  const connectWallet = async (chainId1: any) => {
    login(chainId1)
    localStorage.setItem('accountStatus', chainId1)
    setShowConnect(false)
  }
  useEffect(() => {
    if (localStorage.getItem('accountStatus')) {
      setAccountPopUp(true)
      setShowConnect(false)
    } else {
      setAccountPopUp(false)
    }
  }, [showaccountPopup, account])

  const connectButtonData = [
    {
      title: 'Metamask',
      icon: Metamask,
      connectorId: ConnectorNames.Injected,
    },
    {
      title: 'TrustWallet',
      icon: TrustWallet,
      connectorId: ConnectorNames.Injected,
    },
    {
      title: 'WalletConnect',
      icon: WalletConnect,
      connectorId: ConnectorNames.WalletConnect,
    },
    {
      title: 'SafePal Wallet',
      icon: SafePalWallet,
      connectorId: ConnectorNames.Injected,
    },
    {
      title: 'TokenPocket',
      icon: TokenPocket,
      connectorId: ConnectorNames.Injected,
    },
    {
      title: 'Coinbase Wallet',
      icon: Coinbase,
      connectorId: ConnectorNames.Walletlink,
    },
    {
      title: 'Binance Chain Wallet',
      icon: BinanceChain,
      connectorId: ConnectorNames.BSC,
    },
    {
      title: 'NABOX Wallet',
      icon: Nabox,
      connectorId: ConnectorNames.Injected,
    },
    {
      title: 'ONTO Wallet',
      icon: OntoWallet,
      connectorId: ConnectorNames.Injected,
    },
    {
      title: 'MathWallet',
      icon: MathWallet,
      connectorId: ConnectorNames.Injected,
    },
  ]
  const buttonWallets = (Icon, Chainid, label) => {
    return (
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
          margin: '10px 0',
        }}
        size="md"
        variant="primary"
        onClick={() => {
          connectWallet(Chainid)
        }}
      >
        <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
          {label}
        </Text>
        <Icon />
      </Button>
    )
  }

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
 console.log("accountEllipsis",accountEllipsis);
 
  return (
    <>
      {accountPopup === false ? (
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            marginRight: '-50px',
          }}
          colorMode="dark"
          size="sm"
          variant="primary"
          onClick={() => setShowConnect(true)}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 30px 0 0' }}>
            CONNECT
          </Text>
        </Button>
      ) : (
        <Button
          csx={{
            background: 'white4',
            border: 0,
            '&:hover': {
              background: 'white4',
            },
            marginRight: '-50px',
          }}
          colorMode="dark"
          size="sm"
          variant="primary"
          onClick={() => setShowAccountPopup(true)}
        >
          <Text color="info" variant="md" weight="normal" sx={{ margin: '0 30px 0 0' }}>
            {accountEllipsis}
          </Text>
        </Button>
      )}

      <AccountModal
        handleClose={() => {
          setShowAccountPopup(false)
        }}
        account={account}
        logout={() => {
          logout()
          setShowAccountPopup(false)
        }}
        accountPopup={showaccountPopup}
      />

      <Modal handleClose={() => setShowConnect(false)} minWidth="20%" open={showConnectPopup}>
        <ModalHeader handleClose={() => setShowConnect(false)}>
          <Heading as="h4">Connect to a wallet</Heading>
        </ModalHeader>
        <Box>
          {connectButtonData.map((data) => {
            return buttonWallets(data.icon, data.connectorId, data.title)
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg color="backgroundDisabled" icon="question" width="20px" />
          &nbsp;&nbsp;
          <Link fontFamily="Titan One" href="https://docs.binance.org/smart-chain/wallet/metamask.html">
            Learn how to connect
          </Link>
        </Box>
      </Modal>
    </>
  )
}

export default ConnectButton
