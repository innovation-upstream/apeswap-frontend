import { ThemeUIStyleObject } from 'theme-ui'

export const modalProps = {
  sx: {
    minWidth: ['90%', '440px'],
    width: ['280px'],
    maxWidth: '440px',
    height: ['calc(100vh - 15%)', 'auto'],
  },
}

export const circular: Record<string, ThemeUIStyleObject> = {
  container: {
    flexDirection: 'column',
    paddingTop: [20, 30],
  },
  supporting: {
    color: 'yellow',
    fontWeight: 700,
    fontSize: '10px',
    lineHeight: '14px',
  },
  description: {
    fontWeight: 700,
    fontSize: ['16px', '22px'],
    lineHeight: '25px',
  },
}
