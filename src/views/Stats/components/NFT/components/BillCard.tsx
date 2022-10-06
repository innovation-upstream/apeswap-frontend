import React from 'react'
import { BinanceIcon } from '@ape.swap/uikit'
import { Image, Flex, Text, POLYGON } from '@apeswapfinance/uikit'

import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import CardValue from '../../CardValue'
import { Chain } from 'state/statsPage/types'
import { BillImageContainer, ChainIndicator, StyledCard, StyledText } from '../styles'

interface BillProps {
  chain: Chain
  imageUrl: string
  name: string
  type: 'Banana' | 'Jungle'
  tokens: { token1: string; token2: string; token3: string }
  value: number
  timeRemaining: string
}

const renderChain = (chain: Chain) => {
  switch (chain) {
    case 56:
      return <BinanceIcon width={20} />

    case 137:
      return <POLYGON width={20} />
  }
}

export const BillCard: React.FC<BillProps> = ({ chain, imageUrl, name, type, tokens, value, timeRemaining }) => {
  return (
    <StyledCard>
      <Flex flexDirection="column" alignItems="center" style={{ height: '100%' }}>
        <BillImageContainer>
          <ChainIndicator>{renderChain(chain)}</ChainIndicator>
        </BillImageContainer>
        <div style={{ padding: '20px', width: '100%' }}>
          <Flex alignItems="center" justifyContent="flex-start" style={{ gap: '14px', width: '100%' }}>
            <ServiceTokenDisplay
              token1={tokens.token1}
              token2={tokens.token2}
              token3={tokens.token3}
              billArrow
              stakeLp
              size={26}
              tokensMargin={-6}
            />
            <div>
              <StyledText marginTop="0 !important">{type.toUpperCase()} Bill</StyledText>
              <Text fontWeight={700}>{name}</Text>
            </div>
          </Flex>
          <div style={{ marginTop: '24px' }}>
            <StyledText>Value</StyledText>
            <CardValue fontSize="16px" fontWeight={700} value={value} suffix={tokens.token3} />
            <Text fontSize="12px" fontWeight={500}>
              {timeRemaining}
            </Text>
          </div>
        </div>
      </Flex>
    </StyledCard>
  )
}
