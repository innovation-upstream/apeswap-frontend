/** @jsxImportSource theme-ui */
import React, { useContext } from 'react'
import { Box, Flex } from 'theme-ui'
import { ThemeSwitcher } from '@apeswapfinance/uikit'
import { Text, Svg, IconButton, Button } from '@innovationupstream/apeswap-uikit'
import { NetworkButton } from 'components/NetworkButton'
import { ThemeContext } from 'contexts/ThemeContext'
import FooterLinks from './FooterLinks'
import styles from './styles'

const Footer: React.FC = () => {
  const { toggleTheme, isDark } = useContext(ThemeContext)

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pb: '32px', backgroundColor: 'footer' }}>
      <Box sx={styles.container}>
        <Box sx={styles.leftSection}>
          <Svg icon="textLogo" width="250px" />
          <Box sx={{ pt: 11 }}>
            <Text sx={{ fontSize: '16px' }}>
              ApeSwap is a DeFi Hub on BNB Chain & Polygon focused on offering an accessible, transparent and secure
              experience for everyone.
            </Text>
          </Box>
          <Flex sx={{ mt: '35px', columnGap: '25px' }}>
            <ThemeSwitcher isDark={isDark} toggleTheme={toggleTheme} />
            <NetworkButton />
          </Flex>
          <Flex sx={{ mt: '35px', justifyContent: 'space-between' }}>
            <IconButton background="white3" color="text" icon="twitter" sx={styles.socialButtons} />
            <IconButton background="white3" color="text" icon="discord" sx={styles.socialButtons} />
            <IconButton background="white3" color="text" icon="send" sx={styles.socialButtons} />
            <IconButton background="white3" color="text" icon="reddit" sx={styles.socialButtons} />
            <IconButton background="white3" color="text" icon="medium" sx={styles.socialButtons} />
            <IconButton background="white3" color="text" icon="instagram" sx={styles.socialButtons} />
          </Flex>
          <Flex sx={{ mt: '35px', justifyContent: 'space-between' }}>
            <Flex sx={{ alignItems: 'center', columnGap: '10px' }}>
              <IconButton variant="transparent">
                <Svg width="30px" icon="banana_token" />
              </IconButton>
              <Text>$0.388</Text>
            </Flex>
            <Button variant="secondary" sx={{ fontSize: '16px' }} px="0px">
              BUY BANANA
            </Button>
          </Flex>
        </Box>
        <FooterLinks />
      </Box>
      <Box sx={styles.copyrightWrapper}>
        <Flex sx={styles.copyright}>
          <Text sx={{ fontSize: '16px', color: 'primaryBright' }}>©2022 All rights reserved</Text>
        </Flex>
        <Box sx={styles.apeLogo}>
          <Svg icon="logo" />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
