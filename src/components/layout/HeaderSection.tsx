import React, { useContext } from 'react'
import { MenuContext } from '@innovationupstream/apeswap-uikit'
import { Box } from 'theme-ui'

const HeaderSection: React.FC = ({ children }) => {
  const { collapse } = useContext(MenuContext)

  return (
    <>
      <Box sx={{ marginLeft: collapse ? [0, 0, '56px'] : [0, 0, '240px'] }}>{children}</Box>
    </>
  )
}

export default HeaderSection
