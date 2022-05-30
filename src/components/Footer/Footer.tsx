/** @jsxImportSource theme-ui */
import React, { useContext } from 'react'
import { Box, Flex } from 'theme-ui'
import { ThemeSwitcher } from '@apeswapfinance/uikit'
import { Text, Svg, IconButton, Button } from '@ape.swap/uikit'
import Link from 'next/link'
import { NetworkButton } from 'components/NetworkButton'
import { ThemeContext } from 'contexts/ThemeContext'
import { LinkWrapper } from 'style/LinkWrapper'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import FooterLinks from './FooterLinks'
import { socialLinks } from './Footer.data'
import styles from './styles'
import LangSelector from './LangSelector'

const Footer: React.FC = () => {
  const { toggleTheme, isDark } = useContext(ThemeContext)
  const { setLanguage, currentLanguage } = useTranslation()

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pb: '32px',
        backgroundColor: 'footer',
        borderTop: '5px solid',
        borderTopColor: 'lvl2',
      }}
    >
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
            <LangSelector currentLang={currentLanguage?.language} langs={languageList} setLang={setLanguage} />
          </Flex>
          <Flex sx={{ mt: '35px', justifyContent: 'space-between' }}>
            {socialLinks.map((link) => (
              <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">
                <IconButton background="white3" color="text" icon={link.icon as any} sx={styles.socialButtons} />
              </a>
            ))}
          </Flex>
          <Flex sx={{ mt: '35px', justifyContent: 'space-between' }}>
            <Flex sx={{ alignItems: 'center', columnGap: '10px' }}>
              <Link href="https://info.apeswap.finance/token/0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95" passHref>
                <LinkWrapper target="_blank">
                  <IconButton variant="transparent">
                    <Svg width="30px" icon="banana_token" />
                  </IconButton>
                </LinkWrapper>
              </Link>
              <Text>$0.388</Text>
            </Flex>
            <Link href="https://apeswap.finance/swap">
              <a target="_blank" href="https://apeswap.finance/swap" rel="noreferrer">
                <Button variant="secondary" sx={{ fontSize: '16px' }} px="0px">
                  BUY BANANA
                </Button>
              </a>
            </Link>
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
