import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  cardContainer: {
    width: '100%',
    background: 'white2',
    minHeight: '260px',
    height: 'auto',
    borderRadius: '10px',
    margin: '10px 0px',
    flexDirection: 'column',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    padding: '20px 10px',
  },
  legendContainer: {
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'column',
    top: '50px',
    left: '50px',
    '@media screen and (max-width: 950px)': {
      left: '30px',
      fontSize: '14px',
    },
    '@media screen and (max-width: 450px)': {
      left: '10px',
      top: '100px',
      fontSize: '12px',
    },
  },
}
