import React from 'react'
import { LiquidityWidget } from 'components/LiquidityWidget'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, Heading, Link } from '@ape.swap/uikit'
import { HelpIcon } from '@apeswapfinance/uikit'
import { widgetType } from 'contexts/WidgetModalContext'
import useWidgetModal from 'hooks/useWidgetModal'
import { Flex } from 'theme-ui'

const labels: { [T in widgetType]: string } = {
  liquidity: 'Add Liquidity',
}

const WidgetModal = () => {
  const { open, widget, widgetProps, setWidgetState } = useWidgetModal()
  const handleClose = () => setWidgetState({ open: false })
  const modalContainer = document.querySelector('#root')

  const modalProps = {
    open,
    minWidth: '385px',
    maxWidth: '385px',
    style: {
      zIndex: 20,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
  }
  return modalContainer
    ? ReactDOM.createPortal(
        <Modal {...modalProps} handleClose={handleClose}>
          <ModalHeader handleClose={handleClose}>
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
                {labels[widget]}
              </Heading>
            </Flex>
          </ModalHeader>
          <LiquidityWidget onCancel={handleClose} {...widgetProps} />
        </Modal>,
        modalContainer,
      )
    : null
}

export default WidgetModal
