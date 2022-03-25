/* eslint-disable jsx-a11y/anchor-is-valid */
/** @jsxImportSource theme-ui */
import React, { useContext, useState } from 'react'
import { Flex, Box, Image } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { MenuContext, Svg, Text, IconButton } from '@innovationupstream/apeswap-uikit'
import { NextLink } from './Link'
import { menuItemContainer, linkStyle } from './styles'

export const MenuSubItem = ({ icon, label, items }) => {
  const [open, setOpen] = useState(false)
  const { active, collapse } = useContext(MenuContext)

  console.log('subitem', label)

  return (
    <>
      <Flex
        onClick={() => setOpen((prev) => !prev)}
        sx={{
          ...menuItemContainer,
          position: 'relative',
          '&:hover > div:nth-of-type(2)': {
            visibility: 'visible',
          },
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

        <Flex
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            minWidth: '430px',
            background: '#000',
            borderRadius: '0 0 25px 25px',
            padding: '0 0 80px 20px',
            visibility: 'hidden',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'fit-content' }}
            transition={{ height: { duration: 0.3 } }}
            exit={{ height: 0 }}
            sx={{ overflow: 'hidden', padding: '20px 0 0' }}
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
          <Box sx={{ flexShrink: '0', marginLeft: 'auto' }}>
            <Image
              src="https://i.picsum.photos/id/975/200/300.jpg?hmac=BGcA8uNiSpWczZjtm2d5f7y562W9AF2nh_3KDsyu_yM"
              sx={{ width: '200px', height: '280px', objectFit: 'cover' }}
            />
          </Box>
          {label === 'More' && (
            <Box sx={{ position: 'absolute', right: '23px', bottom: '20px' }}>
              <IconButton
                variant="primary"
                icon="twitter"
                color="white1"
                sx={{ padding: '8px', margin: '0 5px' }}
                background="navMenuLogo"
              />
              <IconButton
                variant="primary"
                icon="send"
                color="white1"
                sx={{ padding: '8px', margin: '0 5px' }}
                background="navMenuLogo"
              />
              <IconButton
                variant="primary"
                icon="discord"
                color="info"
                sx={{ padding: '6px 8px', margin: '0 5px' }}
                background="navMenuLogo"
              />
            </Box>
          )}
        </Flex>

        {/* {!collapse && open && (
         
        )} */}
      </Flex>
    </>
  )
}
