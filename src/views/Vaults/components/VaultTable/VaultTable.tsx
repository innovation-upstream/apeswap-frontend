/** @jsxImportSource theme-ui */
import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ThemeUIStyleObject } from 'theme-ui'
import Tooltip from 'components/Tooltip/Tooltip'
import { Flex, Heading, Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { useNetworkChainId } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import UnlockButton from 'components/UnlockButton'
import { Vault } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import VaultHeading from './VaultHeading'
import CellLayout from './CellLayout'
import Details from './Details'
import Apr from './Apr'
import ActionPanel from './ActionPanel'
import Staked from './Liquidity'
import ApprovalAction from './CardActions/ApprovalAction'
import StakeAction from './CardActions/StakeActions'

export interface VaultWithStakedValue extends Vault {
  apr?: BigNumber
  staked?: BigNumber
  addStakedUrl?: string
  stakedTokenPrice?: number
  rewardTokenPrice?: number
}
interface HarvestProps {
  vault: VaultWithStakedValue
  removed: boolean
}

const StyledTr = styled.tr<{ actionPanelToggled: boolean }>`
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.navbar};
  white-space: nowrap;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: ${({ actionPanelToggled }) => (actionPanelToggled ? 0 : '20px')};
  border-bottom-right-radius: ${({ actionPanelToggled }) => (actionPanelToggled ? 0 : '20px')};

  td:first-of-type {
    border-top-left-radius: 20px;
    border-bottom-left-radius: ${({ actionPanelToggled }) => (actionPanelToggled ? 0 : '20px')};
  }
  td:last-of-type {
    border-top-right-radius: 20px;
    border-bottom-right-radius: ${({ actionPanelToggled }) => (actionPanelToggled ? 0 : '20px')};
  }
`

const DailyAPYContainer = styled.div`
  left: 340px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 401px;
  }
`

const YearlyAPYContainer = styled.div`
  left: 480px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 575px;
  }
`

const CellInner = styled.div`
  padding: 0px 0px;
  display: flex;
  width: auto;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 0px;
  }
`
const StyledHeadingGreen = styled(Heading)`
  font-size: 14px;
  color: #38a611;
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    color: #38a611;
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 12px;
`

const ArrowContainer = styled(Flex)`
  right: 23px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  position: relative;
`

const TotalStakedContainer = styled.div`
  left: 660px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 751px;
  }
`

const UserStakedContainer = styled.div`
  left: 830px;
  top: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 933px;
  }
`

const StakeContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const StyledUnlockButton = styled(UnlockButton)`
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  display: inline-block;
`

const TitleContainer = styled.div`
  display: flex;
`

const cellStyle: ThemeUIStyleObject = {
  verticalAlign: 'middle',
  paddingLeft: '30px',
}

const VaultTable: React.FC<HarvestProps> = ({ vault, removed }) => {
  const { pid, stakeTokenAddress, token0, token1, userData, isPair, apy, totalStaked } = vault
  const { t } = useTranslation()

  const { account } = useWeb3React()
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const chainId = useNetworkChainId()

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.tokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const needsApproval = !allowance.gt(0)
  const isLoading = !userData
  const lpLabel = vault.isPair ? `${vault.token0.symbol}-${vault.token1.symbol}` : vault.token0.symbol
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const cardHeaderButton = () => {
    if (!account) {
      return <StyledUnlockButton size="sm" sx={{ display: 'inline-block' }} showTooltip />
    }
    if (needsApproval) {
      return <ApprovalAction stakingContractAddress={stakeTokenAddress} pid={pid} isLoading={isLoading} />
    }
    if (isApproved && !accountHasStakedBalance) {
      return (
        <StakeAction
          vault={vault}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
          isApproved={isApproved}
          isHeader
        />
      )
    }
    return <></>
  }

  return (
    <>
      <StyledTr onClick={toggleActionPanel} actionPanelToggled={actionPanelToggled}>
        <td>
          <CellLayout>
            <VaultHeading
              token0={token0.symbol}
              token1={token1.symbol}
              isPair={isPair}
              image={vault?.image}
              isBurning={vault?.burning}
            />
          </CellLayout>
        </td>
        <td sx={cellStyle}>
          <TitleContainer>
            <Text fontSize="20px" fontWeight={800}>
              {isPair ? `${token1.symbol}-${token0.symbol}` : token0.symbol}{' '}
            </Text>
            {vault?.burning && (
              <Tooltip content={t('Burns at least 50% of every harvest in the form of $BANANA')}>🔥</Tooltip>
            )}
          </TitleContainer>
        </td>
        <td sx={cellStyle}>
          <DailyAPYContainer>
            <Apr poolApr={removed ? '0' : apy?.daily?.toFixed(2)} apr={new BigNumber(apy?.daily)} />
          </DailyAPYContainer>
        </td>
        <td sx={cellStyle}>
          <YearlyAPYContainer>
            <Apr poolApr={removed ? '0' : apy?.yearly?.toFixed(2)} apr={new BigNumber(apy?.yearly)} />
          </YearlyAPYContainer>
        </td>
        <td sx={cellStyle}>
          <TotalStakedContainer>
            <Staked staked={parseInt(totalStaked)} />
          </TotalStakedContainer>
        </td>
        {rawStakedBalance ? (
          <UserStakedContainer>
            <StyledText>Staked</StyledText>
            <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
              {displayBalance}
            </StyledHeadingGreen>
          </UserStakedContainer>
        ) : (
          <></>
        )}
        <td sx={cellStyle}>
          <ArrowContainer justifyContent="center" alignItems="center" marginRight={20}>
            {cardHeaderButton()}
            <CellInner>
              <CellLayout>
                <Details actionPanelToggled={actionPanelToggled} />
              </CellLayout>
            </CellInner>
          </ArrowContainer>
        </td>
      </StyledTr>
      <tr>
        <td colSpan={6}>
          {actionPanelToggled && (
            <>
              <StakeContainer>
                <StakeAction
                  vault={vault}
                  stakingTokenBalance={stakingTokenBalance}
                  stakedBalance={stakedBalance}
                  isStaked={accountHasStakedBalance}
                  firstStake={!accountHasStakedBalance}
                  isApproved={isApproved}
                />
              </StakeContainer>
              <ActionPanel
                totalStaked={getBalanceNumber(new BigNumber(vault?.strategyPairBalance))}
                personalValueStaked={getBalanceNumber(stakedBalance)}
                lpLabel={lpLabel}
                addLiquidityUrl="https://apeswap.finance/swap"
                blockExplorer={`${BLOCK_EXPLORER[chainId]}/address/${vault?.strat}`}
                stakedTokenPrice={vault?.stakeTokenPrice}
                withdrawFee={vault?.withdrawFee}
                depositFee={vault?.depositFee}
              />
            </>
          )}
        </td>
      </tr>
    </>
  )
}

export default VaultTable
