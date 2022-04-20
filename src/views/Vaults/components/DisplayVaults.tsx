import { IconButton, Text, Flex } from '@ape.swap/uikit'
import BigNumber from 'bignumber.js'
import ListView from 'components/ListView'
import { Tag } from '@apeswapfinance/uikit'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { useLocation } from 'react-router-dom'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIsMobile from 'hooks/useIsMobile'
import React from 'react'
import { Vault } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { NextArrow } from 'views/Farms/components/styles'
// import Actions from './Actions'
// import HarvestAction from './Actions/HarvestAction'
// import InfoContent from '../InfoContent'
import { Container, StyledButton, ActionContainer } from './styles'
import { vaultTokenDisplay } from '../helpers'
import Actions from './Actions'

const DisplayVaults: React.FC<{ vaults: Vault[]; openId?: number }> = ({ vaults, openId }) => {
  const { chainId } = useActiveWeb3React()
  const isMobile = useIsMobile()
  const { pathname } = useLocation()
  const isActive = !pathname.includes('history')

  const vaultsListView = vaults.map((vault) => {
    const totalDollarAmountStaked = parseFloat(vault?.totalStaked) * vault?.stakeTokenPrice
    // const liquidityUrl = !vault?.lpStaking
    //   ? vault.stakingToken.symbol === 'GNANA'
    //     ? 'https://apeswap.finance/gnana'
    //     : `https://apeswap.finance/swap?outputCurrency=${vault?.stakingToken.address[chainId]}`
    //   : `${BASE_ADD_LIQUIDITY_URL}/${vault?.lpTokens?.token?.address[chainId]}/${vault?.lpTokens?.quoteToken?.address[chainId]}`
    const userAllowance = vault?.userData?.allowance
    // const userEarnings = getBalanceNumber(vault?.userData?.pendingReward || new BigNumber(0))
    // const userEarningsUsd = `$${(
    //   getBalanceNumber(vault?.userData?.pendingReward || new BigNumber(0)) * vault.rewardToken?.price
    // ).toFixed(2)}`
    const userTokenBalance = `${vault?.userData?.stakedBalance || '0'}`
    const userTokenBalanceUsd = `$${(
      parseFloat(vault?.userData?.stakedBalance || '0') * vault?.stakeTokenPrice
    ).toFixed(2)}`

    const { tokenDisplay, stakeLp, earnLp } = vaultTokenDisplay(vault.stakeToken, vault.rewardToken)

    console.log(vault)
    // Token symbol logic is here temporarily for nfty
    return {
      tokens: tokenDisplay,
      stakeLp,
      earnLp,
      title: (
        <Text ml={10} weight="bold">
          {vault.stakeToken.symbol}
        </Text>
      ),
      id: vault.id,
      infoContent: <></>, // <InfoContent vault={vault} />,
      infoContentPosition: 'translate(-82%, 28%)',
      open: openId === vault.pid,
      cardContent: (
        <>
          <Flex sx={{ width: '90px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* {!isMobile && (
              <>
                <a href={vault.projectLink} target="_blank" rel="noreferrer">
                  <IconButton icon="website" color="primaryBright" width={20} style={{ padding: '8.5px 10px' }} />
                </a>
                <a href={vault?.twitter} target="_blank" rel="noreferrer">
                  <IconButton icon="twitter" color="primaryBright" width={20} />
                </a>
              </>
            )} */}
            <></>
          </Flex>
          <ListViewContent
            title="Daily APY"
            value={`${isActive ? vault?.apy?.daily?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 120}
            toolTip="APR is calculated based on current value of of the token, reward rate and vault % owned."
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 60%)"
          />
          <ListViewContent
            title="Yearly APY"
            value={`${isActive ? vault?.apy?.yearly?.toFixed(2) : '0.00'}%`}
            width={isMobile ? 95 : 120}
            toolTip="APR is calculated based on current value of of the token, reward rate and vault % owned."
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0, 60%)"
          />
          <ListViewContent
            title="Total Staked"
            value={`$${totalDollarAmountStaked.toLocaleString(undefined)}`}
            width={isMobile ? 160 : 160}
            toolTip="The total value of the tokens currently staked in this vault."
            toolTipPlacement="bottomLeft"
            toolTipTransform="translate(0%, 75%)"
          />
          <ListViewContent title="Earned" value="0.00" width={isMobile ? 80 : 90} />
        </>
      ),
      expandedContent: (
        <>
          <ActionContainer>
            {/* {isMobile && (
              <ListViewContent
                title={`Available ${vault?.stakingToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )}
            <a href={liquidityUrl} target="_blank" rel="noopener noreferrer">
              <StyledButton sx={{ width: '150px' }}>GET {vault?.stakingToken?.symbol}</StyledButton>
            </a>
            {!isMobile && (
              <ListViewContent
                title={`Available ${vault?.stakingToken?.symbol}`}
                value={userTokenBalance}
                value2={userTokenBalanceUsd}
                value2Secondary
                width={190}
                height={50}
                lineHeight={15}
                ml={10}
              />
            )} */}
            <></>
          </ActionContainer>
          <Flex sx={{ width: `${isMobile ? '100%' : '450px'}`, justifyContent: 'space-between' }}>
            {!isMobile && <NextArrow />}
            <Actions
              allowance={userAllowance?.toString()}
              stakedBalance={vault?.userData?.stakedBalance?.toString()}
              stakedTokenSymbol={vault?.stakeToken?.symbol}
              stakingTokenBalance={vault?.userData?.stakedBalance?.toString()}
              stakeTokenAddress={vault?.stakeToken?.address[chainId]}
              stakeTokenValueUsd={vault?.stakeTokenPrice}
              strategyAddress={vault?.stratAddress[chainId]}
            />
            <></>
            {!isMobile && <NextArrow />}
          </Flex>
          {/* <HarvestAction
            sousId={vault?.sousId}
            disabled={userEarnings <= 0}
            userEarnings={userEarnings}
            earnTokenSymbol={vault?.rewardToken?.symbol || vault?.tokenName}
          /> */}
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
