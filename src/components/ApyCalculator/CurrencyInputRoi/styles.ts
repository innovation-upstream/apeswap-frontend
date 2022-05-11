import { ThemeUICSSObject } from 'theme-ui'

const styles: Record<string, ThemeUICSSObject> = {
  maxButton: {
    margin: '0',
    padding: '0',
    fontSize: '16px',
    borderRadius: '6px',
    fontWeight: 500,
    lineHeight: 0,
    width: '62px',
    height: '30px',
  },
  container: {
    backgroundColor: 'white4',
    borderRadius: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
  inputSection: {
    justifyContent: 'space-between',
    alignItems: 'end',
    flexDirection: 'column',
    position: 'relative',
    borderRadius: '10px',
    zIndex: 1,
    '& input': {
      marginRight: 0,
    },
  },
}

export default styles
