/** @jsxImportSource theme-ui */
import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import orderBy from 'lodash/orderBy'
import { useTranslation } from 'contexts/Localization'
import Banner from 'components/Banner'
import ListViewLayout from 'components/layout/ListViewLayout'
import partition from 'lodash/partition'
import { useFetchFarmLpAprs } from 'state/hooks'
import { useVaults } from 'state/vaults/hooks'
import { Vault } from 'state/types'
import DisplayVaults from './components/DisplayVaults'
import VaultMenu from './components/Menu'
import { useSetZapOutputList } from 'state/zap/hooks'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import ListView404 from 'components/ListView404'
import { useVaultsV3 } from 'state/vaultsV3/hooks'
import { Text, Flex } from '@ape.swap/uikit'
import DisplayLegacyVaults from './components/DisplayLegacyVaults'

const LegacyVaults: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  useFetchFarmLpAprs(chainId)
  const { t } = useTranslation()
  const { vaults: initVaults } = useVaults()

  const stakedOnlyVaults = initVaults.filter(
    (vault) => vault.userData && new BigNumber(vault.userData.stakedBalance).isGreaterThan(0),
  )

  return (
    stakedOnlyVaults?.length > 0 && (
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
            OLD Vaults V1
          </Text>
        </Flex>
        <DisplayLegacyVaults vaults={stakedOnlyVaults} />
      </Flex>
    )
  )
}
export default LegacyVaults
