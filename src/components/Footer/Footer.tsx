/** @jsxImportSource theme-ui */
import React from 'react'
import { Box, Flex } from 'theme-ui'
import { Text, Svg, IconButton, Button } from '@innovationupstream/apeswap-uikit'
import FooterLinks from './FooterLinks'
import styles from './styles'

const Footer: React.FC = () => {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', pb: '90px', backgroundColor: 'dark1' }}>
      <Box sx={styles.container}>
        <Box sx={styles.leftSection}>
          <Svg icon="textLogo" width="250px" />
          <Box sx={{ pt: 11 }}>
            <Text sx={{ fontSize: '16px' }}>
              ApeSwap is a DeFi Hub on BNB Chain & Polygon focused on offering an accessible, transparent and secure
              experience for everyone.
            </Text>
          </Box>
          <Flex sx={{ mt: '35px' }}>
            <IconButton background="white3" sx={styles.select}>
              <Svg width="20px" icon="bsc_token" />
              <Text variant="sm">BSC</Text>
              <Svg width="8px" icon="caret" direction="down" />
            </IconButton>
          </Flex>
          <Flex sx={{ mt: '35px', justifyContent: 'space-between' }}>
            <IconButton background="white3" color="brown" icon="twitter" sx={styles.socialButtons} />
            <IconButton background="white3" color="brown" icon="discord" sx={styles.socialButtons} />
            <IconButton background="white3" color="brown" icon="send" sx={styles.socialButtons} />
            <IconButton background="white3" color="brown" icon="reddit" sx={styles.socialButtons} />
            <IconButton background="white3" color="brown" icon="medium" sx={styles.socialButtons} />
            <IconButton background="white3" color="brown" icon="instagram" sx={styles.socialButtons} />
          </Flex>
          <Flex sx={{ mt: '35px', justifyContent: 'space-between' }}>
            <Flex sx={{ alignItems: 'center', columnGap: '10px' }}>
              <IconButton variant="transparent">
                <Svg width="30px" icon="banana_token" />
              </IconButton>
              <Text>$0.388</Text>
            </Flex>
            <Button variant="secondary">BUY BANANA</Button>
          </Flex>
        </Box>
        <FooterLinks />
      </Box>
      <Flex sx={styles.copyright}>
        <Text sx={{ fontSize: '16px' }}>©2022 All rights reserved</Text>
      </Flex>
      <Box sx={styles.apeLogo}>
        <Svg icon="logo" />
      </Box>
    </Box>
  )
}

export default Footer
