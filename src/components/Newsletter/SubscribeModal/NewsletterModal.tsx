/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'
import { CloseIcon, Flex } from '@ape.swap/uikit'
import Newsletter from '..'

import { internalStyles } from './styles'

const NewsletterModal: React.FC<{ onDismiss?: () => void }> = ({ onDismiss }) => {
  return (
    <Flex className="newsletter-modal-con">
      <CloseIcon width={22} onClick={onDismiss} sx={{ cursor: 'pointer', position: 'absolute', right: '20px' }} />
      <Flex sx={internalStyles.modalBody}>
        <Box sx={internalStyles.showApe} />
        <Newsletter isModal />
      </Flex>
    </Flex>
  )
}

export default NewsletterModal
