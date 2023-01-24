/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Svg } from '@apeswapfinance/uikit'
import { Button, Flex } from '@ape.swap/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { Farm } from 'state/types'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'
import { Container } from './styles'
import { Link } from 'react-router-dom'
import { CURRENT_MIGRATE_PATH } from 'components/Menu/chains/bscConfig'
import Unstake from './MigrateActionsButtons/Unstake'
import { useFarmsV2 } from 'state/farmsV2/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const DisplayFarms: React.FC<{ farms: Farm[] }> = ({ farms }) => {
  const { t } = useTranslation()
  const v2Farms = useFarmsV2(null)
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()

  // TODO: This can be deleted after merge. Copied component to make sure the original isnt cluttered with these changes

  const farmsListView = farms.map((farm) => {
    const [token1, token2] = farm.lpSymbol.split('-')
    const userEarnings = getBalanceNumber(farm?.userData?.earnings || new BigNumber(0))?.toFixed(2)
    const rawStakedBalance = getFullDisplayBalance(new BigNumber(farm.userData.stakedBalance))
    const userStakedBalanceUsd = `$${(
      getBalanceNumber(new BigNumber(farm?.userData.stakedBalance) || new BigNumber(0)) * farm?.lpValueUsd
    ).toFixed(2)}`
    const farmV2Pid = v2Farms.find(
      (farmV2) => farm.tokenAddresses[chainId].toLowerCase() === farmV2.tokenAddresses[chainId].toLowerCase(),
    )?.pid

    return {
      tokens: { token1: farm.pid === 184 ? 'NFTY2' : token1, token2, token3: 'BANANA' },
      stakeLp: true,
      title: <Text bold>{farm.lpSymbol}</Text>,
      titleContainerWidth: 350,
      id: farm.pid,
      cardContent: (
        <>
          {!isMobile && (
            <ListViewContent
              title={t('APR')}
              value={`${farm?.apr}%`}
              valueIcon={
                <span style={{ marginRight: '5px' }}>
                  <Svg icon="banana_token" width={15} color="text" />
                </span>
              }
              width={isMobile ? 100 : 120}
              toolTip={t(
                'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
              )}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(8%, 0%)"
            />
          )}
          {!isMobile && (
            <ListViewContent
              title={t('Liquidity')}
              value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
              width={isMobile ? 100 : 120}
              toolTip={t('The total value of the LP tokens currently staked in this farm.')}
              toolTipPlacement={isMobile ? 'bottomRight' : 'bottomLeft'}
              toolTipTransform={isMobile ? 'translate(13%, 0%)' : 'translate(23%, 0%)'}
            />
          )}
          {!isMobile && <ListViewContent title={t('Earned')} value={userEarnings} width={isMobile ? 65 : 60} />}
          <ListViewContent
            title={t('Staked LP')}
            value={rawStakedBalance.slice(0, 8)}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={isMobile ? 100 : 150}
            lineHeight={15}
            ml={10}
          />
          <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            {isMobile ? (
              <Unstake pid={farm.pid} rawTokenAmount={rawStakedBalance} farmV2Pid={farmV2Pid} />
            ) : (
              <Button as={Link} to={CURRENT_MIGRATE_PATH} fullWidth>
                Migrate
              </Button>
            )}
          </Flex>
        </>
      ),
    } as ExtendedListViewProps
  })

  return (
    <Container>
      <ListView listViews={farmsListView} />
    </Container>
  )
}

export default React.memo(DisplayFarms)
