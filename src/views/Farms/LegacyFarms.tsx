/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex, Text } from '@ape.swap/uikit'
import { useFarms } from 'state/farms/hooks'
import DisplayLegacyFarms from './components/DisplayLegacyFarms'

const LegacyFarms: React.FC = () => {
  const { account } = useActiveWeb3React()
  const { pathname } = useLocation()
  const farmsLP = useFarms(account)
  const { search } = window.location
  const params = new URLSearchParams(search)
  const urlSearchedFarm = parseInt(params.get('pid'))
  const [query] = useState('')

  const [stakedOnly] = useState(true)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP?.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP?.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedOnlyInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

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
    return farms
  }
  return (
    renderFarms()?.length > 0 && (
      <Flex
        sx={{
          background: 'grey',
          padding: '5px',
          borderRadius: '10px 0px 10px 10px',
          mt: '40px',
          position: 'relative',
        }}
      >
        <Flex
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            padding: '2.5px 10px',
            borderRadius: '10px 10px 0px 0px',
            background: 'grey',
            transform: 'translate(0px, -24px)',
            zIndex: 1,
          }}
        >
          <Text size="12px" color="primaryBright">
            OLD Master Ape V1
          </Text>
        </Flex>
        <DisplayLegacyFarms farms={renderFarms()} />
      </Flex>
    )
  )
}

export default React.memo(LegacyFarms)
