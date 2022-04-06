/** @jsxImportSource theme-ui */
import React from 'react'
import { ApeSwapRoundIcon, Flex, Text } from '@apeswapfinance/uikit'
import { BuyBanana, ContentContainer, HeadingText, LearnMore } from './styles'

const WelcomeContent: React.FC = () => {
  return (
    <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
      <ContentContainer>
        <Flex flexDirection="column" style={{ maxWidth: '650px' }}>
          <HeadingText>Welcome to the Most Connected DeFi Hub</HeadingText>

          <div sx={{ display: ['none', 'block', 'block'] }}>
            <br />
            <br />
            <Text>
              Whether you are new to crypto or you are a DeFi veteran, ApeSwap has the tools and the community to
              support your decentralized finance needs.
            </Text>
          </div>

          <br />
          <br />
          <Flex>
            <div
              sx={{
                display: 'flex',
                justifyContent: ['center', 'space-between', 'space-between'],
                alignItems: 'center',
                flexDirection: ['column', 'row', 'row'],
                width: ['100%', '435px', '435px'],
              }}
            >
              <a href="/swap" rel="noopener noreferrer" style={{ width: '90%' }}>
                <BuyBanana fullWidth sx={{ width: ['100%', '204px', '204px'] }}>
                  Buy Banana
                  <ApeSwapRoundIcon ml="10px" width="27px" height="27px" />
                </BuyBanana>
              </a>
              <a
                href="https://apeswap.gitbook.io/apeswap-finance/welcome/master"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ width: ['90%', null, null] }}
              >
                <LearnMore>Learn More</LearnMore>
              </a>
            </div>
          </Flex>
        </Flex>

        {/*
         Will be added later
         {!isMobile && (
          <Flex alignItems="center" justifyContent="center" paddingBottom="100px">
            <Spinner size={400} />
          </Flex>
        )} */}
      </ContentContainer>
    </Flex>
  )
}

export default React.memo(WelcomeContent)
