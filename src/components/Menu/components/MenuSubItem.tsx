/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useContext, useState } from 'react'
import { Flex, Box } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuContext, Svg, Text } from '@innovationupstream/apeswap-uikit'
import { NextLink } from './Link'
import { menuItemContainer, linkStyle } from './styles'

export const MenuSubItem = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false)
  const { active, collapse } = useContext(MenuContext)

  return (
    <>
      <Flex
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          ...menuItemContainer,
        }}
      >
        <Flex sx={linkStyle}>
          <Flex sx={{ alignItems: 'center' }}>
            <Flex sx={{ flexShrink: 0 }}>
              {typeof icon === 'string' ? <Svg width={24} icon={icon as any} /> : icon}
            </Flex>
            <Flex sx={{ flexShrink: 0, marginLeft: '16px' }}>
              <Text
                sx={{
                  color: 'text',
                  fontWeight: '400',
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
      </Flex>
      <AnimatePresence>
        {!collapse && open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ height: { duration: 0.3 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', background: 'body' }}
          >
            {items?.map((link, index) => (
              <Flex
                key={`${link.label}-${index + 1}`}
                sx={{
                  ...menuItemContainer,
                  position: 'relative',
                  borderColor: 'text',
                  paddingLeft: link.href === active ? '13px' : undefined,
                  borderLeft: link.href === active ? '4px solid' : '',
                }}
              >
                <Flex key={`${link.label}-${index + 1}`} sx={linkStyle}>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Flex sx={{ flexShrink: 0, marginLeft: '10px' }}>
                      <NextLink href={link.href} csx={{ fontSize: 1 }}>
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
}
