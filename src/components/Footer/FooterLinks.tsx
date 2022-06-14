/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useState } from 'react'
import Link from 'next/link'
import { Box, Flex } from 'theme-ui'
import { Text, Svg } from '@ape.swap/uikit'
import { useTranslation } from 'contexts/Localization'
import { footerLinks } from './Footer.data'
import styles from './styles'

const FooterLinks: React.FC = () => {
  const [open, setOpen] = useState(new Array(footerLinks.length).fill(false))
  const { t } = useTranslation()
  const toggleOpen = (index: number) => {
    const newOpen = [...open]
    newOpen[index] = !newOpen[index]
    setOpen(newOpen)
  }

  return (
    <Flex sx={styles.linkSection}>
      {footerLinks.map((col, index) => (
        <Box>
          <Flex sx={styles.linkTitle} onClick={() => toggleOpen(index)}>
            <Text color="yellow" weight="bold" sx={{ fontSize: ['16px', '22px', '22px'] }}>
              {t(col.title)}
            </Text>
            <span sx={{ display: ['block', 'none', 'none'] }}>
              <Svg width="8px" icon="caret" direction="down" />
            </span>
          </Flex>
          <ul
            sx={{
              ...styles.list,
              display: [open[index] ? 'block' : 'none', 'block', 'block'],
            }}
          >
            {col.links.map((link) => (
              <li sx={{ marginTop: 7 }}>
                <Link href={link.href} passHref>
                  <a target="_blank">
                    <Text sx={{ fontSize: ['12px', '16px'] }} weight="normal">
                      {t(link.label)}
                    </Text>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Flex>
  )
}

export default FooterLinks
