/** @jsxImportSource theme-ui */
import React, { useRef } from 'react'
import styled from 'styled-components'
import { Button, useWalletModal } from '@apeswapfinance/uikit'
import { TooltipBubble } from '@ape.swap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'

const UnlockButton = (props: any) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { large, showTooltip } = props
  const buttonRef = useRef(null)

  const isOverflowing = () => {
    if (!buttonRef.current) return false
    const e = buttonRef.current
    return e.offsetWidth < e.scrollWidth
  }

  return large ? (
    <LargeButton onClick={onPresentConnectModal}>{t('UNLOCK WALLET')}</LargeButton>
  ) : (
    <TooltipBubble
      hideTooltip={!showTooltip || !isOverflowing()}
      body={t('UNLOCK WALLET')}
      backgroundColor="lvl2"
      placement="bottomRight"
    >
      <Button onClick={onPresentConnectModal} {...props}>
        <span ref={buttonRef} {...props}>
          {t('UNLOCK WALLET')}
        </span>
      </Button>
    </TooltipBubble>
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
