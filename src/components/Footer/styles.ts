import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<string, ThemeUIStyleObject> = {
  container: {
    maxWidth: '1200px',
    width: '100%',
    margin: 'auto',
    px: '40px',
    color: 'primaryBright',
    '@media (min-width: 1024px)': {
      display: 'flex',
      width: '100%',
      px: '40px',
      alignItems: 'start',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  leftSection: {
    maxWidth: ['100%', '400px', '400px'],
    margin: 'auto',
    pt: '90px',
    '@media (min-width: 1024px)': {
      margin: 0,
    },
  },
  linkSection: {
    flexDirection: ['column', 'row', 'row'],
    flexBasis: '50%',
    pt: '90px',
    px: ['0px', '15%', '15%'],
    width: '100%',
    rowGap: '20px',
    justifyContent: 'space-between',
    '@media (min-width: 1024px)': {
      px: 0,
    },
  },
  linkTitle: {
    width: '100%',
    px: ['10px', '0px', '0px'],
    borderBottom: ['1px solid', 'none', 'none'],
    paddingBottom: ['10px', 'none', 'none'],
    justifyContent: 'space-between',
  },
  list: {
    listStyleType: 'none',
  },
  select: {
    display: 'flex',
    alignItems: 'center',
    px: '11px',
    py: '8px',
    columnGap: '8px',
  },
  socialButtons: {
    width: '40px',
    height: '40px',
    padding: '1px',
  },
  copyrightWrapper: {
    position: 'relative',
    maxWidth: '1200px',
    height: ['200px', '240px', '100px', 'auto'],
    px: ['15%', '40px'],
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
    justifyContent: ['start', 'start', 'center'],
    alignItems: ['center', 'center', 'end'],
    margin: 'auto',
    mt: ['70px', '70px', '70px', '30px'],
  },
  copyright: {
    position: ['relative'],
    top: 0,
    justifyContent: ['center'],
    '@media (min-width: 1024px)': {
      justifyContent: 'center',
    },
  },
  apeLogo: {
    position: ['absolute'],
    left: [0, 0, 'auto'],
    right: 0,
    display: ['flex'],
    margin: 'auto',
    justifyContent: 'center',
    transform: ['translateY(50%)', 'translateY(30%)', 'translate(30%, 20%)'],
    bottom: [0, -60],
    svg: {
      width: ['287px', '334px'],
    },
    '@media (min-width: 1024px)': {
      transform: 'translate(20%, 30%)',
    },
  },
}

export default styles
