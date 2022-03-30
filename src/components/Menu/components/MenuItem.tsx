import React, { useContext } from 'react'
import { Flex } from 'theme-ui'
import { MenuContext, Svg } from '@innovationupstream/apeswap-uikit'
import { Bold } from 'react-feather'
import { NextLink } from './Link'
import { menuItemContainer, linkStyle } from './styles'

export const MenuItem = ({ icon, label, href }) => {
  const { active } = useContext(MenuContext)
  // console.log('label', label)

  return (
    <Flex
      sx={{
        ...menuItemContainer,
        borderColor: 'text',
        paddingLeft: href === active ? '0px' : undefined,
        borderLeft: href === active ? '0px solid' : '',
        position: 'relative',
        border: '3px solid transparent',
        '&:hover': {
          borderBottom: '3px solid white',
        },
      }}
    >
      <Flex sx={linkStyle}>
        <Flex sx={{ alignItems: 'center' }}>
          <Flex sx={{ flexShrink: 0 }}>{typeof icon === 'string' ? <Svg width={24} icon={icon as any} /> : icon}</Flex>
          <Flex sx={{ flexShrink: 0 }}>
            <NextLink href={href} csx={{ fontWeight: 'bold' }}>
              {label}
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
