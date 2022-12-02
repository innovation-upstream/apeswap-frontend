import React from 'react'
import { CSSProperties } from 'theme-ui'

export interface ListViewProps {
  tokens?: { token1: string; token2: string; token3?: string; token4?: string }
  id?: string | number
  title: React.ReactNode //
  infoContent?: React.ReactNode //
  infoContentPosition?: string //
  cardContent: React.ReactNode //
  expandedContent?: React.ReactNode //
  expandedContentSize?: number //
  billArrow?: boolean //
  stakeLp?: boolean //
  earnLp?: boolean //
  titleContainerWidth?: number //
  toolTipIconWidth?: string //
  toolTipStyle?: CSSProperties //
  ttWidth?: string //
  noEarnToken?: boolean //
}

export interface ListCardProps extends ListViewProps {
  serviceTokenDisplay: React.ReactNode
}
