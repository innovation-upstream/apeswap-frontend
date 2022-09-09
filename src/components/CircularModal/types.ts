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
  // title?: string
  // description?: string
  // bgUrl?: string
  // destination?: string
  type: string
  // content: Record<string, string>
}

export interface CTAProps {
  actionType: string
}
