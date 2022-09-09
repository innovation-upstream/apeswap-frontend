import { ModalProps } from '@ape.swap/uikit'

export interface CMProps extends ModalProps {
  actionType: 'selling' | 'buying' | 'generalHarvest' | 'poolHarvest'
}

export interface MP {
  description: string
  actionType: 'selling' | 'buying' | 'generalHarvest' | 'poolHarvest'
}
