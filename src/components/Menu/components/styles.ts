import { ThemeUIStyleObject } from 'theme-ui'

export const menuItemContainer = {
  borderColor: 'text',
  position: 'relative',
  columnGap: '40px',
  alignItems: 'center',
  pr: '20px',
  boxShadow: 'none',
  fontSize: '16px',
  '&:hover': {
    cursor: 'pointer',
  },
} as any
export const menuMobile = {
  width: '100%',
  background: 'pink',
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 10,
} as any
export const dropdown = {
  overflow: 'hidden',
  padding: '10px 0px',
  background: 'navbar',
} as any

export const desktopMenuItem = (label: string, active: boolean) => ({
  position: 'relative',
  paddingX: '10px',
  alignItems: 'center',
  height: '100%',
  boxShadow: active ? 'inset 0px -3px 0px' : '',
  [`#menu-modal-${label}`]: {
    display: 'none',
  },
  '&:hover': {
    boxShadow: 'inset 0px -3px 0px',
    color: 'text',
    [`#menu-modal-${label}`]: {
      display: 'flex',
    },
  },
})

export const desktopSubItem = {
  background: 'navbar',
  position: 'absolute',
  pl: '20px',
  width: '429px',
  borderRadius: '0 0 25px 25px',
  justifyContent: 'space-between',
  left: 0,
  top: 'calc(100% - 3px)',
}

export const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minHeight: '48px',
  justifyContent: 'space-between',
  fontWeight: '600',
}

export const connectorButtons = {
  background: 'white4',
  border: 0,
  '&:hover': {
    background: 'white4',
  },
  width: '100%',
  height: '48px',
  justifyContent: 'space-between',
  margin: '10px 0',
}

export const connectButton = {
  background: 'white4',
  border: 0,
  '&:hover': {
    background: 'white4',
  },
}
export const socialMedia = {
  justifyContent: 'center',
  alignContent: 'center',
  columnGap: '10px',
  background: 'navbar',
  borderRadius: '25px',
  height: '50px',
}
export const menuItems = {
  color: 'text',
  fontWeight: 'bold',
  fontSize: 2,
  pl: '0px',
}
export const menuLink = {
  color: 'text',
  fontWeight: '400',
  fontSize: 2,
  pl: '20px',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
}
export const mobilemenutop = {
  width: '100%',
  background: 'navbar',
  position: 'absolute',
  overflow: 'hidden',
  zIndex: 10,
}
export const connectButtonIcon = {
  '&& button': { border: 'none', borderRadius: '50%' },
  position: 'absolute',
  right: -4,
  top: '50%',
  transform: 'translateY(-50%)',
} as any

interface Props {
  account?: string
}

export const dynamicStyles: Record<string, (props: any) => ThemeUIStyleObject> = {
  userBlockBtn: ({ account }: Props) => ({
    height: '35px',
    marginLeft: '10px',
    lineHeight: '10px',
    background: account ? 'white3' : 'yellow',
    color: account ? 'text' : 'primaryBright',
    '&&': {
      padding: `0px ${account ? '45px' : '15px'} 0px 15px`,
    },
  }),
}
