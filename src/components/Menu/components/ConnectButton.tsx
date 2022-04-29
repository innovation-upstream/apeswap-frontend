/** @jsxImportSource theme-ui */
import React from 'react'
import { Box, Flex } from 'theme-ui'
import { Button, Text, IconButton } from '@innovationupstream/apeswap-uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from 'hooks/useTheme'
import { connectButton } from './styles'

const ConnectButton: React.FC<any> = ({ handleConnect }) => {
  const { account } = useActiveWeb3React()
  const { isDark } = useTheme()
  return (
    <Flex sx={{ position: 'relative', marginRight: 5 }}>
      <Button csx={connectButton} size="sm" variant="primary" onClick={handleConnect}>
        <Text
          color="info"
          variant="md"
          weight="normal"
          sx={{
            margin: '0 30px 0 0',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          {account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : 'CONNECT'}
        </Text>
      </Button>
      <Box
        sx={{
          '& button': { border: 'none' },
          position: 'absolute',
          right: -5,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <IconButton
          onClick={handleConnect}
          icon={isDark ? 'profileDark' : 'profileLight'}
          variant="circular"
          background="white3"
        />
      </Box>
    </Flex>
  )
}

export default ConnectButton
