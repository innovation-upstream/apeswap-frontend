/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import { Text, Svg, IconButton, Button } from '@innovationupstream/apeswap-uikit'
import { useNetworkChainId } from 'state/hooks'
import { CHAIN_ID } from 'config/constants/chains'
import NetworkModal from './NetworkModal'

const networks = {
  [CHAIN_ID.BSC]: {
    icon: 'bsc_token',
    name: 'BSC',
  },
  [CHAIN_ID.MATIC]: {
    icon: 'polygon_token',
    name: 'POLYGON',
  },
}

const NetworkButton: React.FC = () => {
  const chainId = useNetworkChainId()
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton
        background="white3"
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: '11px',
          py: '8px',
          columnGap: '8px',
        }}
        onClick={() => setOpen(true)}
      >
        <Svg width="20px" icon={networks[chainId]?.icon as any} />
        <Text color="text" variant="sm">
          {networks[chainId]?.name}
        </Text>
        <Svg width="8px" icon="caret" direction="down" color="text" />
      </IconButton>
      <NetworkModal open={open} handleClose={() => setOpen(false)} />
    </>
  )
}

export default NetworkButton
