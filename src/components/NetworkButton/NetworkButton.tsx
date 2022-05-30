/** @jsxImportSource theme-ui */
import React from 'react'
import { Text, Svg, Button, useNetworkModal } from '@ape.swap/uikit'
import { useNetworkChainId } from 'state/hooks'
import useSwitchNetwork from 'hooks/useSelectNetwork'
import { CHAIN_ID } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'

const networks = {
  [CHAIN_ID.BSC]: {
    icon: 'bsc_token',
    name: 'BNB',
  },
  [CHAIN_ID.MATIC]: {
    icon: 'polygon_token',
    name: 'POLYGON',
  },
  [CHAIN_ID.BSC_TESTNET]: {
    icon: 'bsc_token',
    name: 'BSC TESTNET',
  },
  [CHAIN_ID.MATIC_TESTNET]: {
    icon: 'polygon_token',
    name: 'POLYGON TESTNET',
  },
  [CHAIN_ID.ETH]: {
    icon: 'eth_token',
    name: 'ETHEREUM',
  },
}

const NetworkButton: React.FC = () => {
  const chainId = useNetworkChainId()
  const { switchNetwork } = useSwitchNetwork()
  const { t } = useTranslation()
  const { onPresentNetworkModal } = useNetworkModal(switchNetwork, chainId, t)

  return (
    <Button
      variant="tertiary"
      background="white3"
      sx={{
        display: 'flex',
        alignItems: 'center',
        px: '11px',
        py: '8px',
        columnGap: '8px',
      }}
      onClick={onPresentNetworkModal}
    >
      <Svg width="20px" icon={networks[chainId]?.icon as any} />
      <Text color="text" sx={{ fontSize: '14px', fontWeight: '600' }} variant="sm">
        {networks[chainId]?.name}
      </Text>
      <Svg width="8px" icon="caret" direction="down" color="text" />
    </Button>
  )
}

export default NetworkButton
