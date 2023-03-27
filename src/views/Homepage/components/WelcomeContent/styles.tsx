import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  'mainContainer' | 'yellowShadow' | 'centeredContainer' | 'slideContainer' | 'circlesContainer' | 'bubbleContainer',
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
    maxWidth: '1412px',
    zIndex: 2,
  },
  slideContainer: {
    width: '100%',
  },
  circlesContainer: {
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  },
  bubbleContainer: {
    justifyContent: ['center', 'flex-start', 'flex-start'],
    alignContent: 'center',
    width: '100%',
    padding: ['0 10px', '0 10px', '0 2.5vw'],
    zIndex: 1,
  },
}
