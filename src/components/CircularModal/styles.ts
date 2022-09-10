import { ThemeUIStyleObject } from 'theme-ui'

export const modalProps = {
  sx: {
    minWidth: ['90%', '440px'],
    width: ['280px'],
    maxWidth: '440px',
    height: ['550px', '700px'],
    // height: ['calc(100vh - 18%)', 'auto'],
  },
}

export const circular: Record<string, ThemeUIStyleObject> = {
  container: {
    flexDirection: 'column',
    paddingTop: [20, 30],
    // justifyContent: 'space-between',
    // height: ['90%', 'auto'],
    // overflowY: 'auto',
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
  footer: {
    flexDirection: ['column', 'row-reverse'],
    justifyContent: ['flex-start', 'space-between'],
    marginTop: ['15px', '30px'],
  },
  checkSection: {
    alignItems: 'center',
    marginTop: ['10px', 0],
  },
  checkboxParent: {
    alignItems: 'center',
    width: '21px',
    height: '21px',
    marginRight: ['10px'],
    paddingLeft: '4px',
  },
  checkboxText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '18px',
    marginLeft: '10px',
  },
  ctaTitle: {
    fontWeight: 700,
    fontSize: ['16px', '22px'],
    lineHeight: ['24px', '33px'],
  },
  ctaDescription: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
  },
}
