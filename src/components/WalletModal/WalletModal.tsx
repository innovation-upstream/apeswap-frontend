import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Button, Text, Modal, ModalHeader, Heading, Svg, Link } from '@innovationupstream/apeswap-uikit'
import { Box } from 'theme-ui'
import useAuth from 'hooks/useAuth'
import { SSRContext } from 'contexts/SSRContext'
import connectors from './config'
import { connectorButtons } from './styles'

interface Props {
  open: boolean
  handleClose?: () => void
}

const WalletModal: React.FC<Props> = ({ open, handleClose }) => {
  const { login } = useAuth()
  const { isBrowser } = useContext(SSRContext)
  const modalContainer = isBrowser ? document.querySelector('#wallet-modal-root') : null

  return modalContainer
    ? ReactDOM.createPortal(
        <Modal handleClose={handleClose} minWidth="20%" open={open}>
          <ModalHeader handleClose={handleClose}>
            <Heading as="h4">Connect to a wallet</Heading>
          </ModalHeader>
          <Box>
            {connectors.map((data) => {
              return (
                <Button
                  csx={connectorButtons}
                  size="md"
                  variant="primary"
                  onClick={() => {
                    login(data.connectorId)
                    localStorage.setItem('accountStatus', data.connectorId)
                    handleClose?.()
                  }}
                >
                  <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
                    {data.title}
                  </Text>
                  <data.icon />
                </Button>
              )
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
        </Modal>,
        modalContainer,
      )
    : null
}

export default WalletModal
