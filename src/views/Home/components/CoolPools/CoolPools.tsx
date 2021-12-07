import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { useFetchPoolsHome } from 'state/strapi/fetchStrapi'
import { Pool } from 'state/types'
import pools from 'config/constants/pools'
import { usePoolFromPid } from 'state/hooks'
import PoolCardForHome from './PoolCardForHome'
import styles from '../homecomponents.module.css'

const CoolPoolsWrapper = styled.div.attrs({
  className: styles.coolPoolsWrapper,
})`
  position: relative;
  height: 321px;
  width: 336px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/ape-home-cool-pools-dark.svg)' : 'url(/images/ape-home-cool-pools-light.svg)'};
  border-radius: 30px;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 40px;
`

const CoolPoolsText = styled(Text)`
  margin-top: 10px;
  font-size: 38px;
  text-align: center;
  color: #ffffff;
`

const PoolWrapper = styled.div.attrs({
  className: styles.poolWrapper,
})`
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const DEFAULT_POOL = 0

const CoolPools = () => {
  const { poolsData, loading } = useFetchPoolsHome()

  const poolMustBeUnder = pools.reduce((prev, curr) => (prev.sousId > curr.sousId ? prev : curr)).sousId

  let sousId1 = parseInt(poolsData[0]?.sousId1) || DEFAULT_POOL
  let sousId2 = parseInt(poolsData[0]?.sousId2) || DEFAULT_POOL
  if (sousId1 > poolMustBeUnder) {
    sousId1 = DEFAULT_POOL
  }
  if (sousId2 > poolMustBeUnder) {
    sousId2 = DEFAULT_POOL
  }

  const poolsToDisplay = [usePoolFromPid(sousId1), usePoolFromPid(sousId2)]

  return (
    <>
      <CoolPoolsWrapper>
        <CoolPoolsText>Cool Pools</CoolPoolsText>
        <PoolWrapper>
          {loading ? (
            <></>
          ) : (
            poolsToDisplay.map((pool: Pool) => (
              <a href="https://apeswap.finance/pools" rel="noopener noreferrer" key={pool?.sousId}>
                <PoolCardForHome pool={pool} key={pool?.sousId} />
              </a>
            ))
          )}
        </PoolWrapper>
      </CoolPoolsWrapper>
    </>
  )
}

export default CoolPools
