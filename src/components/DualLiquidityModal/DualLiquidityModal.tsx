/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { Modal, ModalProvider } from '@ape.swap/uikit'
import { Box } from 'theme-ui'
import { merge } from 'lodash'
import { useTranslation } from 'contexts/Localization'
import RegularLiquidity from './RegularLiquidity'
import ZapLiquidity from './ZapLiquidity'
import ZapSwitch from './components/ZapSwitch'
import useIsMobile from 'hooks/useIsMobile'
import { useSetZapData } from '../../state/zap/hooks'

interface DualLiquidityModalProps {
  modalProps?: Record<string, any>
  handleClose?: () => void
}

const DualLiquidityModal: React.FC<DualLiquidityModalProps> = ({ modalProps: newModalProps, handleClose }) => {
  useSetZapData()
  const { t } = useTranslation()
  const [goZap, setGoZap] = useState(true)
  const isMobile = useIsMobile()

  const modalProps = {
    minWidth: isMobile ? '285px' : '420px',
    maxWidth: isMobile ? '285px' : '420px',
    style: {
      zIndex: 11,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
  }

  const handleZapSwitch = useCallback(() => {
    setGoZap(!goZap)
  }, [goZap])

  return (
    <ModalProvider>
      <Modal open {...merge(modalProps, newModalProps)} title={t('Liquidity')} onDismiss={handleClose}>
        <Box>
          <ZapSwitch goZap={goZap} handleZapSwitch={handleZapSwitch} />
          {goZap ? <ZapLiquidity /> : <RegularLiquidity />}
        </Box>
      </Modal>
    </ModalProvider>
  )
}

export default React.memo(DualLiquidityModal)
