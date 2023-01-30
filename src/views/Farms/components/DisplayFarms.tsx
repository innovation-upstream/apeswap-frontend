/** @jsxImportSource theme-ui */
import React from 'react'
import { Svg } from '@apeswapfinance/uikit'
import { Button, Flex, ListTagVariants, useModal } from '@ape.swap/uikit'
import ListView from 'components/ListViewV2'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { Farm, Tag } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import CalcButton from 'components/RoiCalculator/CalcButton'
import { useTranslation } from 'contexts/Localization'
import { Field, selectCurrency } from 'state/swap/actions'
import { useAppDispatch } from 'state'
import CardActions from './CardActions'
import { styles } from './styles'
import HarvestAction from './CardActions/HarvestAction'
import DualLiquidityModal from 'components/DualAddLiquidity/DualLiquidityModal'
import { selectOutputCurrency } from 'state/zap/actions'
import { Svg as Icon } from '@ape.swap/uikit'
import Tooltip from 'components/Tooltip/Tooltip'

const DisplayFarms: React.FC<{ farms: Farm[]; openPid?: number; farmTags: Tag[] }> = ({ farms, openPid, farmTags }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [onPresentAddLiquidityModal] = useModal(<DualLiquidityModal />, true, true, 'liquidityWidgetModal')

  const showLiquidity = (token, quoteToken, farm) => {
    dispatch(
      selectCurrency({
        field: Field.INPUT,
        currencyId: token,
      }),
    )
    dispatch(
      selectCurrency({
        field: Field.OUTPUT,
        currencyId: quoteToken,
      }),
    )
    dispatch(
      selectOutputCurrency({
        currency1: farm.tokenAddresses[chainId],
        currency2: farm.quoteTokenAdresses[chainId],
      }),
    )
    onPresentAddLiquidityModal()
  }

  const farmsListView = farms.map((farm) => {
    const [token1, token2] = farm.lpSymbol.split('-')
    const userAllowance = farm?.userData?.allowance
    const userEarnings = getBalanceNumber(farm?.userData?.earnings || new BigNumber(0))?.toFixed(2)
    const userEarningsUsd = `$${(
      getBalanceNumber(farm?.userData?.earnings || new BigNumber(0)) * farm.bananaPrice
    ).toFixed(2)}`
    const userTokenBalance = `${getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0))?.toFixed(6)} LP`
    const userTokenBalanceUsd = `$${(
      getBalanceNumber(farm?.userData?.tokenBalance || new BigNumber(0)) * farm?.lpValueUsd
    ).toFixed(2)}`
    const fTag = farmTags?.find((tag) => tag.pid === farm.pid)

    return {
      tokenDisplayProps: {
        token1: farm.pid === 184 ? 'NFTY2' : token1,
        token2,
        token3: 'BANANA',
        stakeLp: true,
      },
      listProps: {
        id: farm.pid,
        open: farm.pid === openPid,
        title: (
          <ListViewContent
            tag={fTag?.pid === farm.pid ? (fTag?.text.toLowerCase() as ListTagVariants) : null}
            value={farm?.lpSymbol}
            style={{ maxWidth: '170px' }}
          />
        ),
        infoContent: (
          <Tooltip
            valueTitle={t('Multiplier')}
            valueContent={farm?.multiplier}
            secondURL={farm?.projectLink}
            secondURLTitle={t('Learn More')}
            tokenContract={farm?.lpAddresses[chainId]}
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
                title={t('APY')}
                value={parseFloat(farm?.apy) > 1000000 ? `>1,000,000%` : `${farm?.apy}%`}
                toolTip={t(
                  'APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily.',
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
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                }}
              />
              <ListViewContent
                title={t('Earned')}
                value={userEarnings}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                }}
              />
            </Flex>
            <Flex sx={styles.onlyDesktop}>
              <ListViewContent
                title={t('APY')}
                value={parseFloat(farm?.apy) > 1000000 ? `>1,000,000%` : `${farm?.apy}%`}
                toolTip={t(
                  'APY includes annualized BANANA rewards and rewards for providing liquidity (DEX swap fees), compounded daily.',
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
                style={{
                  width: '100%',
                  maxWidth: '85px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
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
                toolTip={t(
                  'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(8%, 0%)"
                value2Direction="column"
                style={{
                  width: '100%',
                  maxWidth: '85px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
              <ListViewContent
                title={t('Liquidity')}
                value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
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
                value={userEarnings}
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
                  toolTip={t(
                    'BANANA reward APRs are calculated in real time. DEX swap fee APRs are calculated based on previous 24 hours of trading volume. Note: APRs are provided for your convenience. APRs are constantly changing and do not represent guaranteed returns.',
                  )}
                  toolTipPlacement="bottomLeft"
                  toolTipTransform="translate(8%, 0%)"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    flexDirection: 'row',
                  }}
                />
                <ListViewContent
                  title={t('Liquidity')}
                  value={`$${Number(farm?.totalLpStakedUsd).toLocaleString(undefined)}`}
                  toolTip={t('The total value of the LP tokens currently staked in this farm.')}
                  toolTipPlacement={'bottomLeft'}
                  toolTipTransform={'translate(23%, 0%)'}
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    flexDirection: 'row',
                    marginTop: '3px',
                  }}
                />
                <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '10px' }}>
                  <ListViewContent
                    title={t('Available LP')}
                    value={userTokenBalance}
                    value2={userTokenBalanceUsd}
                    value2Secondary
                    value2Direction="column"
                    style={{ maxWidth: '50%', flexDirection: 'column' }}
                  />
                  <Flex sx={{ width: '50%', maxWidth: '130px' }}>
                    <Button
                      onClick={() =>
                        showLiquidity(
                          farm.tokenAddresses[chainId],
                          farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId],
                          farm,
                        )
                      }
                      sx={styles.styledBtn}
                    >
                      {t('GET LP')}
                      <Flex sx={{ ml: '5px' }}>
                        <Icon icon="ZapIcon" color="primaryBright" />
                      </Flex>
                    </Button>
                  </Flex>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '10px' }}>
                  <CardActions
                    allowance={userAllowance?.toString()}
                    stakedBalance={farm?.userData?.stakedBalance?.toString()}
                    stakingTokenBalance={farm?.userData?.tokenBalance?.toString()}
                    stakeLpAddress={farm.lpAddresses[chainId]}
                    lpValueUsd={farm.lpValueUsd}
                    pid={farm.pid}
                  />
                </Flex>
                <HarvestAction
                  pid={farm.pid}
                  disabled={userEarnings === '0.00'}
                  userEarnings={userEarnings}
                  userEarningsUsd={userEarningsUsd}
                />
              </Flex>
              <Flex sx={{ ...styles.onlyDesktop, width: '100%' }}>
                <Button
                  onClick={() =>
                    showLiquidity(
                      farm.tokenAddresses[chainId],
                      farm.quoteTokenSymbol === 'BNB' ? 'ETH' : farm.quoteTokenAdresses[chainId],
                      farm,
                    )
                  }
                  sx={styles.styledBtn}
                >
                  {t('GET LP')}
                  <Flex sx={{ ml: '5px' }}>
                    <Icon icon="ZapIcon" color="primaryBright" />
                  </Flex>
                </Button>
                <ListViewContent
                  title={t('Available LP')}
                  value={userTokenBalance}
                  value2={userTokenBalanceUsd}
                  value2Secondary
                  value2Direction="column"
                  style={{ flexDirection: 'column', maxWidth: '120px' }}
                />
                <Svg icon="caret" direction="right" width="17px" />
                <CardActions
                  allowance={userAllowance?.toString()}
                  stakedBalance={farm?.userData?.stakedBalance?.toString()}
                  stakingTokenBalance={farm?.userData?.tokenBalance?.toString()}
                  stakeLpAddress={farm.lpAddresses[chainId]}
                  lpValueUsd={farm.lpValueUsd}
                  pid={farm.pid}
                />
                <Svg icon="caret" direction="right" width="17px" />
                <HarvestAction
                  pid={farm.pid}
                  disabled={userEarnings === '0.00'}
                  userEarnings={userEarnings}
                  userEarningsUsd={userEarningsUsd}
                />
              </Flex>
            </Flex>
          </>
        ),
      },
    }
  })

  return <ListView listViews={farmsListView} />
}

export default React.memo(DisplayFarms)
