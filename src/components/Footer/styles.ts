import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<string, ThemeUIStyleObject> = {
  container: {
    maxWidth: '1200px',
    width: ['100%', '335px', '100%'],
    color: 'primaryBright',
    display: 'flex',
    pt: '80px',
    px: ['40px', '10px', '40px'],
    alignItems: 'start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '@media (max-width:967px)': {
      marginBottom: '70px',
    },
    '@media (max-width: 575px)': {
      margin: '0 auto 70px',
      pt: '30px',
    },
  },
  leftSection: {
    maxWidth: ['100%', '100%', '375px'],
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: ['center', 'center', 'center', 'center', 'flex-start'],
    '@media (max-width: 967px)': {
      margin: '0 auto',
      textAlign: 'center',
    },
  },
  textleft: {
    textAlign: ['left', 'center', 'center', 'center', 'left'],
  },
  spanSvg: {
    '@media (min-width: 370px) and (max-width:767px)': {
      display: 'block',
    },
  },
  linkSection: {
    flexDirection: ['column', 'row', 'row'],
    flexBasis: '50%',
    px: ['0px', '0px', '10px'],
    width: '100%',
    rowGap: '20px',
    minWidth: '590px',
    flexShrink: 0,
    margin: [0, '0 auto', '0 auto', '0 auto', 0],
    justifyContent: 'space-between',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
    '@media (min-width: 1024px)': {
      px: 0,
    },
    '@media (min-width: 370px) and (max-width:767px)': {
      flexDirection: 'column',
    },
    '@media (max-width:767px)': {
      minWidth: '100%',
      maxWidth: '375px',
      marginTop: '20px',
    },
  },
  linkTitle: {
    width: '100%',
    px: ['0px'],
    borderBottom: ['1px solid', 'none', 'none'],
    paddingBottom: ['10px', 'none', 'none'],
    justifyContent: 'space-between',
    '@media (min-width: 370px) and (max-width:767px)': {
      borderBottom: '1px solid',
    },
    '@media (max-width:967px)': {
      justifyContent: 'center',
    },
    '@media (max-width:767px)': {
      justifyContent: 'space-between',
    },
  },
  list: {
    listStyleType: 'none',
    ' @media screen and (min-width: 767px)': {
      display: 'block',
    },
    '@media (max-width:967px)': {
      textAlign: 'center',
    },
    '@media (max-width:767px)': {
      textAlign: 'left',
    },
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
    position: 'static',
    maxWidth: '1200px',
    px: ['15%', '10px'],
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
    justifyContent: ['start', 'start', 'center'],
    alignItems: ['center', 'flex-start', 'end'],
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
    svg: {
      position: ['absolute'],
      width: ['100px', '150px', '200px', '200px', '300px'],
      right: [0, '20px', '20px', '30px', '50px'],
      bottom: ['-40px', '-60px', '-80px', '-120px', '-120px'],
    },
  },
}

export default styles
