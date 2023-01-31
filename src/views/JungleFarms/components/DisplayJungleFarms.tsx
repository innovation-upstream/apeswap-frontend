/** @jsxImportSource theme-ui */
import { IconButton, Flex, Svg, ListTagVariants, Button } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { JungleFarm, Tag } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import HarvestAction from './Actions/HarvestAction'
import CalcButton from 'components/RoiCalculator/CalcButton'
import useAddLiquidityModal from '../../../components/DualAddLiquidity/hooks/useAddLiquidityModal'
import { ZapType } from '@ape.swap/sdk'
import Tooltip from 'components/Tooltip/Tooltip'
import { BLOCK_EXPLORER } from '../../../config/constants/chains'
import ListView from '../../../components/ListViewV2/ListView'
import ListViewContent from '../../../components/ListViewV2/ListViewContent'
import StakeAction from './Actions/StakeActions'
import { styles } from './styles'

const DisplayJungleFarms: React.FC<{ jungleFarms: JungleFarm[]; openId?: number; jungleFarmTags: Tag[] }> = ({
  jungleFarms,
  openId,
  jungleFarmTags,
}) => {
  const { chainId } = useActiveWeb3React()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const isActive = !pathname.includes('history')

  const onAddLiquidityModal = useAddLiquidityModal(ZapType.ZAP_LP_POOL)

  const jungleFarmsListView = jungleFarms.map((farm) => {
    const isZapable = !farm?.unZapable
    const [token1, token2] = farm.tokenName.split('-')
    const totalDollarAmountStaked = Math.round(getBalanceNumber(farm?.totalStaked) * farm?.stakingToken?.price)

    const userEarnings = getBalanceNumber(
      farm?.userData?.pendingReward || new BigNumber(0),
      farm?.rewardToken?.decimals[chainId],
    )
    const userEarningsUsd = `$${(userEarnings * farm.rewardToken?.price).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(farm?.userData?.stakingTokenBalance || new BigNumber(0))?.toFixed(6)}`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(farm?.userData?.stakingTokenBalance || new BigNumber(0)) * farm?.stakingToken?.price
    ).toFixed(2)}`
    const jTag = jungleFarmTags?.find((tag) => tag.pid === farm.jungleId)
    const explorerLink = BLOCK_EXPLORER[chainId]
    const stakingContractURL = `${explorerLink}/address/${farm?.contractAddress[chainId]}`

    return {
      tokenDisplayProps: {
        token1: token1 === 'LC' ? 'LC2' : token1,
        token2,
        token3: farm?.rewardToken?.symbol === 'LC' ? 'LC2' : farm?.rewardToken?.symbol,
        stakeLp: true,
      },
      listProps: {
        id: farm.jungleId,
        open: openId === farm.jungleId,
        title: (
          <ListViewContent
            tag={jTag?.pid === farm.jungleId ? (jTag?.text.toLowerCase() as ListTagVariants) : null}
            value={farm?.tokenName}
            style={{ maxWidth: '170px' }}
          />
        ),
        infoContent: (
          <Tooltip
            jungleFarm={farm}
            tokenContract={farm?.rewardToken?.address[chainId]}
            secondURL={stakingContractURL}
            secondURLTitle={t('View Farm Contract')}
            projectLink={farm?.projectLink}
            twitter={farm?.twitter}
            audit={farm?.audit}
          />
        ),
        cardContent: (
          <Flex
            sx={{
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Flex sx={styles.onlyMobile}>
              <ListViewContent
                title={t('APR')}
                value={`${isActive ? farm?.apr?.toFixed(2) : '0.00'}%`}
                toolTip={t(
                  'APRs are calculated in real time. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                aprCalculator={
                  <CalcButton
                    label={farm.tokenName}
                    rewardTokenName={farm?.rewardToken?.symbol}
                    rewardTokenPrice={farm?.rewardToken?.price}
                    apr={farm?.apr}
                    lpAddress={farm?.stakingToken?.address[chainId]}
                    isLp
                    lpPrice={farm?.stakingToken?.price}
                    tokenAddress={farm?.lpTokens?.token?.address[chainId]}
                    quoteTokenAddress={
                      farm?.lpTokens?.quoteToken?.address[chainId] === 'TLOS'
                        ? 'ETH'
                        : farm?.lpTokens?.quoteToken?.address[chainId]
                    }
                    lpCurr1={farm?.lpTokens?.token?.address[chainId]}
                    lpCurr2={farm?.lpTokens?.quoteToken?.address[chainId]}
                  />
                }
              />
              <ListViewContent title={t('Earned')} value={userEarningsUsd} />
            </Flex>
            <Flex sx={styles.onlyDesktop}>
              <Flex sx={{ width: '85px', justifyContent: 'flex-start' }}>
                {farm.projectLink && (
                  <a href={farm.projectLink} target="_blank" rel="noreferrer" style={{ marginRight: '5px' }}>
                    <IconButton icon="website" color="primaryBright" width={20} style={{ padding: '8.5px 10px' }} />
                  </a>
                )}
                {farm?.twitter && (
                  <a href={farm?.twitter} target="_blank" rel="noreferrer">
                    <IconButton icon="twitter" color="primaryBright" width={20} />
                  </a>
                )}
              </Flex>
              <ListViewContent
                title={t('APR')}
                value={`${isActive ? farm?.apr?.toFixed(2) : '0.00'}%`}
                toolTip={t(
                  'APRs are calculated in real time. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                aprCalculator={
                  <CalcButton
                    label={farm.tokenName}
                    rewardTokenName={farm?.rewardToken?.symbol}
                    rewardTokenPrice={farm?.rewardToken?.price}
                    apr={farm?.apr}
                    lpAddress={farm?.stakingToken?.address[chainId]}
                    isLp
                    lpPrice={farm?.stakingToken?.price}
                    tokenAddress={farm?.lpTokens?.token?.address[chainId]}
                    quoteTokenAddress={
                      farm?.lpTokens?.quoteToken?.address[chainId] === 'TLOS'
                        ? 'ETH'
                        : farm?.lpTokens?.quoteToken?.address[chainId]
                    }
                    lpCurr1={farm?.lpTokens?.token?.address[chainId]}
                    lpCurr2={farm?.lpTokens?.quoteToken?.address[chainId]}
                  />
                }
                style={{
                  width: '100%',
                  maxWidth: '85px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
              <ListViewContent
                title={t('Liquidity')}
                value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                //width={isMobile ? 160 : 110}
                toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                toolTipPlacement={'bottomLeft'}
                toolTipTransform={'translate(23%, 0%)'}
                style={{
                  width: '100%',
                  maxWidth: '85px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
              <ListViewContent
                title={t('Earned')}
                value={userEarningsUsd}
                style={{
                  width: '100%',
                  maxWidth: '85px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
            </Flex>
          </Flex>
        ),
        expandedContent: (
          <>
            <Flex sx={styles.expandedContent}>
              <Flex sx={{ ...styles.onlyMobile, width: '100%' }}>
                <ListViewContent
                  title={t('Liquidity')}
                  value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                  //width={isMobile ? 160 : 110}
                  toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                  toolTipPlacement={'bottomLeft'}
                  toolTipTransform={'translate(23%, 0%)'}
                />
                <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '10px' }}>
                  <ListViewContent
                    title={`${t('Available LP')}`}
                    value={userTokenBalance}
                    value2={userTokenBalanceUsd}
                    value2Secondary
                    value2Direction="column"
                    style={{ maxWidth: '50%', flexDirection: 'column' }}
                  />
                  <Flex sx={{ width: '50%', maxWidth: '130px' }}>
                    <Button
                      onClick={() =>
                        onAddLiquidityModal(
                          farm?.lpTokens?.token,
                          farm?.lpTokens?.quoteToken,
                          farm?.contractAddress[chainId],
                          farm?.jungleId?.toString(),
                          isZapable,
                        )
                      }
                      sx={styles.styledBtn}
                    >
                      {t('GET LP')}
                      <Flex sx={{ ml: '5px' }}>
                        <Svg icon="ZapIcon" color="primaryBright" />
                      </Flex>
                    </Button>
                  </Flex>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '10px' }}>
                  <StakeAction farm={farm} />
                </Flex>
                <HarvestAction
                  jungleId={farm?.jungleId}
                  disabled={userEarnings <= 0}
                  userEarnings={userEarnings}
                  userEarningsUsd={userEarningsUsd}
                  earnTokenSymbol={farm?.rewardToken?.symbol || farm?.tokenName}
                />
              </Flex>
              <Flex sx={{ ...styles.onlyDesktop, width: '100%' }}>
                <Button
                  onClick={() =>
                    onAddLiquidityModal(
                      farm?.lpTokens?.token,
                      farm?.lpTokens?.quoteToken,
                      farm?.contractAddress[chainId],
                      farm?.jungleId?.toString(),
                      isZapable,
                    )
                  }
                  sx={styles.styledBtn}
                >
                  {t('GET LP')}
                  <Flex sx={{ ml: '5px' }}>
                    <Svg icon="ZapIcon" color="primaryBright" />
                  </Flex>
                </Button>
                <ListViewContent
                  title={`${t('Available LP')}`}
                  value={userTokenBalance}
                  value2={userTokenBalanceUsd}
                  value2Secondary
                  value2Direction="column"
                  style={{ flexDirection: 'column', maxWidth: '120px' }}
                />
                <Svg icon="caret" direction="right" width="17px" />
                <StakeAction farm={farm} />
                <Svg icon="caret" direction="right" width="17px" />
                <HarvestAction
                  jungleId={farm?.jungleId}
                  disabled={userEarnings <= 0}
                  userEarnings={userEarnings}
                  userEarningsUsd={userEarningsUsd}
                  earnTokenSymbol={farm?.rewardToken?.symbol || farm?.tokenName}
                />
              </Flex>
            </Flex>
          </>
        ),
      },
    }
  })
  return <ListView listViews={jungleFarmsListView} />
}

export default React.memo(DisplayJungleFarms)
