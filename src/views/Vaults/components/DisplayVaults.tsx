/** @jsxImportSource theme-ui */
import { Button, Flex, ListTagVariants, Svg, useModal } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { Field, selectCurrency } from 'state/swap/actions'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Vault } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { vaultTokenDisplay } from '../helpers'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'
import DualLiquidityModal from 'components/DualAddLiquidity/DualLiquidityModal'
import { selectOutputCurrency } from 'state/zap/actions'
import Tooltip from 'components/Tooltip/Tooltip'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import ListView from 'components/ListViewV2/ListView'
import ListViewContent from 'components/ListViewV2/ListViewContent'
import { styles } from './styles'
import { VaultVersion } from '@ape.swap/apeswap-lists'

const DisplayVaults: React.FC<{ vaults: Vault[]; openId?: number }> = ({ vaults, openId }) => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')
  const { t } = useTranslation()

  const [onPresentAddLiquidityWidgetModal] = useModal(<DualLiquidityModal />, true, true, 'dualLiquidityModal')

  const showLiquidity = (token, quoteToken, vault) => {
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
        currency1: vault.token.address[chainId],
        currency2: vault.quoteToken.address[chainId],
      }),
    )
    onPresentAddLiquidityWidgetModal()
  }

  const vaultsListView = vaults.map((vault) => {
    const totalDollarAmountStaked = Math.round(parseFloat(vault?.totalStaked) * vault?.stakeTokenPrice * 100) / 100
    const liquidityUrl = `https://apeswap.finance/swap/`
    const userAllowance = vault?.userData?.allowance
    const userEarnings = getBalanceNumber(new BigNumber(vault?.userData?.pendingRewards) || new BigNumber(0))
    const userEarningsUsd = `$${(
      (getBalanceNumber(new BigNumber(vault?.userData?.pendingRewards)) || 0) * vault.rewardTokenPrice
    ).toFixed(2)}`
    const userTokenBalance = (getBalanceNumber(new BigNumber(vault?.userData?.tokenBalance)) || 0).toFixed(4)
    const userTokenBalanceUsd = `$${(parseFloat(userTokenBalance || '0') * vault?.stakeTokenPrice).toFixed(2)}`
    const userStakedBalance = getBalanceNumber(new BigNumber(vault?.userData?.stakedBalance))
    const userStakedBalanceUsd = `$${((userStakedBalance || 0) * vault?.stakeTokenPrice).toFixed(2)}`

    const { tokenDisplay, stakeLp, earnLp } = vaultTokenDisplay(vault.stakeToken, vault.rewardToken)
    const explorerLink = BLOCK_EXPLORER[chainId]
    const vaultContractURL = `${explorerLink}/address/${vault?.stratAddress[chainId]}`

    return {
      tokenDisplayProps: {
        token1: tokenDisplay?.token1,
        token2: tokenDisplay?.token2,
        token3: tokenDisplay?.token3,
        token4: tokenDisplay?.token4,
        stakeLp,
        earnLp,
      },
      listProps: {
        id: vault.id,
        open: openId === vault.id,
        title: (
          <ListViewContent
            tag={vault.type.toLowerCase() as ListTagVariants}
            value={vault.stakeToken.symbol}
            style={{ maxWidth: '170px' }}
          />
        ),
        infoContent: (
          <Tooltip
            valueTitle={t('Withdrawal Fee')}
            valueContent={`${vault?.withdrawFee}%`}
            value2Title={t('Performance Fee')}
            value2Content={`${vault?.keeperFee}%`}
            secondURL={vaultContractURL}
            secondURLTitle={t('View Vault Contract')}
            tokenContract={vault?.stakeToken?.address[chainId]}
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
                value={`${isActive ? vault?.apy?.yearly?.toFixed(2) : '0.00'}%`}
                toolTip={t(
                  'Annual APY includes annualized BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(28%, 0%)"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                }}
              />
              <ListViewContent
                title={vault.version === 'V1' ? t('Staked') : t('Earned')}
                value={vault.version === 'V1' ? userStakedBalanceUsd : userEarningsUsd}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  flexDirection: 'row',
                }}
              />
            </Flex>
            <Flex sx={styles.onlyDesktop}>
              <ListViewContent
                title={t('Daily APY')}
                value={`${isActive ? vault?.apy?.daily?.toFixed(2) : '0.00'}%`}
                toolTip={t(
                  'Daily APY includes BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(25%, 0%)"
                style={{
                  width: '100%',
                  maxWidth: '140px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
              <ListViewContent
                title={t('APY')}
                value={`${isActive ? vault?.apy?.yearly?.toFixed(2) : '0.00'}%`}
                toolTip={t(
                  'Annual APY includes annualized BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
                )}
                toolTipPlacement="bottomLeft"
                toolTipTransform="translate(28%, 0%)"
                style={{
                  width: '100%',
                  maxWidth: '155px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
              <ListViewContent
                title={t('Liquidity')}
                value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                toolTip={t('The total value of the tokens currently staked in this vault.')}
                toolTipPlacement="bottomRight"
                toolTipTransform="translate(13%, 0%)"
                style={{
                  width: '100%',
                  maxWidth: '170px',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              />
              <ListViewContent
                title={vault.version === VaultVersion.V1 ? t('Staked') : t('Earned')}
                value={vault.version === VaultVersion.V1 ? userStakedBalanceUsd : userEarningsUsd}
                style={{
                  width: '100%',
                  maxWidth: '115px',
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
                  title={t('Daily APY')}
                  value={`${isActive ? vault?.apy?.daily?.toFixed(2) : '0.00'}%`}
                  toolTip={t(
                    'Daily APY includes BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
                  )}
                  toolTipPlacement="bottomLeft"
                  toolTipTransform="translate(25%, 0%)"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    flexDirection: 'row',
                  }}
                />
                <ListViewContent
                  title={t('Liquidity')}
                  value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
                  toolTip={t('The total value of the tokens currently staked in this vault.')}
                  toolTipPlacement="bottomRight"
                  toolTipTransform="translate(13%, 0%)"
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    flexDirection: 'row',
                  }}
                />
                <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '10px' }}>
                  <ListViewContent
                    title={t('Available %stakeTokenSymbol%', {
                      stakeTokenSymbol: vault.stakeToken.lpToken ? 'LP' : vault?.stakeToken?.symbol,
                    })}
                    value={userTokenBalance}
                    value2={userTokenBalanceUsd}
                    value2Secondary
                    value2Direction="column"
                    style={{ maxWidth: '50%', flexDirection: 'column' }}
                  />
                  <Flex sx={{ width: '50%', maxWidth: '130px' }}>
                    {vault.stakeToken?.lpToken ? (
                      <Button
                        onClick={() =>
                          showLiquidity(
                            vault.token.symbol === 'BNB' ? 'ETH' : vault.token.address[chainId],
                            vault.quoteToken.symbol === 'BNB' ? 'ETH' : vault.quoteToken.address[chainId],
                            vault,
                          )
                        }
                        sx={styles.styledBtn}
                      >
                        {t('GET LP')}
                        <Flex sx={{ ml: '5px' }}>
                          <Svg icon="ZapIcon" color="primaryBright" />
                        </Flex>
                      </Button>
                    ) : (
                      <a href={liquidityUrl} target="_blank" rel="noopener noreferrer" style={{ width: '100%' }}>
                        <Button sx={styles.styledBtn}>GET {vault?.stakeToken?.symbol}</Button>
                      </a>
                    )}
                  </Flex>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between', width: '100%', mt: '10px' }}>
                  <Actions
                    allowance={userAllowance?.toString()}
                    stakedBalance={vault?.userData?.stakedBalance?.toString()}
                    stakedTokenSymbol={vault?.stakeToken?.symbol}
                    stakingTokenBalance={vault?.userData?.tokenBalance?.toString()}
                    stakeTokenAddress={vault?.stakeToken?.address[chainId]}
                    stakeTokenValueUsd={vault?.stakeTokenPrice}
                    withdrawFee={vault?.withdrawFee}
                    pid={vault.pid}
                    vaultVersion={vault.version}
                  />
                </Flex>
                {(vault.version === VaultVersion.V2 || vault.version === VaultVersion.V3) && (
                  <HarvestAction
                    pid={vault?.pid}
                    disabled={userEarnings <= 0}
                    userEarnings={userEarnings}
                    earnTokenSymbol={vault?.rewardToken?.symbol}
                  />
                )}
              </Flex>
              <Flex sx={{ ...styles.onlyDesktop, width: '100%' }}>
                {vault.stakeToken?.lpToken ? (
                  <Button
                    onClick={() =>
                      showLiquidity(
                        vault.token.symbol === 'BNB' ? 'ETH' : vault.token.address[chainId],
                        vault.quoteToken.symbol === 'BNB' ? 'ETH' : vault.quoteToken.address[chainId],
                        vault,
                      )
                    }
                    sx={styles.styledBtn}
                  >
                    {t('GET LP')}
                    <Flex sx={{ ml: '5px' }}>
                      <Svg icon="ZapIcon" color="primaryBright" />
                    </Flex>
                  </Button>
                ) : (
                  <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
                    <Button sx={styles.styledBtn}>GET {vault?.stakeToken?.symbol}</Button>
                  </a>
                )}
                <ListViewContent
                  title={t('Available %stakeTokenSymbol%', {
                    stakeTokenSymbol: vault.stakeToken.lpToken ? 'LP' : vault?.stakeToken?.symbol,
                  })}
                  value={userTokenBalance}
                  value2={userTokenBalanceUsd}
                  value2Secondary
                  value2Direction="column"
                  style={{ flexDirection: 'column', maxWidth: '120px' }}
                />
                <Svg icon="caret" direction="right" width="17px" />
                <Actions
                  allowance={userAllowance?.toString()}
                  stakedBalance={vault?.userData?.stakedBalance?.toString()}
                  stakedTokenSymbol={vault?.stakeToken?.symbol}
                  stakingTokenBalance={vault?.userData?.tokenBalance?.toString()}
                  stakeTokenAddress={vault?.stakeToken?.address[chainId]}
                  stakeTokenValueUsd={vault?.stakeTokenPrice}
                  withdrawFee={vault?.withdrawFee}
                  pid={vault.pid}
                  vaultVersion={vault.version}
                />
                {(vault.version === VaultVersion.V2 || vault.version === VaultVersion.V3) && (
                  <>
                    <Svg icon="caret" direction="right" width="17px" />
                    <HarvestAction
                      pid={vault?.pid}
                      disabled={userEarnings <= 0}
                      userEarnings={userEarnings}
                      earnTokenSymbol={vault?.rewardToken?.symbol}
                    />
                  </>
                )}
              </Flex>
            </Flex>
          </>
        ),
      },
    }
  })
  return <ListView listViews={vaultsListView} />
}

export default React.memo(DisplayVaults)
