import { ModalProps } from '@ape.swap/uikit'

export interface CMProps extends ModalProps {
  actionType: 'selling' | 'buying' | 'generalHarvest' | 'poolHarvest'
}

export interface MP {
  supporting: string
  description: string
  actionType: 'selling' | 'buying' | 'generalHarvest' | 'poolHarvest'
}

export interface CTACardProps {
  type: string
  action: string
}

export interface CTAProps {
  actionType: string
}
