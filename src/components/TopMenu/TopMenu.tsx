/** @jsxImportSource theme-ui */
import React, { useContext } from 'react'
import { MenuContext } from '@innovationupstream/apeswap-uikit'
import { Flex, Box } from 'theme-ui'
import LeftContainer from './LeftContainer'
import RightContainer from './RightContainer'

const TopMenu: React.FC<any> = () => {
  const { collapse, setCollapse } = useContext(MenuContext)
  return (
    <Flex
      sx={{
        color: 'text',
        backgroundColor: 'white3',
        position: 'relative',
        zIndex: 101,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        height: '60px',
      }}
    >
      <Box>
        <LeftContainer collapse={collapse} setCollapse={() => setCollapse(!collapse)} />
      </Box>
      <Box>
        <RightContainer />
      </Box>
    </Flex>
  )
}

export default TopMenu
