import React from 'react'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import getTimePeriods from 'utils/getTimePeriods'
import { BSC_BLOCK_TIME } from 'config'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
  multiplier?: string
  totalStaked?: number
  personalValueStaked?: number
  pid?: number
  blocksRemaining?: number
  isFinished?: boolean
  blocksUntilStart?: number
  stakedTokenPrice?: number
  rewardTokenPrice?: number
  pendingReward?: BigNumber
  projectLink?: string
  tokenDecimals?: number
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 340px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 401px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: bold;
  font-family: 'Poppins';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const StyledTextGreen = styled(Text)`
  font-weight: bold;
  color: #38a611;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const InfoContainer = styled.div`
  width: 285px;
`

const ActionPanel: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  lpLabel,
  addLiquidityUrl,
  personalValueStaked,
  totalStaked,
  stakedTokenPrice,
}) => {
  const TranslateString = useI18n()

  const totalStakedFormated = totalStaked
    ? `${Number(totalStaked).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : '-'

  const totalUserStaked = personalValueStaked > 0 ? (personalValueStaked * stakedTokenPrice).toFixed(2) : 0

  return (
    <Wrapper>
      <Flex>
        <InfoContainer>
          <Flex justifyContent="space-between">
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(316, 'Total Staked')}:
            </StyledText>
            <StyledText fontFamily="poppins" fontSize="12px">
              {totalStakedFormated}
            </StyledText>
          </Flex>
          <Flex justifyContent="space-between">
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(316, 'Stake')}:
            </StyledText>
            <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
          </Flex>
          <Flex justifyContent="space-between">
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(23, 'Staked Value')}:
            </StyledText>
            <StyledTextGreen fontFamily="poppins" fontSize="12px">
              ${totalUserStaked}
            </StyledTextGreen>
          </Flex>
          <Flex justifyContent="center">
            <StyledLink external href={bscScanAddress} bold={false}>
              {TranslateString(356, 'View on BscScan')}
            </StyledLink>
          </Flex>
        </InfoContainer>
      </Flex>
    </Wrapper>
  )
}

export default ActionPanel