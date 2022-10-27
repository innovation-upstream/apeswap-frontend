import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  desktopStepContainer: {
    height: '100px',
    width: '100%',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  desktopProgressCircleContainer: {
    height: '60px',
    width: '60px',
    borderRadius: '30px',
    background: 'white3',
    alignItems: 'center',
    justifyContent: 'center',
    mr: '15px',
    ml: '5px',
  },
  desktopStepLineIndicator: {
    background: 'gradient',
    height: '75px',
    width: '5px',
    position: 'absolute',
    zindex: -1,
  },
  desktopChildContainer: {
    width: '100%',
    height: 'fit-content',
    padding: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    background: 'gradient',
    borderRadius: '10px',
    mt: '70px',
  },
  migrateText: {
    lineHeight: '2.5px',
    width: '100%',
    height: '0px',
    textAlign: 'center',
    opacity: '.6',
  },
}
