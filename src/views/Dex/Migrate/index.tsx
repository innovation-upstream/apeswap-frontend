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
import MyPositions from '../components/MyPositions'
import { useMigratorBalances } from 'state/zapMigrator/hooks'

export default function Migrate() {
  const { account } = useActiveWeb3React()
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
          <MyPositions />
          <LiquiditySubNav />
          <Flex sx={{ flexDirection: 'column', maxWidth: '100%', width: '420px' }}>
            <Flex sx={{ ...styles.topContainer }}>{!account && <UnlockButton fullWidth mt="10px" />}</Flex>
            {loading || !valid ? (
              <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
                <Spinner size={100} />
              </Flex>
            ) : (
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
            )}
          </Flex>
          {account && (
            <Flex sx={{ flexDirection: 'column', alignItems: 'center', margin: '20px 0px 10px 0px' }}>
              <Text mb="8px">{t('Dont see a pool you joined?')}</Text>
              <Text style={{ textDecoration: 'underline' }} mb="8px" as={Link} to="/find">
                {t('Find other LP tokens')}
              </Text>
            </Flex>
          )}
        </Flex>
        {recentTransactions && <RecentTransactions />}
      </Flex>
    </Flex>
  )
}
