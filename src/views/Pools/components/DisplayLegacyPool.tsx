/** @jsxImportSource theme-ui */
import React from 'react'
import { IconButton, Text, Flex, TagVariants, Button } from '@ape.swap/uikit'
import { Box } from 'theme-ui'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useLocation, useHistory, Link } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CalcButton from 'components/RoiCalculator/CalcButton'
import useIsMobile from 'hooks/useIsMobile'
import { Pool, Tag } from 'state/types'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
import { useTranslation } from 'contexts/Localization'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'
import InfoContent from '../InfoContent'
import { StyledTag, poolStyles } from './styles'
import Unstake from './MigrateActionsButtons/Unstake'
import { CURRENT_MIGRATE_PATH } from 'components/Menu/chains/bscConfig'

const DisplayLegacyPool: React.FC<{ pools: Pool[]; openId?: number; poolTags: Tag[] }> = ({
  pools,
  openId,
  poolTags,
}) => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = !pathname.includes('history')
  const history = useHistory()

  const poolsListView = pools.map((pool) => {
    const token1 = pool?.stakingToken?.symbol
    const token2 = pool?.rewardToken?.symbol
    const totalDollarAmountStaked = Math.round(getBalanceNumber(pool?.totalStaked) * pool?.stakingToken?.price)
    const liquidityUrl = !pool?.lpStaking
      ? pool?.stakingToken?.symbol === 'GNANA'
        ? 'https://apeswap.finance/gnana'
        : `https://apeswap.finance/swap?outputCurrency=${pool?.stakingToken?.address[chainId]}`
      : `${BASE_ADD_LIQUIDITY_URL}/${pool?.lpTokens?.token?.address[chainId]}/${pool?.lpTokens?.quoteToken?.address[chainId]}`
    const userAllowance = pool?.userData?.allowance
    const userEarnings = getBalanceNumber(
      pool?.userData?.pendingReward || new BigNumber(0),
      pool?.rewardToken?.decimals[chainId],
    )
    const userEarningsUsd = `$${(userEarnings * pool?.rewardToken?.price).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0))?.toFixed(6)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0)) * pool?.stakingToken?.price
    ).toFixed(2)}`

    const rawStakedBalance = getFullDisplayBalance(new BigNumber(pool?.userData.stakedBalance))
    const userStakedBalanceUsd = `$${(
      getBalanceNumber(new BigNumber(pool?.userData.stakedBalance) || new BigNumber(0)) * pool?.stakingToken.price
    ).toFixed(2)}`

    const pTag = poolTags?.find((tag) => tag.pid === pool?.sousId)
    const tagColor = pTag?.color as TagVariants

    const openLiquidityUrl = () =>
      pool?.stakingToken?.symbol === 'GNANA'
        ? history.push({ search: '?modal=gnana' })
        : window.open(liquidityUrl, '_blank')

    // Token symbol logic is here temporarily for nfty
    return {
      tokens: { token1, token2: token2 === 'NFTY ' ? 'NFTY2' : token2 || pool?.tokenName },
      title: <Text bold>{pool?.rewardToken?.symbol || pool?.tokenName}</Text>,
      id: pool?.sousId,
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
          {!isMobile && (
            <ListViewContent
              title={t('APR')}
              value={`${isActive ? pool?.apr?.toFixed(2) : '0.00'}%`}
              width={isMobile ? 95 : 80}
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
          )}
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
          <ListViewContent
            title={`${t('Staked')} ${pool?.stakingToken.symbol}`}
            value={`${rawStakedBalance.slice(0, 10)}`}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={100}
            height={50}
            lineHeight={15}
            ml={10}
          />
          <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            <Button as={Link} to={CURRENT_MIGRATE_PATH} fullWidth>
              Migrate
            </Button>
            {/* <Unstake rawTokenAmount={rawStakedBalance} /> */}
          </Flex>
        </>
      ),
    } as ExtendedListViewProps
  })
  return (
    <Flex
      sx={{
        background: 'grey',
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
          background: 'grey',
          transform: 'translate(0px, -24px)',
          zIndex: 1,
        }}
      >
        <Text size="12px" color="primaryBright">
          OLD Master Ape V1
        </Text>
      </Flex>
      <Flex sx={poolStyles.container}>
        <ListView listViews={poolsListView} />
      </Flex>
    </Flex>
  )
}

export default React.memo(DisplayLegacyPool)
