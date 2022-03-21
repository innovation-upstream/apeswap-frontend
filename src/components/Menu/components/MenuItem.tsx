import React, { useContext } from 'react'
import { Flex } from 'theme-ui'
import { MenuContext, Svg } from '@innovationupstream/apeswap-uikit'
import { NextLink } from './Link'
import { menuItemContainer, linkStyle } from './styles'

export const MenuItem = ({ icon, label, href }) => {
  const { active } = useContext(MenuContext)

  return (
    <Flex
      sx={{
        ...menuItemContainer,
        borderColor: 'text',
        paddingLeft: href === active ? '13px' : undefined,
        borderLeft: href === active ? '4px solid' : '',
      }}
    >
      <Flex sx={linkStyle}>
        <Flex sx={{ alignItems: 'center' }}>
          <Flex sx={{ flexShrink: 0 }}>{typeof icon === 'string' ? <Svg width={24} icon={icon as any} /> : icon}</Flex>
          <Flex sx={{ flexShrink: 0 }}>
            <NextLink href={href}>{label}</NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
