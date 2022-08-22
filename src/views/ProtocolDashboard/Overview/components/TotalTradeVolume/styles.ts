import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  cardContainer: {
    maxWidth: '590px',
    width: '100%',
    background: 'white2',
    height: '355px',
    borderRadius: '10px',
    margin: '10px 0px',
    flexDirection: 'column',
    padding: '20px',
    '@media screen and (max-width: 1100px)': {
      height: '537px',
    },
  },
}
