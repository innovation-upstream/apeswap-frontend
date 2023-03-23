import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'slideContainer'
  | 'slideTitle'
  | 'slideSubtitle'
  | 'counterText'
  | 'availableBills'
  | 'billImage'
  | 'image'
  | 'buttonContainer'
  | 'learnMoreButton',
  ThemeUIStyleObject
> = {
  slideContainer: {
    width: '100%',
    flexDirection: 'column',
    padding: ['0 10px', '0 10px', '0'],
    maxWidth: ['325px', '325px', 'none'],
  },
  slideTitle: {
    fontSize: ['45px', '45px', '64px'],
    lineHeight: ['48px', '48px', '80px'],
    fontWeight: 700,
    background: 'var(--theme-ui-colors-home-title)',
    webkitBackgroundClip: 'text',
    webkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    maxWidth: ['235px', '235px', '326px'],
  },
  slideSubtitle: {
    marginTop: '25px',
    fontWeight: 500,
    lineHeight: ['15px', '15px', '25px'],
    fontSize: ['12px', '12px', '18px'],
    maxWidth: ['325px', '325px', 'none'],
  },
  counterText: {
    lineHeight: ['15px', '15px', '25px'],
    fontSize: ['12px', '12px', '18px'],
    fontWeight: 700,
  },
  availableBills: {
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '18px',
    textTransform: 'uppercase',
    marginRight: '10px',
  },
  billImage: {
    width: '100%',
    height: '182px',
    display: ['flex', 'none', 'none'],
    marginTop: ['25px', '25px', 0],
    justifyContent: ['center', 'flex-start', 'flex-start'],
  },
  image: {
    borderRadius: '6px',
    width: '100%',
    height: '100%',
    maxWidth: ['325px', '325px', 'none'],
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
  buttonContainer: {
    width: '100%',
    marginTop: ['20px', '20px', '30px'],
    justifyContent: ['space-around', 'space-around', 'flex-start'],
  },
  learnMoreButton: {
    marginRight: ['0', '0', '20px'],
    background: 'background',
    fontSize: ['16px', '14px', '18px'],
    minWidth: '137px',
  },
}
