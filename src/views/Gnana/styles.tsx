import { ThemeUIStyleObject } from 'theme-ui'

export const modalProps = {
  sx: {
    minWidth: '420px',
    '@media screen and (max-width: 437px)': {
      minWidth: '95%',
    },
    maxWidth: '420px',
  },
}

export const gnanaStyles: Record<string, ThemeUIStyleObject> = {
  warningHeader: {
    fontSize: '22px',
    fontWeight: 700,
  },
}
