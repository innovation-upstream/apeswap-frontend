/** @jsxImportSource theme-ui */
import React from 'react'
import { Modal, ModalProps } from '@ape.swap/uikit'
import MoonPayIframe from './MoonFrame'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainId } from '@ape.swap/sdk'

export default function MoonPayModal({ onDismiss }: ModalProps) {
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
      {chainId === ChainId.TLOS ? <>unsoported</> : <MoonPayIframe />}
    </Modal>
  )
}
