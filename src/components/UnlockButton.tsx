import React from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@apeswapfinance/uikit'
import { TooltipBubble } from '@ape.swap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { large } = props
  const isMobile = useIsMobile()

  return large ? (
    <LargeButton onClick={onPresentConnectModal}>{t('UNLOCK WALLET')}</LargeButton>
  ) : (
    <>
      {isMobile ? (
        <Button onClick={onPresentConnectModal} {...props}>
          {t('UNLOCK WALLET')}
        </Button>
      ) : (
        <div style={{ display: 'inline-block' }}>
          <TooltipBubble body={t('UNLOCK WALLET')} placement="bottomRight">
            <Button onClick={onPresentConnectModal} {...props}>
              {t('UNLOCK WALLET')}
            </Button>
          </TooltipBubble>
        </div>
      )}
    </>
  )
}

const LargeButton = styled(Button)`
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  margin-top: 10px;
`

export default UnlockButton
