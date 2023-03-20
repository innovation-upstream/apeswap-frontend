import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    height: '600px',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  centeredContainer: {
    paddingTop: ['50px', '50px', '100px'],
    maxWidth: '1412px',
    zIndex: 2,
    width: '95vw',
  },
  slideContainer: {
    width: ['100%', '100%', '36%'],
    minWidth: ['0', '0', '328px'],
    zIndex: 6,
  },
  imageContainer: {
    width: [0, 0, '64%'],
    position: 'relative',
    justifyContent: 'center',
  },
  imageWrapper: {
    display: ['none', 'none', 'flex'],
    marginTop: '50px',
    position: 'absolute',
    background: 'lvl1',
    zIndex: 10,
    padding: '10px',
    borderRadius: '15px',
    transition: 'all 0.3s ease-out',
    transform: 'matrix(1, 0.04, -0.34, 0.94, 0, 0)',
    width: '375px',
    height: '220px',
    '@media screen and (min-width: 1024px)': {
      width: '529px',
      height: '305px',
    },
    '&:hover': {
      transform: 'none',
      scale: '1.2',
      boxShadow: '0px 4px 134px rgba(255, 168, 0, 0.25)',
      cursor: 'pointer',
    },
  },
  image: {
    borderRadius: '6px',
    width: '100%',
    height: '100%',
    maxWidth: ['325px', '325px', 'none'],
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
}
