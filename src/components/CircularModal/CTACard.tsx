/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex } from '@ape.swap/uikit'

import { CTA_CARD_INFO, CTA_TYPE, MODAL_TYPE } from 'config/constants'
import { CTACardProps } from './types'
import { circular } from './styles'

const CTACard: React.FC<CTACardProps> = ({ type, action }) => {
  const content = CTA_CARD_INFO[type]

  const sellModal = action === MODAL_TYPE.SELLING
  const buyModal = action === MODAL_TYPE.BUYING
  const ghModal = action === MODAL_TYPE.GENERAL_HARVEST
  const phModal = action === MODAL_TYPE.POOL_HARVEST
  const maximizer = type === CTA_TYPE.MAXIMIZERS
  const pool = type === CTA_TYPE.POOLS
  const lending = type === CTA_TYPE.LENDING
  const compound = type === CTA_TYPE.COMPOUND

  const iconUrl = `url(/images/cta/${compound ? 'pools' : type}-icon.svg)`
  const bannersUrl = `url(/images/cta/${compound ? 'pools' : type}-banner.svg)`
  const goToDestination = () => window.open(content.destination, '_blank')
  // TO DO - Implement triggerCompoundTx
  // const triggerCompoundTx = () => null
  // compound ? triggerCompoundTx : goToDestination

  // display CTA in order of Left, Right, Left (order, 1, 2, 3)
  // odd children left and even children right

  return (
    <Flex
      sx={{
        ...circular.ctaCard,
        backgroundImage: bannersUrl,
        color: ((pool || compound) && 'brown') || 'primaryBright',
        // '-webkit-transform': ((pool && sellModal) || (compound && phModal) || (maximizer && phModal)) && 'scaleX(-1)',
        // transform: ((pool && sellModal) || (compound && phModal) || (maximizer && phModal)) && 'scaleX(-1)',
      }}
      onClick={goToDestination}
    >
      <Flex
        sx={{
          ...circular.ctaContent,
          // flexDirection:
          //   (((maximizer && phModal) || (pool && (buyModal || ghModal)) || lending) && 'row') || 'row-reverse',
          // '-webkit-transform': ((pool && sellModal) || (compound && phModal) || (maximizer && phModal)) && 'scaleX(-1)',
          // transform: ((pool && sellModal) || (compound && phModal) || (maximizer && phModal)) && 'scaleX(-1)',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            // textAlign: (((maximizer && phModal) || (pool && (buyModal || ghModal)) || lending) && 'end') || 'start',
          }}
        >
          <Text sx={circular.ctaTitle}>{content.title.toUpperCase()}</Text>
          <Text sx={circular.ctaDescription}>{content.description}</Text>
        </Flex>
        <Flex
          sx={{
            ...circular.bannerIcon,
            backgroundImage: iconUrl,
          }}
        />
      </Flex>
    </Flex>
  )
}

export default CTACard
