/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex } from '@ape.swap/uikit'

import { useTranslation } from 'contexts/Localization'
import { getLargestNumber } from 'utils'
import { CTA_CARD_INFO, CTA_TYPE, MODAL_TYPE } from 'config/constants'
import { CTACardProps } from './types'
import { circular } from './styles'

const CTACard: React.FC<CTACardProps> = ({ type, action, data }) => {
  const { t } = useTranslation()

  // ACTIVE VAULTS
  const vaultsWithAPY = data?.vaults.map((vault) => vault?.apy?.yearly)
  const vAPY = vaultsWithAPY.length > 0 && getLargestNumber(vaultsWithAPY)

  // OPEN POOLS
  const poolsWithAPR = data?.pools.map((pool) => pool?.apr)
  const pAPR = poolsWithAPR.length > 0 && getLargestNumber(poolsWithAPR)
  const cAPR = data?.pools[0]?.apr

  const content = CTA_CARD_INFO[type]
  const sellModal = action === MODAL_TYPE.SELLING
  const buyModal = action === MODAL_TYPE.BUYING
  const ghModal = action === MODAL_TYPE.GENERAL_HARVEST
  const phModal = action === MODAL_TYPE.POOL_HARVEST
  const maximizer = type === CTA_TYPE.MAXIMIZERS
  const pool = type === CTA_TYPE.POOLS
  const lending = type === CTA_TYPE.LENDING
  const compound = type === CTA_TYPE.COMPOUND
  const gnana = type === CTA_TYPE.GNANA

  const iconUrl = `url(/images/cta/${compound ? 'pools' : type}-icon.svg)`
  const bannersUrl = `url(/images/cta/${compound ? 'pools' : type}-banner.svg)`
  const goToDestination = () => window.open(content.destination, '_blank')

  // TO DO - GET THESE DATA AND DISPLAY
  const maxAPY = `${(vAPY && vAPY.toFixed(2)) || '0.00'}% APY`
  const poolAPR = `${(pAPR && pAPR.toFixed(2)) || '0.00'}% APR`
  const compoundAPR = `${(cAPR && cAPR.toFixed(2)) || '0.00'}% APR`
  const formattedDescription = `${
    content.description + ((maximizer && maxAPY) || (pool && poolAPR) || (compound && compoundAPR) || '')
  }`

  // TO DO - Implement triggerCompoundTx
  // const triggerCompoundTx = () => null
  // compound ? triggerCompoundTx : goToDestination

  return (
    <Flex
      sx={{
        ...circular.ctaCard,
        backgroundImage: [bannersUrl, gnana && iconUrl],
        color: ((pool || compound) && 'brown') || 'primaryBright',
        '-webkit-transform': (compound || (maximizer && phModal)) && 'scaleX(-1)',
        transform: (compound || (maximizer && phModal)) && 'scaleX(-1)',
        ':hover': {
          cursor: 'pointer',
        },
      }}
      onClick={goToDestination}
    >
      <Flex
        sx={{
          ...circular.ctaContent,
          '-webkit-transform': (pool || compound) && 'scaleX(-1)',
          transform: (pool || compound) && 'scaleX(-1)',
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            '-webkit-transform': ((maximizer && phModal) || pool) && 'scaleX(-1)',
            textAlign: ((maximizer && phModal) || pool) && 'end',
          }}
        >
          <Text sx={circular.ctaTitle}>{t(`${content.title.toUpperCase()}`)}</Text>
          <Text sx={circular.ctaDescription}>{t(`${formattedDescription}`)}</Text>
        </Flex>
        {!gnana ? (
          <Flex
            sx={{
              ...circular.bannerIcon,
              backgroundImage: iconUrl,
              '-webkit-transform': lending && 'scaleX(-1)',
              transform: lending && 'scaleX(-1)',
            }}
          />
        ) : null}
      </Flex>
    </Flex>
  )
}

export default CTACard
