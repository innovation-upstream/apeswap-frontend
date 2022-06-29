import React from 'react'
import { Modal, ModalProps } from '@apeswapfinance/uikit'
import MoonPayIframe from './MoonFrame'

export default function MoonPayModal({ onDismiss }: ModalProps) {
  return (
    <Modal title="Top up with Moonpay" minWidth="400px" onDismiss={onDismiss}>
      <MoonPayIframe />
    </Modal>
  )
}
