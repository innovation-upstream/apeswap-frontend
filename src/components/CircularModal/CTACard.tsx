/** @jsxImportSource theme-ui */
import React from 'react'
import { Box } from 'theme-ui'

import { CTACardProps } from './types'

const CTA_CARD_INFO = {
  maximizers: {
    title: 'Maximizers',
    description: 'Earn up to {X%} APY',
    bgUrl: '',
    destination: 'https://apeswap.finance/maximizers',
  },
  pools: {
    title: 'Pools',
    description: 'Earn up to {X%} APR',
    bgUrl: '',
    destination: 'https://apeswap.finance/maximizers',
  },
  lending: {
    title: 'Lending',
    description: 'Supply, borrow, and earn',
    bgUrl: '',
    destination: 'https://lending.apeswap.finance',
  },
  gnana: {
    title: 'Gnana',
    description: 'Unlock exclusive utility',
    bgUrl: '',
    destination: 'https://apeswap.finance/gnana',
  },
  compound: {
    title: '',
    description: '',
    bgUrl: '',
    destination: '',
  },
}

const CTACard: React.FC<CTACardProps> = ({ type }) => {
  const content = CTA_CARD_INFO[type]
  const goToDestination = () => window.open(content.destination, '_blank')
  const triggerCompoundTx = () => null

  return (
    <Box sx={{ backgroundImage: content.bgUrl }} onClick={type === 'compound' ? triggerCompoundTx : goToDestination}>
      <h4>{content.title}</h4>
      <p>{content.description}</p>
    </Box>
  )
}

export default CTACard
