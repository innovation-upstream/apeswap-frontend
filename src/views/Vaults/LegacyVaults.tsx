/** @jsxImportSource theme-ui */
import React from 'react'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFetchFarmLpAprs } from 'state/hooks'
import { useVaults } from 'state/vaults/hooks'
import { Text, Flex } from '@ape.swap/uikit'
import DisplayLegacyVaults from './components/DisplayLegacyVaults'
import { getBalanceNumber } from 'utils/formatBalance'

const LegacyVaults: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  useFetchFarmLpAprs(chainId)
  const { vaults: initVaults } = useVaults()

  const stakedOnlyVaults = initVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  // Filter out dust left in vaults
  const filterV1Dust = stakedOnlyVaults.flatMap((vault) => {
    if (vault.pid === 22) {
      if (new BigNumber(getBalanceNumber(new BigNumber(vault.userData.stakedBalance))).gt(0.5)) {
        return vault
      } else {
        return []
      }
    }
    if (new BigNumber(getBalanceNumber(new BigNumber(vault.userData.stakedBalance)) * vault.stakeTokenPrice).gt(0.25)) {
      return vault
    } else {
      return []
    }
  })

  return (
    filterV1Dust?.length > 0 && (
      <Flex
        sx={{
          background: 'grey',
          padding: '5px',
          borderRadius: '10px 0px 10px 10px',
          mt: '40px',
          mb: '20px',
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
            OLD Vaults V1
          </Text>
        </Flex>
        <DisplayLegacyVaults vaults={filterV1Dust} />
      </Flex>
    )
  )
}
export default LegacyVaults
