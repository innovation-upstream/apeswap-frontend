/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { styles } from './styles'
import { BillsView } from '../../index'

interface BillsNavProps {
  billsView: BillsView
  setBillsView: (newBillsView: BillsView) => void
}

const BillsNav: React.FC<BillsNavProps> = ({ billsView, setBillsView }) => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.dexNavContainer}>
      <Text
        size="16px"
        sx={{
          ...styles.navLink,
          color: billsView === BillsView.YOUR_BILLS && 'textDisabled',
          '::after': billsView === BillsView.AVAILABLE_BILLS && styles.underlined,
        }}
        onClick={() => setBillsView(BillsView.AVAILABLE_BILLS)}
      >
        {t('Available Bills')}
      </Text>
      <Text
        size="16px"
        sx={{
          ...styles.navLink,
          color: billsView === BillsView.AVAILABLE_BILLS && 'textDisabled',
          '::after': billsView === BillsView.YOUR_BILLS && styles.underlined,
        }}
        onClick={() => setBillsView(BillsView.YOUR_BILLS)}
      >
        {t('Your Bills')}
      </Text>
    </Flex>
  )
}

export default React.memo(BillsNav)
