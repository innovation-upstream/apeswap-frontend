import React from 'react'
import { Button, Text, Modal, ModalHeader, Heading, Flex, Link } from '@innovationupstream/apeswap-uikit'
import { Box } from 'theme-ui'
import CopyToClipboard from './CopyToClipboard'

interface Props {
  account?: string
  logout: () => void
  onDismiss?: () => void
  accountPopup: boolean
  handleClose?: () => void
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, accountPopup, handleClose }) => {
  return (
    <Modal open={accountPopup} minWidth="20%">
      <ModalHeader handleClose={() => handleClose()}>
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
            window.localStorage.removeItem('accountStatus')
            onDismiss()
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
    </Modal>
  )
}

AccountModal.defaultProps = {
  account: undefined,
  onDismiss: () => null,
}

export default AccountModal
