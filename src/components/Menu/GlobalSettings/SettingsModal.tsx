/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, ModalProps, ButtonMenu, ButtonMenuItem } from '@ape.swap/uikit'
import { Modal } from '@apeswapfinance/uikit'
import { Switch } from 'theme-ui'

import {
  useExpertModeManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
  useUserRecentTransactions,
  useUserAutonomyPrepay,
} from 'state/user/hooks'
import { useSwapActionHandlers } from 'state/swap/hooks'
import { useTranslation } from 'contexts/Localization'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'
import { styles } from './styles'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`

const SettingsModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [recentTransactions, setRecentTransactions] = useUserRecentTransactions()
  const [autonomyPrepay, setAutonomyPrepay] = useUserAutonomyPrepay()
  const { onChangeRecipient } = useSwapActionHandlers()
  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <div style={{ zIndex: 101, width: '360px' }}>
      <Modal title={t('Settings')} onDismiss={onDismiss}>
        <ScrollableContainer>
          <TransactionSettings />
          <Flex sx={{ justifyContent: 'space-between', margin: '5px 0px' }}>
            <Text>{t('Recent Transactions')}</Text>
            <Flex>
              <Switch
                sx={styles.switch}
                checked={recentTransactions}
                onChange={() => {
                  setRecentTransactions(!recentTransactions)
                }}
              />
            </Flex>
          </Flex>
          <Flex sx={{ justifyContent: 'space-between', margin: '5px 0px' }}>
            <Text>{t('Expert Mode')}</Text>
            <Flex>
              <Switch sx={styles.switch} checked={expertMode} onChange={handleExpertModeToggle} />
            </Flex>
          </Flex>
          <Flex sx={{ justifyContent: 'space-between', margin: '5px 0px' }}>
            <Text>{t('Disable Multihops')}</Text>
            <Flex>
              <Switch
                sx={styles.switch}
                checked={singleHopOnly}
                onChange={() => {
                  setSingleHopOnly(!singleHopOnly)
                }}
              />
            </Flex>
          </Flex>
          <Flex sx={{ justifyContent: 'space-between', margin: '5px 0px' }}>
            <Text>{t('Autonomy Prepay')}</Text>
            <Flex>
              <Switch
                sx={styles.switch}
                checked={autonomyPrepay}
                onChange={() => {
                  setAutonomyPrepay(!autonomyPrepay)
                }}
              />
            </Flex>
          </Flex>
        </ScrollableContainer>
      </Modal>
    </div>
  )
}

export default SettingsModal
