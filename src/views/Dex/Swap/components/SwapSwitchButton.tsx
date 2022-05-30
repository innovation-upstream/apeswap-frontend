import { Flex, SyncAltIcon } from '@ape.swap/uikit'
import React from 'react'
import { styles } from './styles'

const SwapSwitchButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <Flex sx={{ ...styles.swapSwitchContainer }}>
    <Flex sx={{ ...styles.swapSwitchButton }} onClick={onClick}>
      <SyncAltIcon width="20px" style={{ transform: 'rotate(90deg)' }} />
    </Flex>
  </Flex>
)

export default React.memo(SwapSwitchButton)
