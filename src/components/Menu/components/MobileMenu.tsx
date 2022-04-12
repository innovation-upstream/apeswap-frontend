/** @jsxImportSource theme-ui */
import React, { useContext, useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, MenuContext, Svg, Text } from '@innovationupstream/apeswap-uikit'
import { NetworkButton } from 'components/NetworkButton'
import { NextLink } from './Link'
import { menuItemContainer, linkStyle } from './styles'

interface MobileMenuProps {
  items: {
    label: string
    href: string
    items: {
      label: string
      href: string
    }[]
  }[]
}

const MobileMenu: React.FC<MobileMenuProps> = ({ items }) => {
  const { active, collapse } = useContext(MenuContext)
  const [open, setOpen] = useState<any>({})

  const handleClick = (label: string) => () => {
    setOpen((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <AnimatePresence>
      {!collapse && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'fit-content' }}
          transition={{ height: { duration: 0.3 } }}
          exit={{ height: 0 }}
          sx={{
            width: '100%',
            background: 'navbar',
            position: 'absolute',
            overflow: 'hidden',
            zIndex: 10,
          }}
        >
          {items?.map((item) => {
            const { label, href, items: subItems } = item
            const onClick = handleClick(label)

            return (
              <>
                <Flex
                  sx={{
                    ...menuItemContainer,
                    background: 'navbar',
                    borderLeft: href === active ? '0px solid' : '',
                    borderBottom: '1px solid rgba(133, 133, 133, 0.1)',
                  }}
                  onClick={onClick}
                >
                  <Flex sx={{ ...linkStyle, position: 'relative' }}>
                    <Flex sx={{ alignItems: 'center' }}>
                      <Flex>
                        {subItems?.length ? (
                          <Text
                            sx={{
                              color: 'text',
                              fontWeight: '700',
                              fontSize: 2,
                              pl: '20px',
                            }}
                          >
                            {label}
                          </Text>
                        ) : (
                          <NextLink href={href} csx={{ fontWeight: 'bold' }}>
                            {label}
                          </NextLink>
                        )}
                      </Flex>
                    </Flex>
                    {subItems?.length && (
                      <Box>
                        <Svg icon="caret" width={7} direction={open[label] ? 'up' : 'down'} />
                      </Box>
                    )}
                  </Flex>
                </Flex>
                <AnimatePresence>
                  {open[label] && subItems?.length && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'fit-content' }}
                      transition={{ height: { duration: 0.3 } }}
                      exit={{ height: 0 }}
                      sx={{
                        overflow: 'hidden',
                        padding: '10px 0px',
                        background: 'navbar',
                      }}
                    >
                      {subItems?.map((link, index) => (
                        <Flex
                          key={`${link.label}-${index + 1}`}
                          sx={{
                            ...menuItemContainer,
                            position: 'relative',
                            borderColor: 'text',
                            borderLeft: link.href === active ? '4px solid' : '',
                          }}
                        >
                          <Flex key={`${link.label}-${index + 1}`} sx={{ ...linkStyle, position: 'relative' }}>
                            <Flex sx={{ alignItems: 'center' }}>
                              <Flex sx={{ flexShrink: 0 }}>
                                <NextLink
                                  href={link.href}
                                  csx={{
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    pl: '35px',
                                  }}
                                >
                                  {link.label}
                                </NextLink>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Flex>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )
          })}
          <Flex
            sx={{
              justifyContent: 'center',
              py: '30px',
              columnGap: '20px',
              background: 'navbar',
            }}
          >
            <IconButton
              variant="primary"
              icon="twitter"
              color="info"
              sx={{ padding: '8px', margin: '0 5px' }}
              background="white3"
            />
            <IconButton
              variant="primary"
              icon="send"
              color="info"
              sx={{ padding: '8px', margin: '0 5px' }}
              background="white3"
            />
            <IconButton
              variant="primary"
              icon="discord"
              color="info"
              sx={{ padding: '6px 8px', margin: '0 5px' }}
              background="white3"
            />
            <NetworkButton />
          </Flex>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
