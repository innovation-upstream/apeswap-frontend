/** @jsxImportSource theme-ui */
import { Button, Flex, Text } from '@ape.swap/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { wrappedToNative } from 'utils'
import React from 'react'
import { useFarms } from 'state/farms/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import StatusIcons from '../StatusIcons'
import { ApeswapWalletLpInterface, MigrateStatus, useMigrateAll } from '../../provider'
import useStakeAll from '../../hooks/useStakeAll'
import useIsMobile from 'hooks/useIsMobile'
const Stake: React.FC<{ apeswapWalletLps: ApeswapWalletLpInterface[] }> = ({ apeswapWalletLps }) => {
  const { chainId, account } = useActiveWeb3React()
  const farms = useFarms(account)
  const { migrateLpStatus } = useMigrateAll()
  const isMobile = useIsMobile()
  const handleStakeAll = useStakeAll()
  const { t } = useTranslation()
  // Since each vault needs a farm we can filter by just farms
  const filteredLps = apeswapWalletLps.filter(({ pair }) =>
    farms.find((farm) => pair.liquidityToken.address.toLowerCase() === farm.lpAddresses[chainId].toLowerCase()),
  )

  // Filter LPs that have been approved
  const filteredLpsForStake = filteredLps?.filter(
    ({ pair }) =>
      migrateLpStatus?.find((status) => status.lpAddress.toLowerCase() === pair.liquidityToken.address.toLowerCase())
        ?.status.approveStake === MigrateStatus.COMPLETE,
  )

  const listView = filteredLpsForStake?.map((apeLp) => {
    const { pair, balance, id } = apeLp
    const { token0, token1, liquidityToken } = pair
    const { address: lpAddress } = liquidityToken
    const status = migrateLpStatus?.find((status) => status.id === id)
    return {
      beforeTokenContent: <StatusIcons id={id} />,
      tokens: { token1: token0.symbol, token2: token1.symbol },
      backgroundColor: 'white3',
      titleContainerWidth: isMobile ? 0 : 350,
      expandedContentSize: 70,
      stakeLp: true,
      title: `${wrappedToNative(token0.symbol)} - ${wrappedToNative(token1.symbol)}`,
      noEarnToken: true,
      forMigratonList: true,
      id: lpAddress,
      cardContent: !isMobile ? (
        <>
          <ListViewContent title={t('Wallet')} value={balance?.toSignificant(6) || '0'} ml={20} />
          <ListViewContent title={t('Staked')} value="0" ml={20} />
          <ListViewContent title={t('Status')} value={status?.statusText || ''} ml={20} width={300} />
        </>
      ) : (
        <Flex sx={{ width: '100%', height: '30px', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
          <Text size="11px" weight={500}>
            <span sx={{ opacity: '.7' }}>Status:</span> {status?.statusText || ''}
          </Text>
        </Flex>
      ),
      expandedContent: isMobile && (
        <>
          <ListViewContent title={t('Wallet')} value={balance?.toSignificant(6) || '0'} ml={20} />
          <ListViewContent title={t('Staked')} value="0" ml={20} />
        </>
      ),
    } as ExtendedListViewProps
  })

  return (
    <Flex sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <Text size="22px" weight={700} mb="15px">
        {t('Stake All LPs')}
      </Text>
      <Text size="12px" weight={500} mb="15px">
        {t('Stake all your current LPs to migrate')}
      </Text>
      <Button mb="20px" onClick={() => handleStakeAll(filteredLpsForStake)}>
        Stake All
      </Button>
      <ListView listViews={listView} />
    </Flex>
  )
}

export default React.memo(Stake)
