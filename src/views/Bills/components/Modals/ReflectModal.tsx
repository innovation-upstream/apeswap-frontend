/** @jsxImportSource theme-ui */
import { IconButton, useModal } from '@ape.swap/uikit'
import { Checkbox, Flex, Modal, Text } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { Bills } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { StyledButton } from '../styles'
import BuyBillModalView from './BuyBillModalView'

interface TransferBillModalProps {
  onDismiss: () => void
  bill?: Bills
}

const ReflectModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill }) => {
  const [confirmBuy, setConfirmBuy] = useState(false)
  const { t } = useTranslation()
  const { index } = bill
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView bill={bill} onDismiss={null} />,
    true,
    true,
    `billsModal${index}`,
  )

  return (
    <Modal onDismiss={onDismiss} maxWidth="385px">
      <Flex alignItems="center" justifyContent="center" mt="10px">
        <IconButton
          icon="close"
          color="text"
          variant="transparent"
          onClick={onDismiss}
          sx={{ position: 'absolute', right: '20px', top: '25px' }}
        />
        <Text bold fontSize="35px">
          {t('WARNING')}
        </Text>
      </Flex>
      <Flex mt="30px" mb="30px" flexDirection="column" alignItems="center">
        <Flex flexDirection="column">
          <Flex>
            <Text style={{ fontWeight: 600 }}>
              Please note, this ApeSwap Bond includes a reflect token which cannot be whitelisted on our smart
              contracts. This means the reflect mechanic will impact your purchases & claims of this bond, and you will
              recieve less than expected.
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="20px" alignItems="center" onClick={() => setConfirmBuy((prev) => !prev)} style={{ cursor: 'pointer' }}>
        <Checkbox checked={confirmBuy} />
        <Text ml="10px" fontSize="12px" bold>
          {t(
            'I understand that my purchases of this %billToken% bond will be deducted by the reflect mechanics of the token.',
            { billToken: bill.earnToken.symbol },
          )}
        </Text>
      </Flex>
      <Flex justifyContent="center" mt={15}>
        <StyledButton onClick={onPresentBuyBillsModal} disabled={!confirmBuy}>
          {t('Continue')}
        </StyledButton>
      </Flex>
    </Modal>
  )
}

export default React.memo(ReflectModal)
