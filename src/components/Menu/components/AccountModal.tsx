import React, { useState } from "react";

import {
  Button,
  Text,
  Modal,
  ModalHeader,
  Heading,
  MetamaskIcon,
  Flex,
  Svg,
  Link,
} from '@innovationupstream/apeswap-uikit'
import CopyToClipboard from "./CopyToClipboard"

import {
  OpenNew
 } from '../../Icons'


interface Props {
  account?: string;
  logout: () => void;
  onDismiss?: () => void;
  accountPopup:boolean;
  handleClose?:()=>void;
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null,accountPopup,handleClose }) => {

  return (
  <Modal  open={accountPopup}   minWidth="20%" >
     <ModalHeader handleClose={() => handleClose()} >
          <Heading as="h4">Your wallet</Heading>
        </ModalHeader>
    <Text
      fontSize="20px"
      fontWeight={600}
      style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: "8px" }}
    >
      {account}
    </Text>
    <Flex mt='10px' mb="32px">
     <OpenNew />
      <Link small href={`https://bscscan.com/address/${account}`} mr="16px" fontFamily="poppins" bold>
        View on BscScan
      </Link>
      <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>

    </Flex>
    <Flex sx={{justifyContent:'center' }}>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          logout();
          window.localStorage.removeItem('accountStatus');
          onDismiss();
          window.location.reload();
        }}
      >
        LOGOUT
      </Button>
    </Flex>
  </Modal>
);
      }

AccountModal.defaultProps = {
  account: undefined,
  onDismiss: () => null,
};

export default AccountModal;
