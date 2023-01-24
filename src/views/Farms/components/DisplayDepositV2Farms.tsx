/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Svg } from '@apeswapfinance/uikit'
import { Flex } from '@ape.swap/uikit'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { Farm, Tag } from 'state/types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CalcButton from 'components/RoiCalculator/CalcButton'
import { useTranslation } from 'contexts/Localization'
import useIsMobile from 'hooks/useIsMobile'
import { Container } from './styles'
import Approve from './MigrateActionsButtons/Approve'
import Stake from './MigrateActionsButtons/Stake'

const DisplayFarms: React.FC<{ farms: Farm[]; openPid?: number; farmTags: Tag[]; v2Flag: boolean }> = ({ farms }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const isMobile = useIsMobile()

  const farmsListView = farms.map((farm) => {
    const [token1, token2] = farm.lpSymbol.split('-')
    const rawTokenBalance = getFullDisplayBalance(new BigNumber(farm.userData.tokenBalance))

    return {
      tokens: { token1: farm.pid === 184 ? 'NFTY2' : token1, token2, token3: 'BANANA' },
      stakeLp: true,
      title: <Text bold>{farm.lpSymbol}</Text>,
      id: farm.pid,
      cardContent: (
        <>
          <ListViewContent
            title={t('APY')}
            value={parseFloat(farm?.apy) > 1000000 ? `>1,000,000%` : `${farm?.apy}%`}
            width={isMobile ? 90 : 150}
            ml={isMobile ? 10 : 20}
            toolTip={t(
              'APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily.',
            )}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(8%, 0%)"
          />
          {!isMobile && (
            <ListViewContent
              title={t('APR')}
              value={`${farm?.apr}%`}
              value2={`${farm?.lpApr}%`}
              value2Icon={
                <span style={{ marginRight: '7px' }}>
                  <Svg icon="swap" width={13} color="text" />
                </span>
              }
              valueIcon={
                <span style={{ marginRight: '5px' }}>
                  <Svg icon="banana_token" width={15} color="text" />
                </span>
              }
              width={isMobile ? 100 : 180}
              toolTip={t(
                'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
              )}
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(8%, 0%)"
              aprCalculator={
                <CalcButton
                  label={farm.lpSymbol}
                  rewardTokenName="BANANA"
                  rewardTokenPrice={farm.bananaPrice}
                  apr={parseFloat(farm?.apr)}
                  lpApr={parseFloat(farm?.lpApr)}
                  apy={parseFloat(farm?.apy)}
                  lpAddress={farm.lpAddresses[chainId]}
                  isLp
                  tokenAddress={farm.tokenAddresses[chainId]}
                  quoteTokenAddress={farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId]}
                  lpCurr1={farm?.tokenAddresses[chainId]}
                  lpCurr2={farm?.quoteTokenAdresses[chainId]}
                />
              }
            />
          )}
          {!isMobile && (
            <ListViewContent
              title={t('Liquidity')}
              value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
              width={isMobile ? 100 : 135}
              toolTip={t('The total value of the LP tokens currently staked in this farm.')}
              toolTipPlacement={isMobile ? 'bottomRight' : 'bottomLeft'}
              toolTipTransform={isMobile ? 'translate(13%, 0%)' : 'translate(23%, 0%)'}
            />
          )}
          <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            {new BigNumber(farm?.userData.allowance).gt(0) ? (
              <Stake pid={farm.pid} rawTokenBalance={rawTokenBalance} />
            ) : (
              <Approve pid={farm.pid} lpAddress={farm.lpAddresses[chainId]} />
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
