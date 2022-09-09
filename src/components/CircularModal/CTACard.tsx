/** @jsxImportSource theme-ui */
import { Text, Flex } from '@ape.swap/uikit'
import React from 'react'
import { circular } from './styles'

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
    <Flex
      sx={{
        flexDirection: 'column',
        backgroundImage: content.bgUrl,
      }}
      onClick={type === 'compound' ? triggerCompoundTx : goToDestination}
    >
      <Text sx={circular.ctaTitle}>{content.title}</Text>
      <Text sx={circular.ctaDescription}>{content.description}</Text>
    </Flex>
  )
}

export default CTACard
