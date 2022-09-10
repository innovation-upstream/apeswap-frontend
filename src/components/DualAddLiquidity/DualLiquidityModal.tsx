/** @jsxImportSource theme-ui */
import React, { useCallback, useState } from 'react'
import { Modal, ModalProvider } from '@ape.swap/uikit'
import { Box } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import RegularLiquidity from './RegularLiquidity'
import ZapLiquidity from './ZapLiquidity'
import ZapSwitch from './components/ZapSwitch'
import useIsMobile from 'hooks/useIsMobile'

interface DualLiquidityModalProps {
  onDismiss?: () => void
}

const DualLiquidityModal: React.FC<DualLiquidityModalProps> = ({ onDismiss = () => null }) => {
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
      <Modal open {...modalProps} title={t('Liquidity')} onDismiss={onDismiss}>
        <Box>
          <ZapSwitch goZap={goZap} handleZapSwitch={handleZapSwitch} />
          {goZap ? <ZapLiquidity /> : <RegularLiquidity />}
        </Box>
      </Modal>
    </ModalProvider>
  )
}

export default React.memo(DualLiquidityModal)
