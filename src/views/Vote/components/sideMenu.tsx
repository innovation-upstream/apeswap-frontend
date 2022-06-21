import React, { useState } from 'react'
import { Button, Heading, Text, Svg } from '@ape.swap/uikit'
import { Link } from 'react-router-dom'
import { Box } from 'theme-ui'
import styles from '../styles'

const menuItems = [
  {
    label: 'Proposals',
    link: '/vote',
  },
  {
    label: 'New Proposal',
    link: '/vote/create',
  },
  {
    label: 'About',
    link: '/vote/create',
  },
]

const SideMenu: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState(menuItems[0].label)
  return (
    <Box sx={styles.sideMenu}>
      <Box sx={styles.sideMenuProfile}>
        <Box sx={styles.sideMenuAvatar}>{}</Box>
        <Box sx={styles.sideMenuProfileInfo}>
          <Heading>ApeSwap</Heading>
          <Text size="1">593 members</Text>
          <Button size="sm" fullWidth>
            Join
          </Button>
        </Box>
      </Box>
      <Box sx={styles.sideMenuLinkContainer}>
        {menuItems.map((item) => (
          <Link to={item.link}>
            <Box
              sx={{
                ...styles.sideMenuLink,
                borderColor: activeMenu === item.label ? 'primaryButtonDisable' : 'transparent',
              }}
            >
              {item.label}
            </Box>
          </Link>
        ))}
        <Box sx={styles.menuSocialIcons}>
          <Svg color="text" icon="twitter" width="20px" />
          <Svg color="text" icon="website" width="20px" />
        </Box>
      </Box>
    </Box>
  )
}

export default SideMenu
