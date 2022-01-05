import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Flex, Heading, Skeleton, Text, Image, useMatchBreakpoints } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarmUser } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import HarvestAction from './HarvestAction'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'
import ExpandableSectionButton from './ExpandableSectionButton'
import styles from './farmcard.module.css'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  token0?: string
  token1?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  farmAPR: string
  removed: boolean
  pid?: number
  lpSymbol: string
  image?: string
  showExpandableSection?: boolean
}

const StyledBackground = styled.div.attrs({
  className: styles.labelWrapper,
})`
  width: 120px;
  height: 93px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
`

const StyledHeading = styled(Heading).attrs({
  className: styles.styledHeading,
})`
  font-size: 12px;
`

const StyledText1 = styled(Text).attrs({
  className: styles.styledText1,
})`
  font-weight: 700;
  font-size: 12px;
`

const StyledText2 = styled(Text)`
  font-weight: 700;
  font-size: 12px;
  margin-top: 1px;
`

const StyledText3 = styled(Text).attrs({
  className: styles.styledText3,
})`
  font-size: 12px;
  color: #38a611;
  font-family: 'Titan One', sans-serif;
`

const StyledText4 = styled(Text).attrs({
  className: styles.styledText4,
})`
  font-size: 12px;
  font-weight: 700;
  margin-top: 1px;
  display: none;
`

const StyledFlexContainer = styled(Flex).attrs({
  className: styles.styledFlexContainer,
})`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 6px;
  margin-right: 8px;
  align-items: center;
  flex: 1;
`

const StyledFlexEarned = styled(Flex).attrs({
  className: styles.styledFlexEarned,
})`
  display: none;
`

const StyledFlexEarnedSmall = styled(Flex).attrs({
  className: styles.styledFlexEarnedSmall,
})`
  margin-right: 10px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`

const LabelContainer = styled.div.attrs({
  className: styles.labelContainer,
})`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  width: 110px;
  margin-right: 5px;
`

const LabelContainer2 = styled.div.attrs({
  className: styles.labelContainer2,
})`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;
`

const FlexSwitch = styled.div.attrs({
  className: styles.flexSwitch,
})`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
`

const StyledAPRText = styled.div.attrs({
  className: styles.styledAPRText,
})`
  font-size: 12px;
  line-height: 11px;
  letter-spacing: 1px;
  margin-left: 5px;
  margin-bottom: 2px;
  font-family: 'Titan One', sans-serif;
`

const ButtonContainer = styled.div.attrs({
  className: styles.buttonContainer,
})`
  width: 100px;
  display: flex;
  justify-content: flex-end;
`

const IconImage = styled(Image).attrs({
  className: styles.iconImage,
})`
  align: center;
  width: 40px;
  height: 40px;
`

const IconQuoteToken = styled(Image).attrs({
  className: styles.iconQuoteToken,
})`
  align: center;
  width: 20px;
  height: 20px;
`

const IconArrow = styled(Image).attrs({
  className: styles.iconArrow,
})`
  align: center;
  width: 5px;
  height: 5px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  apr,
  token0,
  token1,
  image,
  addLiquidityUrl,
  bananaPrice,
  farmAPR,
  removed,
  pid,
  lpSymbol,
  showExpandableSection,
}) => {
  const TranslateString = useI18n()

  const { earnings } = useFarmUser(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance ? rawEarningsBalance.toLocaleString() : '?'
  const { isXl: isDesktop } = useMatchBreakpoints()
  const { account } = useWeb3React()

  return (
    <Container>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${image || `${token1}.svg`}`}
          alt={token1}
          width={60}
          height={60}
          marginLeft="7.5px"
        />
        <IconQuoteToken
          src={`/images/tokens/${token0}.svg`}
          alt={token0}
          width={35}
          height={35}
          marginLeft={isDesktop ? '-20px' : '-13px'}
          marginTop={isDesktop ? '45px' : '30px'}
        />
        <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} marginRight="8px" marginLeft="8px" />
        <IconImage src="/images/tokens/banana.svg" alt="banana" width={60} height={60} marginRight="7.5px" />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading fontFamily="Titan One">{lpLabel}</StyledHeading>
          {!removed && (
            <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1>APR:</StyledText1>
              {apr ? (
                <FlexSwitch>
                  <ApyButton
                    lpLabel={lpLabel}
                    rewardTokenName="BANANA"
                    addLiquidityUrl={addLiquidityUrl}
                    rewardTokenPrice={bananaPrice}
                    apy={apr}
                  />
                  <StyledAPRText>{farmAPR}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          )}
          <StyledFlexEarnedSmall>
            <StyledText4 color="primary" pr="3px">
              {TranslateString(999, 'Banana ')}
            </StyledText4>
            <StyledText2 color="primary" pr="3px">
              {TranslateString(999, 'Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>
        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText4 color="primary" pr="3px">
                {TranslateString(999, 'Banana ')}
              </StyledText4>
              <StyledText2 color="primary" pr="3px">
                {TranslateString(999, 'Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {!account ? (
              <UnlockButton padding="8px" />
            ) : (
              <HarvestAction earnings={earnings} pid={pid} lpSymbol={lpSymbol} addLiquidityUrl={addLiquidityUrl} />
            )}
            <ExpandableSectionButton expanded={showExpandableSection} />
          </ButtonContainer>
        </LabelContainer2>
      </StyledFlexContainer>
    </Container>
  )
}

export default CardHeading
