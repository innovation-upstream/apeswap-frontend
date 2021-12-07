import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text, Flex, Button } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import { useNetworkChainId } from 'state/hooks'
import { CHAIN_ID } from 'config/constants/chains'
import styles from './homecomponents.module.css'

const WalcomeWrapper = styled.div.attrs({
  className: styles.walcomeWrapper,
})`
  height: 436px;
  width: 100%;
  margin-bottom: 57px;
`

const StyledWelcomeCard = styled(Card).attrs({
  className: styles.styledWelcomeCard,
})`
  text-align: center;
  height: 207px;
  width: 360px;
  overflow: visible;
`

const StyledFlex = styled(Flex)`
  text-align: center;
`

const StyledText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text};
`

const StyledImg = styled.img.attrs({
  className: styles.styledImg,
})`
  margin-top: -75px;
  width: 300px;
  margin-left: 10px;
  height: 100%;
  max-height: 220px;
`

const StyledButton = styled(Button)`
  background: #ffb300;
  height: 44px;
  width: 290px;
  border: 0px;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 10px;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 25px;
  focus: none;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
`

const WelcomeCard = () => {
  const TranslateString = useI18n()
  const chainId = useNetworkChainId()
  return (
    <WalcomeWrapper>
      <StyledFlex flexDirection="column" alignItems="center">
        <StyledWelcomeCard>
          <CardBody>
            {(chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET) && (
              <StyledImg src="/images/ape-home.svg" alt="banana frenzy" />
            )}
            {(chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) && (
              <StyledImg src="/images/ape-home-polygon.svg" alt="banana frenzy" />
            )}
          </CardBody>
        </StyledWelcomeCard>
        <Heading as="h1" size="lg" mb="6px" color="contrast" fontFamily="Titan One">
          {TranslateString(576, 'Welcome all Apes!')}
        </Heading>
        <StyledText color="textSubtle" fontFamily="poppins">
          {TranslateString(578, 'Why be a human, when you can be an ape?')}
        </StyledText>
        <a href="https://apeswap.gitbook.io/apeswap-finance" target="_blank" rel="noopener noreferrer">
          <StyledButton id="Beginner Ape" fullWidth>
            BEGINNER APE? START HERE
          </StyledButton>
        </a>
      </StyledFlex>
    </WalcomeWrapper>
  )
}

export default WelcomeCard
