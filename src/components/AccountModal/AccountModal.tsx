import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { useWeb3React } from '@web3-react/core'
import { Button, Text, Modal, ModalHeader, Heading, Flex, Link } from '@innovationupstream/apeswap-uikit'
import { SSRContext } from 'contexts/SSRContext'
import { Box } from 'theme-ui'
import useAuth from 'hooks/useAuth'
import CopyToClipboard from './CopyToClipboard'

interface Props {
  open: boolean
  handleClose?: () => void
}

const AccountModal: React.FC<Props> = ({ open, handleClose }) => {
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { isBrowser } = useContext(SSRContext)
  const modalContainer = isBrowser ? document.querySelector('#account-modal-root') : null

  return modalContainer
    ? ReactDOM.createPortal(
        <Modal open={open} minWidth="20%">
          <ModalHeader handleClose={handleClose}>
            <Heading as="h4">Your wallet</Heading>
          </ModalHeader>
          <Text weight="bold">{account}</Text>
          <Flex mt="10px" mb="32px">
            <Box mr="15px">
              <Link external href={`https://bscscan.com/address/${account}`} fontFamily="poppins">
                View on BscScan
              </Link>
            </Box>
            <CopyToClipboard toCopy={account}>
              <Text variant="sm" weight="bold">
                Copy Address
              </Text>
            </CopyToClipboard>
          </Flex>
          <Flex sx={{ justifyContent: 'center' }}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                logout()
                handleClose()
                window.localStorage.removeItem('accountStatus')
                window.location.reload()
              }}
              csx={{
                paddingRight: '24px',
                paddingLeft: '24px',
                border: '2px solid rgb(255, 179, 0)',
                height: '28px',
              }}
            >
              <Text weight="normal">LOGOUT</Text>
            </Button>
          </Flex>
        </Modal>,
        modalContainer,
      )
    : null
}

export default AccountModal
