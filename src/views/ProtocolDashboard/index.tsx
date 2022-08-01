/** @jsxImportSource theme-ui */
import { Flex } from '@ape.swap/uikit'
import Banner from 'components/Banner'
import React from 'react'
import Overview from './Overview'

const ProtocolDashboard = () => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Flex>
        <Banner banner="iao" title="Yes" link="?modal=2" />
      </Flex>
      <Overview />
    </Flex>
  )
}

export default ProtocolDashboard
