import React from 'react'
import { ListTagVariants } from '@ape.swap/uikit'

export interface TokenDisplayProps {
  token1: string
  token2: string
  token3?: string
  token4?: string
  billArrow?: boolean
  stakeLp?: boolean
  earnLp?: boolean
  noEarnToken?: boolean
}

export interface ListProps {
  id?: string | number
  title: React.ReactNode
  titleContainerWidth?: number
  infoContent?: React.ReactNode
  cardContent: React.ReactNode
  expandedContent?: React.ReactNode
}

export interface ListViewProps {
  tokenDisplayProps: TokenDisplayProps
  listProps: ListProps
}

export interface ListCardProps extends ListProps {
  serviceTokenDisplay: React.ReactNode
}

export interface ListViewContentProps {
  tag?: ListTagVariants
  title?: string
  value: string
  value2?: string
  value2Secondary?: boolean
  valueIcon?: React.ReactNode
  value2Icon?: React.ReactNode
  toolTip?: string
  aprCalculator?: React.ReactNode
  toolTipPlacement?: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
  toolTipTransform?: string
  valueColor?: string
  style?: any
}
