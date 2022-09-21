import { ModalProps } from '@ape.swap/uikit'
import { Vault, Pool } from 'state/types'

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
  data: {
    vaults: Vault[]
    pools: Pool[]
  }
}

export interface CTAProps {
  actionType: string
}
