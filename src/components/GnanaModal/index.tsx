/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Flex, Modal, ModalProps, Text } from '@ape.swap/uikit'
import Gnana from './Gnana'
import { modalProps } from './styles'
import { Box, Switch } from 'theme-ui'
import { styles } from '../DualAddLiquidity/styles'
import { useTranslation } from '../../contexts/Localization'
import ZapGnana from './ZapGnana'

const GnanaModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const [stakeIntoProduct, setStakeIntoProduct] = useState(false)
  return (
    <Modal zIndex={10} title="Get GNANA" onDismiss={onDismiss} {...modalProps}>
      <Flex sx={{ marginBottom: '12px', fontSize: '12px', alignItems: 'center' }}>
        <Text>
          {t('Stake in')} {`product`}
        </Text>
        <Box sx={{ width: '50px', marginLeft: '10px' }}>
          <Switch
            checked={stakeIntoProduct}
            onChange={() => setStakeIntoProduct(!stakeIntoProduct)}
            sx={styles.switchStyles}
          />
        </Box>
      </Flex>
      {stakeIntoProduct ? <ZapGnana /> : <Gnana />}
    </Modal>
  )
}

export default GnanaModal
