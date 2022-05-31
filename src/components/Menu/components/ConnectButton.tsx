/** @jsxImportSource theme-ui */
import React from 'react'
import { Button, Text, useWalletModal, useMatchBreakpoints, IconButton } from '@ape.swap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import { Box, Flex } from 'theme-ui'
import useTheme from 'hooks/useTheme'
import { dynamicStyles } from './styles'

const ConnectButton: React.FC<any> = () => {
  const { account } = useActiveWeb3React()
  const { login, logout } = useAuth()
  const { t } = useTranslation()
  const { onPresentAccountModal, onPresentConnectModal } = useWalletModal(login as any, logout, t, account)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const { isXs } = useMatchBreakpoints()
  const { isDark } = useTheme()

  const buttonStyle = dynamicStyles.userBlockBtn({ account })
  const iconstyleconnect = dynamicStyles.connectButtonIcon({})

  const loadButton = () => {
    if (account) {
      if (isXs) {
        return (
          <Button
            size="sm"
            fontSize="14px"
            variant="tertiary"
            sx={buttonStyle}
            onClick={() => {
              onPresentAccountModal()
            }}
            account={account}
          >
            <Text weight="normal">{accountEllipsis}</Text>
          </Button>
        )
      }
      return (
        <Button
          size="sm"
          variant="tertiary"
          fontSize="14px"
          sx={buttonStyle}
          onClick={() => {
            onPresentAccountModal()
          }}
          account={account}
        >
          <Text weight="normal">{accountEllipsis}</Text>
        </Button>
      )
    }
    return (
      <Button
        size="sm"
        variant="primary"
        fontSize="16px"
        onClick={() => {
          onPresentConnectModal()
        }}
        account={account}
      >
        {t('Connect')}
      </Button>
    )
  }

  return (
    <Flex sx={{ position: 'relative', marginRight: 5 }}>
      {loadButton()}
      {account && (
        <Box sx={iconstyleconnect}>
          <IconButton
            onClick={() => {
              onPresentAccountModal()
            }}
            icon={isDark ? 'profileDark' : 'profileLight'}
            variant="circular"
            background="white3"
          />
        </Box>
      )}
    </Flex>
  )
}

export default ConnectButton
