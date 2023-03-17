/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Flex, Text } from '@ape.swap/uikit'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import Tlos from './grayChains/Tlos'
import Arbitrum from './grayChains/Arbitrum'

const DefiRedefined = () => {
  return (
    <Flex sx={{ width: '36%', minWidth: '320px', flexDirection: 'column', zIndex: 6 }}>
      <Text
        sx={{
          fontSize: '64px',
          lineHeight: '80px',
          background: 'var(--theme-ui-colors-home-title)',
          webkitBackgroundClip: 'text',
          webkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
        }}
      >
        DeFi, Redefined
      </Text>
      <Text sx={{ marginTop: '25px', fontWeight: 500, lineHeight: '25px', fontSize: '18px' }}>
        Join our growing network of 25 communities that are building project-owned liquidity through Treasury Bills.
      </Text>
      <Flex sx={{ alignItems: 'center', marginTop: '30px' }}>
        <Text
          sx={{
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '18px',
            textTransform: 'uppercase',
            marginRight: '10px',
          }}
        >
          BILLS AVAILABLE ON
        </Text>
        <Bnb sx={{ marginRight: '10px' }} />
        <Poly sx={{ marginRight: '10px' }} />
        <Tlos sx={{ marginRight: '10px' }} />
        <Arbitrum />
      </Flex>
      <Flex sx={{ width: '100%', marginTop: '30px' }}>
        <Button
          variant="secondary"
          sx={{
            marginRight: '20px',
            background: 'background',
          }}
        >
          Learn more
        </Button>
        <Button>Buy a bill</Button>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
