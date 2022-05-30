import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Token selector container
  dexPanelContainer: {
    position: 'relative',
    width: '100%',
    height: '94px',
    background: 'white3',
    padding: '10px',
    borderRadius: '10px',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },

  panelTopContainer: {
    width: '100%',
    height: 'auto',
  },

  panelBottomContainer: {
    width: '100%',
    justifyContent: 'space-between',
  },

  panelBottomText: {
    opacity: 0.8,
  },

  swapDirectionText: {
    position: 'absolute',
    left: 0,
    top: 0,
    transform: 'translate(0px, -30px)',
  },

  maxButton: {
    borderRadius: '6px',
    height: '20px',
    width: '40px',
    fontSize: '12px',
    fontWeight: '600',
    ml: '10px',
  },
}
