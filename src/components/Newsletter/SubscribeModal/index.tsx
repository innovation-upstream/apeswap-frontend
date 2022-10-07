/** @jsxImportSource theme-ui */
import React from 'react'
import { Modal, ModalProps } from '@ape.swap/uikit'
import NewsletterModal from './NewsletterModal'
import { modalProps } from './styles'

const SubscribeModal: React.FC<ModalProps> = ({ onDismiss }) => {
  return (
    <Modal zIndex={10} onDismiss={onDismiss} {...modalProps}>
      <NewsletterModal onDismiss={onDismiss} />
    </Modal>
  )
}

export default SubscribeModal
