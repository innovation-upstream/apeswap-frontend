/** @jsxImportSource theme-ui */
import { Button, Flex, Svg, Text, useModal } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { Link, useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Box } from 'theme-ui'
import useIsMobile from 'hooks/useIsMobile'
import { useAppDispatch } from 'state'
import { Field, selectCurrency } from 'state/swap/actions'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Vault } from 'state/types'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
import { Container, StyledButton, ActionContainer, StyledTag } from './styles'
import { vaultTokenDisplay } from '../helpers'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'
import InfoContent from './InfoContent'
import DualLiquidityModal from 'components/DualAddLiquidity/DualLiquidityModal'
import { selectOutputCurrency } from '../../../state/zap/actions'
import Unstake from './MigrateActionsButtons/Unstake'
import { useVaultsV3 } from 'state/vaultsV3/hooks'
import { CURRENT_MIGRATE_PATH } from 'components/Menu/chains/bscConfig'

const DisplayVaults: React.FC<{ vaults: Vault[]; openId?: number }> = ({ vaults, openId }) => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')
  const { t } = useTranslation()
  const { vaults: vaultsV3 } = useVaultsV3()

  const [onPresentAddLiquidityWidgetModal] = useModal(<DualLiquidityModal />, true, true, 'dualLiquidityModal')

  const vaultsListView = vaults.map((vault) => {
    const totalDollarAmountStaked = Math.round(parseFloat(vault?.totalStaked) * vault?.stakeTokenPrice * 100) / 100
    const liquidityUrl = `https://apeswap.finance/swap/`
    const userAllowance = vault?.userData?.allowance
    const userEarnings = getBalanceNumber(new BigNumber(vault?.userData?.pendingRewards) || new BigNumber(0))
    const rawStakedBalance = getFullDisplayBalance(new BigNumber(vault.userData.stakedBalance))
    const userEarningsUsd = `$${(
      (getBalanceNumber(new BigNumber(vault?.userData?.pendingRewards)) || 0) * vault.rewardTokenPrice
    ).toFixed(2)}`
    const userTokenBalance = (getBalanceNumber(new BigNumber(vault?.userData?.tokenBalance)) || 0).toFixed(4)
    const userTokenBalanceUsd = `$${(parseFloat(userTokenBalance || '0') * vault?.stakeTokenPrice).toFixed(2)}`
    const userStakedBalance = getBalanceNumber(new BigNumber(vault?.userData?.stakedBalance))
    const userStakedBalanceUsd = `$${((userStakedBalance || 0) * vault?.stakeTokenPrice).toFixed(2)}`

    const { tokenDisplay, stakeLp, earnLp } = vaultTokenDisplay(vault.stakeToken, vault.rewardToken)

    const vaultV3Pid = vaultsV3.find(
      (vaultV3) =>
        vault.stakeToken.address[chainId].toLowerCase() === vaultV3.stakeToken.address[chainId].toLowerCase(),
    )?.pid

    return {
      tokens: tokenDisplay,
      alignServiceTokens: true,
      stakeLp,
      earnLp,
      title: <Text style={{ fontSize: isMobile ? '14px' : '16px' }}>{vault.stakeToken.symbol}</Text>,
      titleContainerWidth: 400,
      id: vault.id,
      ttWidth: '250px',
      toolTipIconWidth: isMobile && '20px',
      toolTipStyle: isMobile && { marginTop: '10px', marginRight: '10px' },
      expandedContentJustified: vault.version === 'V1' && 'center',
      open: openId === vault.id,
      cardContent: (
        <>
          <ListViewContent
            title={t('Daily APY')}
            value={`${isActive ? vault?.apy?.daily?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 90 : 100}
            toolTip={t(
              'Daily APY includes BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
            )}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(25%, 0%)"
          />
          <ListViewContent
            title={t('Total Staked')}
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 100 : 100}
            toolTip={t('The total value of the tokens currently staked in this vault.')}
            toolTipPlacement="bottomRight"
            toolTipTransform="translate(13%, 0%)"
          />
          {/* <ListViewContent
            title={vault.version === 'V1' ? t('Staked') : t('Earned')}
            value={vault.version === 'V1' ? userStakedBalanceUsd : userEarningsUsd}
            width={isMobile ? 50 : 100}
            height={50}
          /> */}
          <ListViewContent
            title={t('Staked LP')}
            value={rawStakedBalance.slice(0, 8)}
            value2={userStakedBalanceUsd}
            value2Secondary
            width={isMobile ? 100 : 100}
            lineHeight={15}
            ml={10}
          />
          <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            {/* <Button as={Link} to={CURRENT_MIGRATE_PATH} fullWidth>
              Migrate
            </Button> */}
            <Unstake pid={vault.pid} vaultVersion={vault.version} vaultV3Pid={vaultV3Pid} />
          </Flex>
        </>
      ),
    } as ExtendedListViewProps
  })
  return (
    <Container>
      <ListView listViews={vaultsListView} />
    </Container>
  )
}

export default React.memo(DisplayVaults)
