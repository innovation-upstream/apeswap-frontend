/** @jsxImportSource theme-ui */
import React, { useEffect, useState } from 'react'
import { Flex } from '@ape.swap/uikit'

import { useWeb3React } from '@web3-react/core'
import { useVaults } from 'state/vaults/hooks'
import { usePools } from 'state/pools/hooks'
import { PoolCategory } from 'config/constants/types'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { partition } from 'lodash'

import CTACard from './CTACard'
import { CTAProps } from './types'
import { CTA_TYPE, MODAL_TYPE } from 'config/constants'

const CTA: React.FC<CTAProps> = ({ actionType }) => {
  const { account } = useWeb3React()
  const currentBlock = useBlockNumber()
  const { vaults: allVaults } = useVaults()
  const allPools = usePools(account)
  const [vaults, setVaults] = useState(allVaults)
  const [pools, setPools] = useState(allPools)
  console.log('vaults:::', vaults)
  console.log('pools:::', pools)

  useEffect(() => {
    setVaults(allVaults)
    setPools(allPools)
  }, [allVaults, allPools])

  const [, activeVaults] = partition(vaults, (vault) => vault.inactive)

  // ISSUE vaults only load when you're inside maximizers page
  // ISSUE pools only load when you're inside pools page
  // MAYBE MOVE vaults and pools CALL TO MAIN CIRCULAR MODAL AND REMOVE FROM CTA CARD

  // remove unwanted pools first like adminPools
  // filter based on openPools
  const allNonAdminPools = pools.filter((pool) => !pool.forAdmins && pool?.poolCategory !== PoolCategory.JUNGLE)
  const curPools = allNonAdminPools.map((pool) => {
    return { ...pool, isFinished: pool.sousId === 0 ? false : pool.isFinished || currentBlock > pool.endBlock }
  })
  const [, openPools] = partition(curPools, (pool) => pool.isFinished)
  const data = { vaults: activeVaults, pools: openPools }

  const CTA_CARDS = {
    selling: {
      0: <CTACard data={data} type={CTA_TYPE.MAXIMIZERS} action={MODAL_TYPE.SELLING} />,
      1: <CTACard data={data} type={CTA_TYPE.POOLS} action={MODAL_TYPE.SELLING} />,
      2: <CTACard data={data} type={CTA_TYPE.LENDING} action={MODAL_TYPE.SELLING} />,
    },
    buying: {
      0: <CTACard data={data} type={CTA_TYPE.MAXIMIZERS} action={MODAL_TYPE.BUYING} />,
      1: <CTACard data={data} type={CTA_TYPE.POOLS} action={MODAL_TYPE.BUYING} />,
      2: <CTACard data={data} type={CTA_TYPE.GNANA} action={MODAL_TYPE.BUYING} />,
    },
    generalHarvest: {
      0: <CTACard data={data} type={CTA_TYPE.MAXIMIZERS} action={MODAL_TYPE.GENERAL_HARVEST} />,
      1: <CTACard data={data} type={CTA_TYPE.POOLS} action={MODAL_TYPE.GENERAL_HARVEST} />,
      2: <CTACard data={data} type={CTA_TYPE.GNANA} action={MODAL_TYPE.GENERAL_HARVEST} />,
    },
    poolHarvest: {
      0: <CTACard data={data} type={CTA_TYPE.COMPOUND} action={MODAL_TYPE.POOL_HARVEST} />,
      1: <CTACard data={data} type={CTA_TYPE.MAXIMIZERS} action={MODAL_TYPE.POOL_HARVEST} />,
      2: <CTACard data={data} type={CTA_TYPE.GNANA} action={MODAL_TYPE.POOL_HARVEST} />,
    },
  }
  const cards = CTA_CARDS[actionType]
  const cardsLength = Object.keys(cards).length
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        marginTop: ['20px', '30px'],
      }}
    >
      {/* Display each collection of CTACard data={data}s using the modal actionType */}
      {[...Array(cardsLength)].map((_, idx) => cards[idx])}
    </Flex>
  )
}

export default CTA
