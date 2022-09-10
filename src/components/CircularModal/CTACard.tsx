/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'
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
  const { isDark } = useTheme()
  const imageUrl = `url(/images/new-banners/${type}-${isDark ? 'night' : 'day'}.svg)`
  const goToDestination = () => window.open(content.destination, '_blank')
  const triggerCompoundTx = () => null

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: type === 'lending' ? 'flex-end' : 'flex-start',
        backgroundImage: imageUrl,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '10px',
        height: ['75px', '120px'],
        padding: ['18.5px', '40px'],
        marginBottom: '10px',
      }}
      onClick={type === 'compound' ? triggerCompoundTx : goToDestination}
    >
      <Text sx={circular.ctaTitle}>{content.title.toUpperCase()}</Text>
      <Text sx={circular.ctaDescription}>{content.description}</Text>
    </Flex>
  )
}

export default CTACard
