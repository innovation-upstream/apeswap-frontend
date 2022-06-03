import { borderRadius } from 'polished'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  swapSwitchContainer: {
    width: '100%',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapSwitchButton: {
    backgroundColor: 'yellow',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  SwapConfirmDisabledInputContainer: {
    backgroundColor: 'white3',
    borderRadius: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    height: '60px',
  },
}
