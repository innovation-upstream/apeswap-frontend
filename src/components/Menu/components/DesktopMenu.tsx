/** @jsxImportSource theme-ui */
import React, { useContext } from 'react'
import { Box, Flex, useColorMode } from 'theme-ui'
import { MenuContext } from '@innovationupstream/apeswap-uikit'
import { Text, IconButton } from '@ape.swap/uikit'
import { NextLink } from './Link'
import { menuItemContainer, desktopMenuItem, desktopSubItem, socialMedia, menuItems } from './styles'
import * as ImageModule from '../images'

const Icons = ImageModule as unknown as { [key: string]: React.FC }

interface DesktopMenuProps {
  items: {
    label: string
    href: string
    lightIcon?: string
    darkIcon?: string
    items: {
      label: string
      href: string
    }[]
  }[]
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ items }) => {
  const [colorMode] = useColorMode()
  const { active } = useContext(MenuContext)

  return (
    <Flex
      sx={{
        ...menuItemContainer,
        borderColor: 'text',
        position: 'relative',
        columnGap: '40px',
      }}
    >
      {items?.map((item) => {
        const { label, href, items: subItems } = item
        const ImageElement = Icons[(colorMode === 'dark' ? item?.darkIcon : item?.lightIcon) || '']
        const style: any = desktopMenuItem(
          label,
          active === href || subItems?.some((subItem) => active === subItem.href),
        )

        return (
          <Flex sx={style}>
            {subItems?.length ? (
              <Text
                sx={{
                  ...menuItems,
                }}
              >
                {label}
              </Text>
            ) : (
              <NextLink href={href} csx={{ fontWeight: 'bold', pl: 0 }}>
                {label}
              </NextLink>
            )}
            {subItems?.length && (
              <Flex id={`menu-modal-${label}`} sx={desktopSubItem as any}>
                <ul
                  sx={{
                    listStyleType: 'none',
                    marginLeft: 0,
                  }}
                >
                  {subItems?.map((subItem) => (
                    <li sx={{ position: 'relative' }}>
                      <NextLink
                        href={subItem.href}
                        csx={{
                          fontWeight: 'bold',
                          display: 'inline-block',
                          marginTop: 10,
                          pl: 0,
                          color: 'text',
                          '&:hover': {
                            boxShadow: 'inset 0px -2px 0px',
                          },
                        }}
                        target={label === 'More' && '_blank'}
                      >
                        {subItem.label}
                      </NextLink>
                    </li>
                  ))}
                </ul>
                <Box>
                  <ImageElement />
                  <Flex
                    sx={{
                      ...socialMedia,
                    }}
                  >
                    {label === 'More' && (
                      <>
                        <a href="https://twitter.com/ape_swap" target="_blank" rel="noopener noreferrer">
                          <IconButton
                            variant="primary"
                            icon="twitter"
                            color="info"
                            sx={{ padding: '8px', height: 'fit-content' }}
                            background="white3"
                          />
                        </a>
                        <a href="https://t.me/ape_swap" target="_blank" rel="noopener noreferrer">
                          <IconButton
                            variant="primary"
                            icon="send"
                            color="info"
                            sx={{ padding: '8px', height: 'fit-content' }}
                            background="white3"
                          />
                        </a>
                        <a href="https://discord.com/invite/ApeSwap" target="_blank" rel="noopener noreferrer">
                          <IconButton
                            variant="primary"
                            icon="discord"
                            color="info"
                            sx={{ padding: '6px 8px', height: 'fit-content' }}
                            background="white3"
                          />
                        </a>
                      </>
                    )}
                  </Flex>
                </Box>
              </Flex>
            )}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default DesktopMenu
