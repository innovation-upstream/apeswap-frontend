import { ThemeUIStyleObject } from 'theme-ui'

export const buttonHover = {
  '&:not([disabled])': { borderColor: '#FFDA00', background: '#FFDA00' },
  '&:disabled': {},
}

export const dexStyles: Record<string, ThemeUIStyleObject> = {
  // Token selector container
  dexContainer: {
    width: 'auto',
    maxWidth: '420px',
    height: 'fit-content',
    background: 'white2',
    padding: '15px',
    borderRadius: '10px',
    margin: '0px 10px',
    flexDirection: 'column',
  },
}
