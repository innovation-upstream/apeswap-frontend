import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Token selector container
  dexTradeInfoContainer: {
    border: '2px solid',
    marginTop: '10px',
    borderRadius: '10px',
    borderColor: 'white3',
    padding: '5px 10px',
    width: '100%',
    flexDirection: 'column',
    height: 'fit-content',
  },

  navLinkContainer: {
    width: '100%',
    maxWidth: '225px',
    paddingRight: '20px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navIconContainer: {
    width: '100%',
    maxWidth: '60px',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navLink: {
    cursor: 'pointer',
  },
}
