import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'yellowShadow'
  | 'centeredContainer'
  | 'slideContainer'
  | 'imageContainer'
  | 'imageWrapper'
  | 'image'
  | 'bubbleContainer',
  ThemeUIStyleObject
> = {
  mainContainer: {
    width: '100%',
    height: ['620px', '430px', '550px'],
    justifyContent: 'center',
    position: 'relative',
  },
  yellowShadow: {
    position: 'absolute',
    zIndex: 3,
    width: '737px',
    height: '552px',
    left: '-398px',
    top: '-391px',
    background: 'linear-gradient(99.09deg, #A16552 0%, #FFB300 106.96%)',
    opacity: 0.15,
    filter: 'blur(250px)',
  },
  centeredContainer: {
    paddingTop: ['50px', '50px', '65px'],
    maxWidth: '1412px',
    zIndex: 2,
    width: '95vw',
  },
  slideContainer: {
    width: ['100%', '50%', '36%'],
    minWidth: ['0', '0', '328px'],
    zIndex: 6,
  },
  imageContainer: {
    width: [0, '50%', '64%'],
    position: 'relative',
    justifyContent: 'center',
  },
  imageWrapper: {
    display: ['none', 'flex'],
    marginTop: '50px',
    position: 'absolute',
    zIndex: 10,
    padding: '10px',
    borderRadius: '15px',
    transition: 'all 0.3s ease-out',
    transform: 'matrix(1, 0.04, -0.34, 0.94, 0, 0)',
    width: ['256px', '256px'],
    height: ['153px', '153px'],
    '@media screen and (min-width: 700px)': {
      width: '300px',
      height: '179px',
    },
    '@media screen and (min-width: 852px)': {
      width: '375px',
      height: '220px',
    },
    '@media screen and (min-width: 1024px)': {
      width: '529px',
      height: '305px',
    },
    '&:hover': {
      transform: 'none',
      scale: '1.2',
      cursor: 'pointer',
      filter: 'drop-shadow(0px 4px 134px rgba(255, 168, 0, 0.25))',
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
  bubbleContainer: {
    justifyContent: ['center', 'center', 'flex-start'],
    alignContent: 'center',
    width: '100%',
    padding: ['0 10px', '0 10px', '0'],
    mt: ['30px', '30px', '35px'],
  },
}
