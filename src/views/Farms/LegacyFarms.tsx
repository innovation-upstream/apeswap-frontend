/** @jsxImportSource theme-ui */
import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex } from '@ape.swap/uikit'
import { useFetchFarmLpAprs } from 'state/hooks'
import ListViewMenu from 'components/ListViewMenu'
import { orderBy } from 'lodash'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import { useTranslation } from 'contexts/Localization'
import { Farm } from 'state/types'
import { useFarms, useFarmTags, usePollFarms, useSetFarms, useFarmOrderings } from 'state/farms/hooks'
import DisplayFarms from './components/DisplayFarms'
import { BLUE_CHIPS, NUMBER_OF_FARMS_VISIBLE, STABLES } from './constants'
import HarvestAllAction from './components/CardActions/HarvestAllAction'
import { useSetZapOutputList } from 'state/zap/hooks'
import ListView404 from 'components/ListView404'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import DisplayLegacyFarms from './components/DisplayLegacyFarms'

const LegacyFarms: React.FC = () => {
  useSetFarms()
  usePollFarms()
  const { account, chainId } = useActiveWeb3React()
  useFetchFarmLpAprs(chainId)
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const farmsLP = useFarms(account)
  const { search } = window.location
  const params = new URLSearchParams(search)
  const urlSearchedFarm = parseInt(params.get('pid'))
  const [query, setQuery] = useState('')
  const [sortOption, setSortOption] = useState('all')
  const { farmTags } = useFarmTags(chainId)
  const { farmOrderings } = useFarmOrderings(chainId)

  const [stakedOnly, setStakedOnly] = useState(true)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP?.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP?.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedOnlyInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const hasHarvestPids = [...activeFarms, ...inactiveFarms]
    .filter((farm) => farm.userData && new BigNumber(farm.userData.earnings).isGreaterThan(0))
    .map((filteredFarm) => {
      return filteredFarm.pid
    })

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const renderFarms = () => {
    let farms = isActive ? activeFarms : inactiveFarms

    if (urlSearchedFarm) {
      const farmCheck =
        activeFarms?.find((farm) => {
          return farm.pid === urlSearchedFarm
        }) !== undefined
      if (farmCheck) {
        farms = [
          activeFarms?.find((farm) => {
            return farm.pid === urlSearchedFarm
          }),
          ...activeFarms?.filter((farm) => {
            return farm.pid !== urlSearchedFarm
          }),
        ]
      }
    }

    if (stakedOnly) {
      farms = isActive ? stakedOnlyFarms : stakedOnlyInactiveFarms
    }

    if (query) {
      farms = farms.filter((farm) => {
        return farm.lpSymbol.toUpperCase().includes(query.toUpperCase())
      })
    }

    // TODO: Refactor this to be a helper function outside of this file
    switch (sortOption) {
      case 'all':
        return farmOrderings
          ? orderBy(farms, (farm: Farm) => farmOrderings.find((ordering) => ordering.pid === farm.pid)?.order, 'asc')
          : farms
      case 'stables':
        return farms.filter((farm) => STABLES.includes(farm.tokenSymbol) && STABLES.includes(farm.quoteTokenSymbol))

      case 'apr':
        return orderBy(farms, (farm) => parseFloat(farm.apy), 'desc')
      case 'blueChips':
        return farms.filter(
          (farm) => BLUE_CHIPS.includes(farm.tokenSymbol) || BLUE_CHIPS.includes(farm.quoteTokenSymbol),
        )
      case 'liquidity':
        return orderBy(farms, (farm: Farm) => parseFloat(farm.totalLpStakedUsd), 'desc')
      case 'hot':
        return farmTags
          ? orderBy(
              farms,
              (farm: Farm) => farmTags?.find((tag) => tag.pid === farm.pid && tag.text.toLowerCase() === 'hot'),
              'asc',
            )
          : farms
      case 'new':
        return farmTags
          ? orderBy(
              farms,
              (farm: Farm) => farmTags?.find((tag) => tag.pid === farm.pid && tag.text.toLowerCase() === 'new'),
              'asc',
            )
          : farms
      default:
        return farmOrderings
          ? orderBy(farms, (farm: Farm) => farmOrderings.find((ordering) => ordering.pid === farm.pid)?.order, 'asc')
          : farms
    }
  }

  // Set zap output list to match farms
  useSetZapOutputList(
    activeFarms?.map((farm) => {
      return { currencyIdA: farm?.tokenAddresses[chainId], currencyIdB: farm?.quoteTokenAdresses[chainId] }
    }),
  )

  return <DisplayLegacyFarms farms={renderFarms()} openPid={urlSearchedFarm} farmTags={farmTags} v2Flag={false} />
}

export default React.memo(LegacyFarms)
