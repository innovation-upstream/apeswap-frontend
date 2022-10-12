import { ThemeUIStyleObject } from 'theme-ui'

export const modalProps = {
  sx: {
    minWidth: ['90%', '50%', '800px'],
    width: ['200px'],
    maxWidth: '800px',
    height: ['calc(100vh - 15%)', 'auto'],
  },
}

export const internalStyles: Record<string, ThemeUIStyleObject> = {
  modalBody: {
    marginTop: '30px',
    flexDirection: ['column', 'column', 'row'],
    width: '100%',
    justifyContent: ['flex-start', 'flex-start', 'space-between'],
  },
  showApe: {
    alignSelf: ['center', 'center', ''],
    width: ['280px', '280px', '46%'],
    height: ['280px', '280px', '400px'],
    '@media screen and (max-width: 320px)': {
      width: '240px',
      height: '240px',
    },
    background: `url(images/marketing-modals/emailApe.svg)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
}
