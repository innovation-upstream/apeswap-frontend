import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  cardContainer: {
    width: 'fit-content',
    minHeight: '350px',
    height: 'fit-content',
    borderRadius: '10px',
    margin: '10px 0px',
    flexDirection: 'column',
    alignItems: 'space-between',
    padding: '20px 10px',
  },
  assetBreakdownContainer: {
    width: '580px',
    height: 'auto',
    maxHeight: '500px',
    background: 'white3',
    overflowY: 'scroll',
    overflowX: 'hidden',
    flexDirection: 'column',
    borderRadius: '10px',
    marginTop: '20px',
  },
  assetContainer: {
    position: 'relative',
    background: 'white3',
    minHeight: '60px',
    height: 'fit-content',
    width: '100%',
    justifyContent: 'center',
    padding: '0px 20px 0px 10px',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: '10px',
    margin: '5px 10px',
  },
}
