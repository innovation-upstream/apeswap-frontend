/** @jsxImportSource theme-ui */
import React from 'react'
import { LiquidityWidget } from 'components/LiquidityWidget'
import { Modal, ModalHeader, Heading, Link } from '@ape.swap/uikit'
import { HelpIcon, ModalProvider } from '@apeswapfinance/uikit'
import { Flex } from 'theme-ui'
import { merge } from 'lodash'
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'
import { useMintActionHandlers } from 'state/mint/hooks'

interface LiquidityModalProps {
  widgetProps?: Record<string, any>
  modalProps?: Record<string, any>
  onDismiss?: () => void
}

const LiquidityModal: React.FC<LiquidityModalProps> = ({ widgetProps, onDismiss, modalProps: newModalProps }) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const { onFieldAInput } = useMintActionHandlers(false)

  const modalProps = {
    minWidth: isMobile ? '320px' : '385px',
    maxWidth: isMobile ? '90vw' : '385px',
    style: {
      zIndex: 20,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
  }

  const handleClose = () => {
    onFieldAInput('')
    onDismiss()
  }

  return (
    <ModalProvider>
      <Modal open {...merge(modalProps, newModalProps)} onDismiss={handleClose}>
        <ModalHeader onDismiss={handleClose}>
          <Flex
            sx={{
              Svg: {
                marginLeft: 0,
                marginRight: '11px',
              },
              flexDirection: 'row-reverse',
            }}
          >
            <Link
              href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity"
              target="_blank"
              textAlign="center"
            >
              <HelpIcon width="20px" style={{ marginLeft: '10px' }} />
            </Link>
            <Heading sx={{ fontSize: '22px', lineHeight: '33px' }} as="h4">
              {t('Add Liquidity')}
            </Heading>
          </Flex>
        </ModalHeader>
        <LiquidityWidget {...widgetProps} onCancel={handleClose} />
      </Modal>
    </ModalProvider>
  )
}

export default LiquidityModal
