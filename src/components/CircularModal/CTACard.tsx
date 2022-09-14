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

  const sellModal = action === MODAL_TYPE.SELLING
  const buyModal = action === MODAL_TYPE.BUYING
  const ghModal = action === MODAL_TYPE.GENERAL_HARVEST
  const phModal = action === MODAL_TYPE.POOL_HARVEST
  const maximizer = type === CTA_TYPE.MAXIMIZERS
  const pool = type === CTA_TYPE.POOLS
  const gnana = type === CTA_TYPE.GNANA
  const lending = type === CTA_TYPE.LENDING
  const compound = type === CTA_TYPE.COMPOUND

  const imageUrl = `url(/images/new-banners/${type}-${isDark ? 'night' : 'day'}.svg)`
  const iconUrl = `url(/images/cta/${compound ? 'pools' : type}-icon.svg)`
  console.log('iconUrl:::', iconUrl)
  // TO DO - Dynamically switch imageUrl depending on mode and types
  const goToDestination = () => window.open(content.destination, '_blank')
  // TO DO - Implement triggerCompoundTx
  const triggerCompoundTx = () => null

  // const spacing =
  //   ((ghModal || buyModal) && pool) || (phModal && maximizer) || (sellModal && lending)
  //     ? { paddingLeft: '20px' }
  //     : ((gnana || maximizer) && (buyModal || ghModal)) ||
  //       (sellModal && (maximizer || pool)) ||
  //       (phModal && (compound || gnana))
  //     ? { paddingRight: '20px' }
  //     : {}

  const spacing =
    ((ghModal || buyModal) && pool) || (phModal && maximizer) || (sellModal && lending)
      ? { marginLeft: ['20px', '40px'] }
      : { marginRight: ['20px', '40px'] }

  return (
    <Flex
      sx={{
        // textAlign: (((maximizer && phModal) || (pool && (buyModal || ghModal)) || lending) && 'end') || 'start',
        backgroundImage: 'radial-gradient(84.09% 126.54% at 55.43% 12.94%, #414042 0%, #000000 100%)',
        borderRadius: '10px',
        height: ['75px', '120px'],
        // padding: ['18.5px', '40px'],
        marginBottom: '10px',
        color: ((maximizer || lending || gnana) && 'primaryBright') || 'brown',
        // '-webkit-transform': 'scaleX(-1)',
        // transform: 'scaleX(-1)',
      }}
      onClick={compound ? triggerCompoundTx : goToDestination}
    >
      <Flex
        sx={{
          width: '100%',
          flexDirection:
            (((maximizer && phModal) || (pool && (buyModal || ghModal)) || lending) && 'row') || 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: ['20px', '40px'],
          paddingRight: ['20px', '40px'],
        }}
      >
        <Flex
          sx={{
            width: '50px',
            height: '50px',
            backgroundImage: iconUrl,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // margin: 0,
            // padding: 0,
          }}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            textAlign: (((maximizer && phModal) || (pool && (buyModal || ghModal)) || lending) && 'end') || 'start',
          }}
        >
          <Text sx={circular.ctaTitle}>{content.title.toUpperCase()}</Text>
          <Text sx={circular.ctaDescription}>{content.description}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default CTACard
