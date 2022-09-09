/** @jsxImportSource theme-ui */
import React from 'react'
import { Modal } from '@ape.swap/uikit'
import CircularModal from './CircularModal'
import { CMProps } from './types'

const MODAL_INFO = {
  selling: {
    title: 'Selling BANANA',
    description: 'You can put your BANANA to work to earn more rewards:',
  },
  buying: {
    title: "You've Got BANANA",
    description: 'You can put your BANANA to work to earn more rewards:',
  },
  generalHarvest: {
    title: "You've Earned BANANA",
    description: 'You can put your BANANA to work to earn more rewards:',
  },
  poolHarvest: {
    title: "You've Earned BANANA",
    description: 'You can put your BANANA to work to earn more rewards:',
  },
}

const CM: React.FC<CMProps> = ({ actionType, onDismiss }) => {
  const modalCTA = []
  return (
    <Modal zIndex={10} title={MODAL_INFO[actionType]['title']} onDismiss={onDismiss}>
      <CircularModal description={MODAL_INFO[actionType]['description']} actionType={actionType}>
        {modalCTA}
      </CircularModal>
    </Modal>
  )
}

export default CM
