/** @jsxImportSource theme-ui */
import { Flex, Text } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIsMobile from 'hooks/useIsMobile'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Vault } from 'state/types'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { Container } from './styles'
import { vaultTokenDisplay } from '../helpers'
import Stake from './MigrateActionsButtons/Stake'
import Approve from './MigrateActionsButtons/Approve'

const DisplayVaults: React.FC<{ vaults: Vault[]; openId?: number }> = ({ vaults, openId }) => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')
  const { t } = useTranslation()

  const vaultsListView = vaults.map((vault) => {
    const totalDollarAmountStaked = Math.round(parseFloat(vault?.totalStaked) * vault?.stakeTokenPrice * 100) / 100
    const rawTokenBalance = getFullDisplayBalance(new BigNumber(vault.userData.tokenBalance))

    const { tokenDisplay, stakeLp, earnLp } = vaultTokenDisplay(vault.stakeToken, vault.rewardToken)

    return {
      tokens: tokenDisplay,
      alignServiceTokens: true,
      stakeLp,
      earnLp,
      title: <Text style={{ fontSize: isMobile ? '14px' : '16px' }}>{vault.stakeToken.symbol}</Text>,
      titleContainerWidth: 400,
      id: vault.id,
      cardContent: (
        <>
          <ListViewContent
            title={t('Daily APY')}
            value={`${isActive ? vault?.apy?.daily?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 90 : 140}
            toolTip={t(
              'Daily APY includes BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
            )}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(25%, 0%)"
            height={50}
          />
          <ListViewContent
            title={t('Yearly APY')}
            value={`${isActive ? vault?.apy?.yearly?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 155}
            toolTip={t(
              'Annual APY includes annualized BANANA rewards (calculated based on token value, reward rate, and percentage of vault owned) and DEX swap fees, compounded daily.',
            )}
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(28%, 0%)"
            height={50}
          />
          <ListViewContent
            title={t('Total Staked')}
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 100 : 170}
            toolTip={t('The total value of the tokens currently staked in this vault.')}
            toolTipPlacement="bottomRight"
            toolTipTransform="translate(13%, 0%)"
            height={50}
          />
          <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center', width: '200px' }}>
            {new BigNumber(vault?.userData.allowance).gt(0) ? (
              <Stake pid={vault.pid} rawTokenBalance={rawTokenBalance} />
            ) : (
              <Approve pid={vault.pid} lpAddress={vault.stakeToken.address[chainId]} />
            )}
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
