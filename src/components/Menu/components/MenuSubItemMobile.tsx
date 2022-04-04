/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useContext, useState } from 'react'
import { Flex, Box, Image } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuContext, Svg, Text, IconButton } from '@innovationupstream/apeswap-uikit'
import { NextLink } from './Link'
import { menuItemContainer, linkStyle } from './styles'

export const MenuSubItemMobile = ({ icon, label, items, setCollapse, collapseData }) => {
  const [open, setOpen] = useState(false)
  const { active, collapse } = useContext(MenuContext)

  return (
    <>
      <Flex
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          ...menuItemContainer,
          position: 'relative',
          flexFlow: 'column',

          '&:hover > div:nth-of-type(2)': {
            visibility: 'visible',
          },
          borderBottom: '1px solid rgba(133, 133, 133, 0.1)',
        }}
      >
        <Flex sx={linkStyle}>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex sx={{ flexShrink: 0 }}>
              {typeof icon === 'string' ? <Svg width={24} icon={icon as any} /> : icon}
            </Flex>
            <Flex
              sx={{
                flexShrink: 0,
                marginLeft: '16px',
              }}
            >
              <Text
                sx={{
                  color: 'text',
                  fontWeight: '700',
                  fontSize: 2,
                }}
              >
                {label}
              </Text>
            </Flex>
          </Flex>
          <Box sx={{ display: collapse ? 'none' : null }}>
            <Svg icon="caret" width={7} direction={open ? 'up' : 'down'} />
          </Box>
        </Flex>
        {open && (
          <Flex
            onClick={() => {
              setCollapse(!collapseData)
            }}
            sx={{
              position: 'relative',
              top: 'auto',
              left: 0,
              minWidth: '100vw',
              background: '#565656',
              borderRadius: '0',
              padding: '0 0 20px 30px',
              //  visibility: 'hidden',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'fit-content' }}
              transition={{ height: { duration: 0.3 } }}
              exit={{ height: 0 }}
              sx={{
                overflow: 'hidden',
                padding: '20px 0 0',
              }}
            >
              {items?.map((link, index) => (
                <Flex
                  key={`${link.label}-${index + 1}`}
                  sx={{
                    position: 'relative',
                    borderColor: 'text',
                  }}
                >
                  <Flex key={`${link.label}-${index + 1}`} sx={linkStyle}>
                    <Flex sx={{ alignItems: 'center' }}>
                      <Flex sx={{ flexShrink: 0 }}>
                        <NextLink
                          href={link.href}
                          csx={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            padding: '5px',
                            display: 'inline-block',
                            width: '100%',
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
          </Flex>
        )}
      </Flex>
    </>
  )
}
