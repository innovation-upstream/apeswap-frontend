import React from 'react'
import { Box } from 'theme-ui'
import { IconButton, Svg, Button, Text } from '@innovationupstream/apeswap-uikit'

const RightContainer: React.FC<any> = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        gap: [4, 8],
        'button:nth-of-type(1)': {
          display: ['none', 'none', 'inline-flex'],
        },
      }}
    >
      <Button
        colorMode="light"
        csx={{
          background: 'white4',
          border: 0,
          '&:hover': {
            background: 'white4',
          },
        }}
        size="sm"
        variant="primary"
      >
        <Svg color="yellow" direction="down" icon="bnb_token" width={18} />
        <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
          BNB
        </Text>
        <Svg
          color="info"
          direction="down"
          icon="caret"
          // width={40}
        />
      </Button>

      <Button colorMode="dark" csx={{}} size="sm" variant="primary">
        <Text color="info" variant="md" weight="normal" sx={{ margin: '0 10px' }}>
          CONNECT
        </Text>
      </Button>

      <IconButton
        background="info"
        color="backgroundDisabled"
        icon="profileLight"
        variant="circular"
        csx={{ border: 0 }}
      />
    </Box>
  )
}

export default RightContainer
