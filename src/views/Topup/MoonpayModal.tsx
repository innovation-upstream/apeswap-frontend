/** @jsxImportSource theme-ui */
import React from 'react'
import { Modal, ModalProps } from '@ape.swap/uikit'
import MoonPayIframe from './MoonFrame'

export default function MoonPayModal({ onDismiss }: ModalProps) {
  const modalProps = {
    minWidth: '385px',
    maxWidth: '385px',
    style: {
      zIndex: 10,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
  }
  return (
    <Modal title="Top up with Moonpay" minWidth="400px" onDismiss={onDismiss} {...modalProps}>
      <MoonPayIframe />
    </Modal>
  )
}
