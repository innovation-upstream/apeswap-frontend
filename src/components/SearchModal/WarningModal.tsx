/** @jsxImportSource theme-ui */
import { Button, WarningIcon } from '@ape.swap/uikit'
import { Checkbox, Flex, Modal, ModalFooter, Text, useModal } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'

interface TransferBillModalProps {
  onDismiss: () => void
  setApproveList: (approve: boolean) => void
  warning?: string
}

const WarningModal: React.FC<TransferBillModalProps> = ({ onDismiss, setApproveList, warning }) => {
  const [confirm, setConfirm] = useState(false)
  const { t } = useTranslation()

  return (
    <Modal onDismiss={onDismiss} maxWidth="385px">
      <Flex alignItems="center" justifyContent="center" mt="10px">
        <Text bold fontSize="35px">
          <WarningIcon width="25px" mr="10px" color="error" />
          {t('WARNING')}
          <WarningIcon width="25px" ml="10px" color="error" />
        </Text>
      </Flex>
      <Flex mt="30px" mb="30px" flexDirection="column" alignItems="center" mr="10px">
        <Flex flexDirection="column">
          <Flex>
            <Text style={{ fontWeight: 600 }}>{warning}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="20px" alignItems="center">
        <Checkbox onClick={() => setConfirm((prev) => !prev)} />
        <Text ml="10px" fontSize="12px" bold>
          {t('I understand.')}
        </Text>
      </Flex>
      <ModalFooter onDismiss={onDismiss}>
        <Button
          onClick={() => {
            setApproveList(true)
            onDismiss()
          }}
          disabled={!confirm}
        >
          {t('Continue')}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default React.memo(WarningModal)
