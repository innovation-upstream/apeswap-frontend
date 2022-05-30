import { ThemeUIStyleObject } from 'theme-ui'

export const menuItemContainer = {
  alignItems: 'center',
  pr: '20px',
  boxShadow: 'none',
  fontSize: '16px',
  '&:hover': {
    cursor: 'pointer',
  },
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