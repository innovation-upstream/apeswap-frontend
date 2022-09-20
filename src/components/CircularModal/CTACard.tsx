/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Flex } from '@ape.swap/uikit'
import { useWeb3React } from '@web3-react/core'

import { useTranslation } from 'contexts/Localization'
import { useVaults } from 'state/vaults/hooks'
import { Vault, Pool } from 'state/types'
import { usePools } from 'state/pools/hooks'
import { getLargestNumber } from 'utils'
import { CTA_CARD_INFO, CTA_TYPE, MODAL_TYPE } from 'config/constants'
import { CTACardProps } from './types'
import { circular } from './styles'
import { PoolCategory } from 'config/constants/types'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { partition } from 'lodash'

const CTACard: React.FC<CTACardProps> = ({ type, action }) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const currentBlock = useBlockNumber()
  const { vaults } = useVaults()
  const allPools = usePools(account)
  console.log('vaults:::', vaults)
  console.log('allPools:::', allPools)

  const [, activeVaults] = partition(vaults, (vault) => vault.inactive)
  const vaultsWithAPY = activeVaults.map((vault) => vault?.apy?.yearly)
  const vAPY = vaultsWithAPY.length > 0 && getLargestNumber(vaultsWithAPY)

  // ISSUE vaults only load when you're inside maximizers page
  // ISSUE pools only load when you're inside pools page
  // MAYBE MOVE vaults and pools CALL TO MAIN CIRCULAR MODAL AND REMOVE FROM CTA CARD

  // remove unwanted pools first like adminPools
  // filter based on openPools
  const allNonAdminPools = allPools.filter((pool) => !pool.forAdmins && pool?.poolCategory !== PoolCategory.JUNGLE)
  const curPools = allNonAdminPools.map((pool) => {
    return { ...pool, isFinished: pool.sousId === 0 ? false : pool.isFinished || currentBlock > pool.endBlock }
  })
  const [, openPools] = partition(curPools, (pool) => pool.isFinished)
  const poolsWithAPR = openPools.map((pool) => pool?.apr)
  const pAPR = poolsWithAPR.length > 0 && getLargestNumber(poolsWithAPR)
  const cAPR = openPools[0]?.apr

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

  // TO DO - GET THESE DATA AND DISPLAY
  let ccAPR
  let ppAPR
  const maxAPY = `${(vAPY && vAPY.toFixed(2)) || '0.00'}% APY`
  const poolAPR = `${(pAPR && pAPR.toFixed(2)) || '0.00'}% APR`
  const compoundAPR = `${(cAPR && cAPR.toFixed(2)) || '0.00'}% APR`
  const formattedDescription = `${
    content.description + ((maximizer && maxAPY) || (pool && poolAPR) || (compound && compoundAPR) || '')
  }`

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
          <Text sx={circular.ctaTitle}>{t(`${content.title.toUpperCase()}`)}</Text>
          <Text sx={circular.ctaDescription}>{t(`${formattedDescription}`)}</Text>
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
