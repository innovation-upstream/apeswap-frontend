/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex } from '@ape.swap/uikit'
import useTheme from 'hooks/useTheme'

import { CTA_CARD_INFO, CTA_TYPE, MODAL_TYPE } from 'config/constants'
import { CTACardProps } from './types'
import { circular } from './styles'

const CTACard: React.FC<CTACardProps> = ({ type, action }) => {
  const content = CTA_CARD_INFO[type]
  const { isDark } = useTheme()
  const imageUrl = `url(/images/new-banners/${type}-${isDark ? 'night' : 'day'}.svg)`
  // TO DO - Dynamically switch imageUrl depending on mode and types
  const goToDestination = () => window.open(content.destination, '_blank')
  // TO DO - Implement triggerCompoundTx
  const triggerCompoundTx = () => null
  const buyModal = action === MODAL_TYPE.BUYING
  const ghModal = action === MODAL_TYPE.GENERAL_HARVEST
  const phModal = action === MODAL_TYPE.POOL_HARVEST
  const maximizer = type === CTA_TYPE.MAXIMIZERS
  const pool = type === CTA_TYPE.POOLS
  const gnana = type === CTA_TYPE.GNANA
  const lending = type === CTA_TYPE.LENDING
  const compound = type === CTA_TYPE.COMPOUND

  // maximizer && phModal -> 'flex-end'
  // pool && (buyModal || ghModal) -> 'flex-end'
  // lending -> 'flex-end'
  // else -> 'flex-start'

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        textAlign: (((maximizer && phModal) || (pool && (buyModal || ghModal)) || lending) && 'end') || 'start',
        backgroundImage: imageUrl,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '10px',
        height: ['75px', '120px'],
        padding: ['18.5px', '40px'],
        marginBottom: '10px',
        backgroundColor: type === 'lending' && 'green',
        color: ((maximizer || lending || gnana) && 'primaryBright') || 'brown',
      }}
      onClick={compound ? triggerCompoundTx : goToDestination}
    >
      <Text sx={circular.ctaTitle}>{content.title.toUpperCase()}</Text>
      <Text sx={circular.ctaDescription}>{content.description}</Text>
    </Flex>
  )
}

export default CTACard
