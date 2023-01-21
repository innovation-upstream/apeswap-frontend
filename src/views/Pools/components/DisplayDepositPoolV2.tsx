/** @jsxImportSource theme-ui */
import React from 'react'
import { IconButton, Text, Flex } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CalcButton from 'components/RoiCalculator/CalcButton'
import useIsMobile from 'hooks/useIsMobile'
import { Pool, Tag } from 'state/types'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import { poolStyles } from './styles'
import Stake from './MigrateActionsButtons/Stake'
import Approve from './MigrateActionsButtons/Approve'

const DisplayDepositPoolV2: React.FC<{ pools: Pool[]; openId?: number; poolTags: Tag[] }> = ({ pools, openId }) => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = !pathname.includes('history')

  const poolsListView = pools.map((pool) => {
    const token1 = pool?.stakingToken?.symbol
    const token2 = pool?.rewardToken?.symbol
    const totalDollarAmountStaked = Math.round(getBalanceNumber(pool?.totalStaked) * pool?.stakingToken?.price)
    const rawTokenBalance = getFullDisplayBalance(new BigNumber(pool?.userData.stakingTokenBalance))
    const userEarnings = getBalanceNumber(
      pool?.userData?.pendingReward || new BigNumber(0),
      pool?.rewardToken?.decimals[chainId],
    )
    const userEarningsUsd = `$${(userEarnings * pool?.rewardToken?.price).toFixed(2)}`

    // Token symbol logic is here temporarily for nfty
    return {
      tokens: { token1, token2: token2 === 'NFTY ' ? 'NFTY2' : token2 || pool?.tokenName },
      title: <Text bold>{pool?.rewardToken?.symbol || pool?.tokenName}</Text>,
      id: pool?.sousId,
      open: openId === pool?.sousId,
      cardContent: (
        <>
          {!isMobile && (
            <Flex sx={{ width: '90px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
              {!isMobile && (
                <>
                  <a href={pool?.projectLink} target="_blank" rel="noreferrer">
                    <IconButton icon="website" color="primaryBright" width={20} style={{ padding: '8.5px 10px' }} />
                  </a>
                  <a href={pool?.twitter} target="_blank" rel="noreferrer">
                    <IconButton icon="twitter" color="primaryBright" width={20} />
                  </a>
                </>
              )}
            </Flex>
          )}
          <ListViewContent
            title={t('APR')}
            value={`${isActive ? pool?.apr?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 80}
            ml={isMobile && 10}
            height={50}
            toolTip={t('APRs are calculated based on current value of the token, reward rate, and share of pool.')}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(10%, 0%)"
            aprCalculator={
              <CalcButton
                label={pool?.stakingToken?.symbol}
                rewardTokenName={pool?.rewardToken?.symbol}
                rewardTokenPrice={pool?.rewardToken?.price}
                apr={pool?.apr}
                tokenAddress={pool?.stakingToken.address[chainId]}
              />
            }
          />
          {!isMobile && (
            <ListViewContent
              title={t('Total Staked')}
              value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
              width={isMobile ? 160 : 110}
              height={50}
              toolTip={t('The total value of the tokens currently staked in this pool.')}
              toolTipPlacement="bottomRight"
              toolTipTransform="translate(13%, 0%)"
            />
          )}
          {!isMobile && (
            <ListViewContent title={t('Earned')} value={userEarningsUsd} height={50} width={isMobile ? 80 : 80} />
          )}
          <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            {new BigNumber(pool?.userData.allowance).gt(0) ? (
              <Stake pid={0} rawTokenBalance={rawTokenBalance} />
            ) : (
              <Approve pid={0} lpAddress={pool.stakingToken.address[chainId]} />
            )}
          </Flex>
        </>
      ),
    } as ExtendedListViewProps
  })
  return (
    <Flex
      sx={{
        background: 'gradient',
        padding: '5px',
        borderRadius: '10px 0px 10px 10px',
        mt: '20px',
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
          background: 'rgb(221,174,66)',
          transform: 'translate(0px, -24px)',
          zIndex: 10,
        }}
      >
        <Text size="12px" color="primaryBright">
          NEW Master Ape V2
        </Text>
      </Flex>
      <Flex sx={poolStyles.container}>
        <ListView listViews={poolsListView} />
      </Flex>
    </Flex>
  )
}

export default React.memo(DisplayDepositPoolV2)
