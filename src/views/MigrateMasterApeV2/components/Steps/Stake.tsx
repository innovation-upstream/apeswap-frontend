/** @jsxImportSource theme-ui */
import { Button, Flex, Text } from '@ape.swap/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { useTranslation } from 'contexts/Localization'
import { wrappedToNative } from 'utils'
import React from 'react'
import StatusIcons from '../StatusIcons'
import { useMigrateAll } from '../../provider'
import useStakeAll from '../../hooks/useStakeAll'
import useIsMobile from 'hooks/useIsMobile'
import { MasterApeProductsInterface, MigrateStatus } from '../../provider/types'
const Stake: React.FC<{ apeswapWalletLps: MasterApeProductsInterface[] }> = ({ apeswapWalletLps }) => {
  const { migrateLpStatus } = useMigrateAll()
  const isMobile = useIsMobile()
  const handleStakeAll = useStakeAll()
  const { t } = useTranslation()

  // Filter LPs that have been approved
  const filteredLpsForStake = apeswapWalletLps?.filter(
    ({ id }) => migrateLpStatus?.find((status) => status.id === id)?.status.approveStake === MigrateStatus.COMPLETE,
  )

  const listView = filteredLpsForStake?.map(({ walletBalance, token0, token1, id, singleStakeAsset }) => {
    const status = migrateLpStatus?.find((status) => status.id === id)
    return {
      beforeTokenContent: <StatusIcons id={id} />,
      tokens: singleStakeAsset ? { token1: token0.symbol } : { token1: token0.symbol, token2: token1.symbol },
      backgroundColor: 'white3',
      titleContainerWidth: isMobile ? 0 : 350,
      expandedContentSize: 70,
      stakeLp: true,
      title: singleStakeAsset ? token0.symbol : `${wrappedToNative(token0.symbol)} - ${wrappedToNative(token1.symbol)}`,
      noEarnToken: true,
      forMigratonList: true,
      id: id,
      cardContent: !isMobile ? (
        <>
          <ListViewContent title={t('Wallet')} value={walletBalance?.slice(0, 8) || '0'} ml={20} />
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
          <ListViewContent title={t('Wallet')} value={walletBalance?.slice(0, 8) || '0'} ml={20} />
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
        {t('Stake your new ApeSwap LPs into Yield Farms and BANANA Maximizers.')}
      </Text>
      <Button mb="20px" onClick={() => handleStakeAll(filteredLpsForStake)}>
        Stake All
      </Button>
      <ListView listViews={listView} />
    </Flex>
  )
}

export default React.memo(Stake)
