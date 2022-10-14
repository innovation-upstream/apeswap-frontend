/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Modal, ModalProps, Flex } from '@ape.swap/uikit'
import MoonPayIframe from './MoonFrame'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@ape.swap/sdk'
import { CHAIN_PARAMS } from 'config/constants/chains'
import { Switch } from 'theme-ui'

const supportedList = [ChainId.BSC, ChainId.MAINNET, ChainId.MATIC]

export default function MoonPayModal({ onDismiss }: ModalProps) {
  const [accept, setAccept] = useState(false)
  const { chainId } = useActiveWeb3React()
  const modalProps = {
    style: {
      zIndex: 10,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
    sx: {
      minWidth: '437px',
      '@media screen and (max-width: 437px)': {
        minWidth: '95%',
      },
      maxWidth: '437px',
    },
  }
  return (
    <Modal title="Buy crypto with MoonPay" onDismiss={onDismiss} {...modalProps}>
      {!supportedList.includes(chainId) ? (
        <Flex sx={{ flexDirection: 'column' }}>
          {`${CHAIN_PARAMS[chainId].chainName} is unsupported by MoonPay. Assests purchased will be sent to other chains, depending on asset purchased. Would you still like to purchase crypto with fiat?`}{' '}
          <Flex sx={{ margin: '10px 0px' }}>
            <Switch
              sx={{
                borderRadius: '8px',
                backgroundColor: 'white3',
                'input:checked ~ &': {
                  backgroundColor: 'yellow',
                },
              }}
              checked={accept}
              onChange={() => {
                setAccept(true)
              }}
            />{' '}
          </Flex>
          {accept && <MoonPayIframe />}
        </Flex>
      ) : (
        <MoonPayIframe />
      )}
    </Modal>
  )
}
