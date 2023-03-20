/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Flex, Text } from '@ape.swap/uikit'
import Bnb from './grayChains/bnb'
import Poly from './grayChains/poly'
import Tlos from './grayChains/Tlos'
import Arbitrum from './grayChains/Arbitrum'
import { styles } from '../../styles'
import { Box } from 'theme-ui'

const DefiRedefined = () => {
  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        padding: ['0 10px', '0 10px', '0'],
        maxWidth: ['325px', '325px', 'none'],
      }}
    >
      <Text
        sx={{
          fontSize: ['29px', '29px', '64px'],
          lineHeight: ['40px', '40px', '80px'],
          fontWeight: 700,
          background: 'var(--theme-ui-colors-home-title)',
          webkitBackgroundClip: 'text',
          webkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          maxWidth: ['225px', '225px', '325px'],
        }}
      >
        DeFi, Redefined
      </Text>
      <Text
        sx={{
          marginTop: '25px',
          fontWeight: 500,
          lineHeight: ['15px', '15px', '25px'],
          fontSize: ['12px', '12px', '18px'],
          maxWidth: ['325px', '325px', 'none'],
        }}
      >
        Join our growing network of 25 communities that are building project-owned liquidity through Treasury Bills.
      </Text>
      <Flex sx={{ alignItems: 'center', marginTop: ['25px', '25px', '30px'] }}>
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
      <Flex
        sx={{
          width: '100%',
          height: '182px',
          display: ['flex', 'flex', 'none'],
          marginTop: ['25px', '25px', 0],
          justifyContent: ['center', 'flex-start', 'flex-start'],
        }}
      >
        <Box sx={{ ...styles.image, backgroundImage: `url('/images/homepage-0.jpg')` }} />
      </Flex>
      <Flex
        sx={{
          width: '100%',
          marginTop: ['20px', '20px', '30px'],
          justifyContent: ['space-around', 'flex-start', 'flex-start'],
        }}
      >
        <Button
          variant="secondary"
          sx={{
            marginRight: ['0', '20px', '20px'],
            background: 'background',
            fontSize: ['16px', '16px', '18px'],
          }}
        >
          Learn more
        </Button>
        <Button sx={{ fontSize: ['16px', '16px', '18px'] }}>Buy a bill</Button>
      </Flex>
    </Flex>
  )
}

export default DefiRedefined
