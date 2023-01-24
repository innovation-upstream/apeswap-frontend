/** @jsxImportSource theme-ui */
import React from 'react'
import { IconButton, Flex, Button, ListTagVariants } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useLocation, useHistory } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CalcButton from 'components/RoiCalculator/CalcButton'
import { Pool, Tag } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
import { useTranslation } from 'contexts/Localization'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'
import { poolStyles } from './styles'
import ListView from 'components/ListViewV2'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import Tooltip from 'components/Tooltip/Tooltip'
import { BLOCK_EXPLORER } from 'config/constants/chains'

const DisplayPools: React.FC<{ pools: Pool[]; openId?: number; poolTags: Tag[] }> = ({ pools, openId, poolTags }) => {
  const { chainId } = useActiveWeb3React()
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
    const userEarningsUsd = `$${(userEarnings * pool.rewardToken?.price).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0))?.toFixed(3)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(pool?.userData?.stakingTokenBalance || new BigNumber(0)) * pool?.stakingToken?.price
    ).toFixed(2)}`

    const pTag = poolTags?.find((tag) => tag.pid === pool.sousId)
    const explorerLink = BLOCK_EXPLORER[chainId]
    const poolContractURL = `${explorerLink}/address/${pool?.contractAddress[chainId]}`

    const openLiquidityUrl = () =>
      pool?.stakingToken?.symbol === 'GNANA'
        ? history.push({ search: '?modal=gnana' })
        : window.open(liquidityUrl, '_blank')

    // Token symbol logic is here temporarily for nfty
    return {
      tokenDisplayProps: {
        token1,
        token2: token2 === 'NFTY ' ? 'NFTY2' : token2 || pool?.tokenName,
      },
      listProps: {
        id: pool.sousId,
        title: (
          <ListViewContent
            tag={pTag?.pid === pool.sousId ? (pTag?.text.toLowerCase() as ListTagVariants) : null}
            value={pool?.rewardToken?.symbol || pool?.tokenName}
            style={{ maxWidth: '150px' }}
          />
        ),
        infoContent: (
          <Tooltip
            tokenContract={pool?.rewardToken?.address[chainId]}
            secondURL={poolContractURL}
            secondURLTitle={t('View Pool Contract')}
            twitter={pool?.twitter}
            projectLink={pool?.projectLink}
            audit={pool?.audit}
            pool={pool}
          />
        ),
        cardContent: (
          <Flex
            sx={{
              flexDirection: 'column',
              '@media screen and (min-width: 852px)': { flexDirection: 'row' },
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Flex sx={poolStyles.onlyMobile}>
              <ListViewContent
                title={t('APR')}
                value={`${isActive ? pool?.apr?.toFixed(2) : '0.00'}%`}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                }}
                toolTip={t('APRs are calculated based on current value of the token, reward rate, and share of pool.')}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(10%, 0%)"
                aprCalculator={
                  <CalcButton
                    label={pool?.stakingToken?.symbol}
                    rewardTokenName={pool?.rewardToken?.symbol}
                    rewardTokenPrice={pool?.rewardToken?.price}
                    apr={pool?.apr}
                    tokenAddress={pool.stakingToken.address[chainId]}
                  />
                }
              />
              <ListViewContent
                title={t('Earned')}
                value={userEarningsUsd}
                style={{ width: '100%', maxWidth: '100%', flexDirection: 'row', marginTop: '3px' }}
              />
            </Flex>
            <Flex sx={poolStyles.onlyDesktop}>
              <Flex sx={{ width: '90px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href={pool.projectLink} target="_blank" rel="noreferrer">
                  <IconButton icon="website" color="primaryBright" width={20} style={{ padding: '8.5px 10px' }} />
                </a>
                <a href={pool?.twitter} target="_blank" rel="noreferrer">
                  <IconButton icon="twitter" color="primaryBright" width={20} />
                </a>
              </Flex>
              <ListViewContent
                title={t('APR')}
                value={`${isActive ? pool?.apr?.toFixed(2) : '0.00'}%`}
                style={{
                  width: '100%',
                  maxWidth: '80px',
                  flexDirection: 'column',
                }}
                toolTip={t('APRs are calculated based on current value of the token, reward rate, and share of pool.')}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(10%, 0%)"
                aprCalculator={
                  <CalcButton
                    label={pool?.stakingToken?.symbol}
                    rewardTokenName={pool?.rewardToken?.symbol}
                    rewardTokenPrice={pool?.rewardToken?.price}
                    apr={pool?.apr}
                    tokenAddress={pool.stakingToken.address[chainId]}
                  />
                }
              />
              <ListViewContent
                title={t('Total Staked')}
                value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                style={{
                  width: '100%',
                  maxWidth: '110px',
                  flexDirection: 'column',
                }}
                toolTip={t('The total value of the tokens currently staked in this pool.')}
                toolTipPlacement="bottomRight"
                toolTipTransform="translate(13%, 0%)"
              />
              <ListViewContent
                title={t('Earned')}
                value={userEarningsUsd}
                style={{
                  width: '100%',
                  maxWidth: '100px',
                  flexDirection: 'column',
                }}
              />
            </Flex>
          </Flex>
        ),
        expandedContent: (
          <>
            <Flex sx={{ ...poolStyles.expandedContent, ...poolStyles.onlyMobile }}>
              <ListViewContent
                title={t('Total Staked')}
                value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                style={{ width: '100%', flexDirection: 'row', marginBottom: '10px' }}
                toolTip={t('The total value of the tokens currently staked in this pool.')}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(36%, 0%)"
              />
              <Flex sx={{ justifyContent: 'space-between' }}>
                <ListViewContent
                  title={`${t('Available')} ${pool?.stakingToken?.symbol}`}
                  value={userTokenBalance}
                  value2={userTokenBalanceUsd}
                  value2Secondary
                  value2Direction="column"
                  style={{ maxWidth: '50%', flexDirection: 'column' }}
                />
                <Flex sx={{ width: '50%', maxWidth: '130px' }}>
                  <Button variant="primary" sx={poolStyles.styledBtn} onClick={openLiquidityUrl}>
                    {t('GET')} {pool?.stakingToken?.symbol}
                  </Button>
                </Flex>
              </Flex>
              <Flex sx={{ marginTop: '15px', width: '100%' }}>
                <Actions
                  allowance={userAllowance?.toString()}
                  stakedBalance={pool?.userData?.stakedBalance?.toString()}
                  stakedTokenSymbol={pool?.stakingToken?.symbol}
                  stakingTokenBalance={pool?.userData?.stakingTokenBalance?.toString()}
                  stakeTokenAddress={pool?.stakingToken?.address[chainId]}
                  stakeTokenValueUsd={pool?.stakingToken?.price}
                  earnTokenSymbol={pool?.rewardToken?.symbol || pool?.tokenName}
                  sousId={pool?.sousId}
                />
              </Flex>
              <Flex sx={{ marginTop: '15px', width: '100%', flexWrap: 'wrap' }}>
                <HarvestAction
                  sousId={pool?.sousId}
                  disabled={userEarnings <= 0}
                  userEarnings={userEarnings}
                  earnTokenSymbol={pool?.rewardToken?.symbol || pool?.tokenName}
                  earnTokenValueUsd={pool?.rewardToken?.price}
                />
              </Flex>
            </Flex>
            <Flex sx={{ ...poolStyles.actionContainer, ...poolStyles.onlyDesktop }}>
              <Button variant="primary" sx={poolStyles.styledBtn} onClick={openLiquidityUrl}>
                {t('GET')} {pool?.stakingToken?.symbol}
              </Button>
              <ListViewContent
                title={`${t('Available')} ${pool?.stakingToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                value2Direction="column"
                style={{ maxWidth: '110px', marginLeft: '10px', flexDirection: 'column' }}
              />
              <NextArrow />
              <Actions
                allowance={userAllowance?.toString()}
                stakedBalance={pool?.userData?.stakedBalance?.toString()}
                stakedTokenSymbol={pool?.stakingToken?.symbol}
                stakingTokenBalance={pool?.userData?.stakingTokenBalance?.toString()}
                stakeTokenAddress={pool?.stakingToken?.address[chainId]}
                stakeTokenValueUsd={pool?.stakingToken?.price}
                earnTokenSymbol={pool?.rewardToken?.symbol || pool?.tokenName}
                sousId={pool?.sousId}
              />
              <NextArrow />
              <HarvestAction
                sousId={pool?.sousId}
                disabled={userEarnings <= 0}
                userEarnings={userEarnings}
                earnTokenSymbol={pool?.rewardToken?.symbol || pool?.tokenName}
                earnTokenValueUsd={pool?.rewardToken?.price}
              />
            </Flex>
          </>
        ),
      },
    }
  })
  return <ListView listViews={poolsListView} />
}

export default React.memo(DisplayPools)
