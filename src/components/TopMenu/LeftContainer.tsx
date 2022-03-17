import React, { useContext, useEffect } from 'react'
import { Box } from 'theme-ui'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import { IconButton, MenuContext, Svg } from '@innovationupstream/apeswap-uikit'

const LeftContainer: React.FC<any> = () => {
  const { collapse, setCollapse } = useContext(MenuContext)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: [4, 8],
        margin: '0 0 0 10px',
        'button:first-of-type': {
          px: [null, null, '10px'],
          py: [null, null, '10px'],
          borderRadius: 'normal',
          '&:hover': {
            background: 'lvl1',
          },
        },
      }}
    >
      <IconButton
        variant="transparent"
        onClick={() => setCollapse(!collapse)}
        icon={collapse ? 'hamburger' : 'collapse'}
        color="info"
        sx={{ width: '24' }}
      />
      <Svg icon="textLogo" />
    </Box>
  )
}

export default LeftContainer