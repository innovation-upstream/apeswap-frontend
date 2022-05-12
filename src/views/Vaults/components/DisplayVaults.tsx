import { IconButton, Text, Flex } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { Tag, useModal } from '@apeswapfinance/uikit'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIsMobile from 'hooks/useIsMobile'
import { useAppDispatch } from 'state'
import { Field, selectCurrency } from 'state/swap/actions'
import React from 'react'
import { Vault } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
import { LiquidityModal } from 'components/LiquidityWidget'
// import Actions from './Actions'
// import HarvestAction from './Actions/HarvestAction'
// import InfoContent from '../InfoContent'
import { Container, StyledButton, ActionContainer } from './styles'
import { vaultTokenDisplay } from '../helpers'
import Actions from './Actions'
import HarvestAction from './Actions/HarvestAction'

const DisplayVaults: React.FC<{ vaults: Vault[]; openId?: number }> = ({ vaults, openId }) => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')

  // TODO: clean up this code
  // Hack to get the close modal function from the provider
  // Need to export ModalContext from uikit to clean up the code
  const [, closeModal] = useModal(<></>)
  const [onPresentAddLiquidityWidgetModal] = useModal(
    <LiquidityModal handleClose={closeModal} />,
    true,
    true,
    'liquidityWidgetModal',
  )

  const showLiquidity = (token, quoteToken) => {
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
    onPresentAddLiquidityWidgetModal()
  }

  const vaultsListView = vaults.map((vault) => {
    const totalDollarAmountStaked = parseFloat(vault?.totalStaked) * vault?.stakeTokenPrice
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

    // Token symbol logic is here temporarily for nfty
    return {
      tokens: tokenDisplay,
      stakeLp,
      earnLp,
      tag: {
        text: vault.type,
        backgroundColor: vault.type === 'AUTO' ? 'green' : 'red',
      },
      title: (
        <Text ml={isMobile ? 5 : 10} weight="bold" style={{ fontSize: isMobile ? '14px' : '16px' }}>
          {vault.stakeToken.symbol}
        </Text>
      ),
      titleContainerWidth: 350,
      id: vault.id,
      infoContent: <></>, // <InfoContent vault={vault} />,
      infoContentPosition: 'translate(-82%, 28%)',
      expandedContentJustified: vault.version === 'V1' && 'center',
      open: openId === vault.pid,
      cardContent: (
        <>
          <ListViewContent
            title="Daily APY"
            value={`${isActive ? vault?.apy?.daily?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 90 : 140}
            toolTip="APR is calculated based on current value of of the token, reward rate and vault % owned."
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 60%)"
            height={50}
          />
          <ListViewContent
            title="Yearly APY"
            value={`${isActive ? vault?.apy?.yearly?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 155}
            toolTip="APR is calculated based on current value of of the token, reward rate and vault % owned."
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 60%)"
            height={50}
          />
          <ListViewContent
            title="Total Staked"
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 200 : 170}
            toolTip="The total value of the tokens currently staked in this vault."
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0%, 75%)"
            height={50}
          />
          <ListViewContent
            title={vault.version === 'V1' ? 'Staked' : 'Earned'}
            value={vault.version === 'V1' ? userStakedBalanceUsd : userEarningsUsd}
            width={isMobile ? 50 : 115}
            height={50}
          />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            {isMobile && (
              <ListViewContent
                title={`Available ${vault.stakeToken.lpToken ? 'LP' : vault?.stakeToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
            {vault.stakeToken?.lpToken ? (
              <StyledButton
                sx={{ width: '150px' }}
                onClick={() =>
                  showLiquidity(
                    vault.token.address[chainId],
                    vault.quoteToken.symbol === 'BNB' ? 'ETH' : vault.quoteToken.address[chainId],
                  )
                }
              >
                GET LP
              </StyledButton>
            ) : (
              <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
                <StyledButton sx={{ width: '150px' }}>GET {vault?.stakeToken?.symbol}</StyledButton>
              </a>
            )}
            {!isMobile && (
              <ListViewContent
                title={`Available ${vault.stakeToken.lpToken ? 'LP' : vault?.stakeToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
          </ActionContainer>
          {vault.version === 'V1' ? !isMobile && <NextArrow ml="30px" mr="50px" /> : !isMobile && <NextArrow />}
          <Actions
            allowance={userAllowance?.toString()}
            stakedBalance={vault?.userData?.stakedBalance?.toString()}
            stakedTokenSymbol={vault?.stakeToken?.symbol}
            stakingTokenBalance={vault?.userData?.tokenBalance?.toString()}
            stakeTokenAddress={vault?.stakeToken?.address[chainId]}
            stakeTokenValueUsd={vault?.stakeTokenPrice}
            strategyAddress={vault?.stratAddress[chainId]}
            pid={vault.pid}
            vaultVersion={vault.version}
          />
          {vault.version === 'V2' && !isMobile && <NextArrow />}
          {vault.version === 'V2' && (
            <HarvestAction
              pid={vault?.pid}
              disabled={userEarnings <= 0}
              userEarnings={userEarnings}
              earnTokenSymbol={vault?.rewardToken?.symbol}
            />
          )}
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
