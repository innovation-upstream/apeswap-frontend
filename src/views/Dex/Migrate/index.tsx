/** @jsxImportSource theme-ui */
import React, { useMemo } from 'react'
import { Pair, SmartRouter, Token } from '@ape.swap/sdk'
import { Text, Flex, AddIcon, Button, Spinner } from '@ape.swap/uikit'
import { Link } from 'react-router-dom'
import UnlockButton from 'components/UnlockButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import FullPositionCard from './components/PositionCard'
import { useUserRecentTransactions } from '../../../state/user/hooks'
import { dexStyles } from '../styles'
import DexNav from '../components/DexNav'
import { styles } from '../AddLiquidity/styles'
import RecentTransactions from '../components/RecentTransactions'
import LiquiditySubNav from '../components/LiquiditySubNav'
import { useMigratorBalances } from 'state/zapMigrator/hooks'
import { usePollFarms, useSetFarms } from 'state/farms/hooks'
import { useFetchFarmLpAprs } from 'state/hooks'

export default function Migrate() {
  // Since we need to display corresponding farm data for an lp we need to pull the farm fata
  useSetFarms()
  usePollFarms()
  const { account, chainId } = useActiveWeb3React()
  useFetchFarmLpAprs(chainId)
  const [recentTransactions] = useUserRecentTransactions()
  const { t } = useTranslation()

  const { loading, valid, results } = useMigratorBalances()
  const walletBalances = valid ? results.filter((bal) => parseFloat(bal.walletBalance) > 0.0) : []
  const stakedBalances = valid ? results.filter((bal) => parseFloat(bal.stakedBalance) > 0.0) : []

  return (
    <Flex sx={{ ...dexStyles.pageContainer }}>
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={{ ...dexStyles.dexContainer }}>
          <DexNav />
          <LiquiditySubNav />
          <Flex sx={{ flexDirection: 'column', maxWidth: '100%', width: '420px' }}>
            <Flex sx={{ ...styles.topContainer }}>{!account && <UnlockButton fullWidth />}</Flex>
            {(loading || !valid) && account ? (
              <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Spinner size={100} />
              </Flex>
            ) : account ? (
              <Flex sx={{ flexDirection: 'column' }}>
                {walletBalances && (
                  <Text mb="15px" ml="1px">
                    {t('Wallet')} ({walletBalances.length})
                  </Text>
                )}
                {walletBalances.map((bal) => (
                  <FullPositionCard {...bal} inWallet key={bal.lpAddress} />
                ))}
                {stakedBalances && (
                  <Text margin="15px 0px" ml="1px">
                    {t('Staked')} ({stakedBalances.length})
                  </Text>
                )}
                {stakedBalances.map((bal) => (
                  <FullPositionCard {...bal} key={bal.lpAddress} />
                ))}
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
        </Flex>
        {recentTransactions && <RecentTransactions />}
      </Flex>
    </Flex>
  )
}
