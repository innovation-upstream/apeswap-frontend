import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<string, ThemeUIStyleObject> = {
  container: {
    maxWidth: '1200px',
    margin: 'auto',
    px: '40px',
    '@media (min-width: 1024px)': {
      display: 'flex',
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
  copyright: {
    mt: '200px',
    justifyContent: 'center',
    '@media (min-width: 1024px)': {
      mt: '30px',
    },
  },
  apeLogo: {
    position: 'absolute',
    transform: 'translateY(30%)',
    bottom: 0,
    right: '-100px',
    svg: {
      width: '334px',
    },
    '@media (min-width: 1024px)': {
      mt: '30px',
      right: '50px',
      transform: 'translateY(40%)',
    },
  },
}

export default styles
