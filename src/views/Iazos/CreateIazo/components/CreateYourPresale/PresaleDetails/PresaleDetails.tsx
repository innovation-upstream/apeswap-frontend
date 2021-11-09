import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints, Checkbox } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import TokenInput from './TokenInput'
import { ExtendedERC20Details } from '../PairCreation/PairCreation'

interface TokenSaleDetails {
  tokensForSale: string
  pricePerToken: string
  busdLimitPerUser: string
  softcap: string
  hardcap: string
  burnRemains: boolean
}

interface PresaleDataProps {
  pairTokenDetails: ExtendedERC20Details
  onChange?: void
}

const LaunchPadInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 524px;
  width: 686px;
  border-radius: 10px;
  background: #414141;
  margin-bottom: 30px;
  align-items: space-between;
  justify-content: center;
  padding: 10px;
`
const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 22px;
  line-height: 27px;
  margin-top: 15px;
`

const CheckboxContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`

const FooterContainer = styled.div`
  display: flex;
  width: 450px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  margin-left: 15px;
`

const StyledSubText = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  line-height: 24px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: flex-start;
  height 80px;
  width: 300px;
  margin-left: 35px;
`

const DateButtonContainer = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`

const DateSelectionContainer = styled.div`
  position: relative;
  display: flex;
  height: 135px;
  background: #414141;
  width: 686px;
  border-radius: 10px;
  margin-top: 15px;
  align-items: center;
  margin-bottom: 20px;
  z-index: 0;
`

const PresaleDetails: React.FC<PresaleDataProps> = ({ pairTokenDetails }) => {
  const { tokenSymbol, quoteToken, userBalance, tokenDecimals } = pairTokenDetails
  const [tokenDetails, setTokenDetails] = useState<TokenSaleDetails>()
  const balance = getBalanceNumber(new BigNumber(userBalance), tokenDecimals)

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>How many {tokenSymbol} are up for presale?</StyledHeader>
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, tokensForSale: e.currentTarget.value })}
          size="xl"
          tokenSymbol={tokenSymbol}
          userBalance={balance}
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, pricePerToken: e.currentTarget.value })}
          title="Price of the token"
          mr="12.5px"
          quoteTokenSymbol={quoteToken}
          size="md"
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, busdLimitPerUser: e.currentTarget.value })}
          title={`${quoteToken} limit per user`}
          quoteTokenSymbol={quoteToken}
          ml="12.5px"
          size="md"
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, softcap: e.currentTarget.value })}
          title="Softcap"
          quoteTokenSymbol={quoteToken}
          mr="12.5px"
          size="md"
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          defaultVal="10"
          title="Hardcap"
          ml="12.5px"
          size="md"
          disabled
          quoteTokenSymbol={quoteToken}
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <FooterContainer>
          <CheckboxContainer>
            <Checkbox
              checked={tokenDetails?.burnRemains}
              onChange={() => setTokenDetails({ ...tokenDetails, burnRemains: !tokenDetails?.burnRemains })}
            />
          </CheckboxContainer>
          <StyledText>
            If softcap is met, but hardcap is not, burn the remaining tokens allocated to the token sale.
          </StyledText>
        </FooterContainer>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default PresaleDetails