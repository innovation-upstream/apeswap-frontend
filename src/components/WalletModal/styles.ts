export const menuItemContainer = {
  alignItems: 'center',
  pr: '20px',
  boxShadow: 'none',
  fontSize: '16px',
  '&:hover': {
    cursor: 'pointer',
  },
} as any

export const desktopMenuItem = (label: string) => ({
  position: 'relative',
  padding: '20px 10px',
  [`#menu-modal-${label}`]: {
    display: 'none',
  },
  '&:hover': {
    boxShadow: 'inset rgb(250 250 250) 0px -3px 0px',
    [`#menu-modal-${label}`]: {
      display: 'flex',
    },
  },
})

export const desktopSubItem = {
  background: 'navbar',
  position: 'absolute',
  padding: '0 0 50px 20px',
  borderRadius: '0 0 25px 25px',
  columnGap: '40px',
  width: 'max-content',
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
