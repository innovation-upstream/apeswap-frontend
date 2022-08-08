import { ThemeUIStyleObject } from 'theme-ui'

export const modalProps = {
  sx: {
    minWidth: ['90%', '420px'],
    width: ['200px'],
    maxWidth: '420px',
    height: ['fit-content', 'auto'],
  },
}

export const gnanaStyles: Record<string, ThemeUIStyleObject> = {
  warningHeader: {
    fontSize: '22px',
    fontWeight: 700,
  },
  gnanaContainer: {
    flexDirection: 'column',
    height: ['500px', 'auto'],
    paddingBottom: ['10px', '0'],
    overflow: 'auto',
  },
  headsUp: {
    width: '100%',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '10px',
    marginTop: '10px',
  },
  headsUpHeader: { flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  headsUpDescription: {
    fontSize: ['12px'],
    letterSpacing: '5%',
    fontWeight: 500,
    color: 'primaryBright',
    textAlign: 'center',
    lineHeight: '14px',
  },
  learnMoreBtn: {
    textDecorationLine: 'underline',
    fontSize: '12px',
    fontWeight: 500,
    color: 'primaryBright',
    '&&:hover': {
      color: 'primaryBright',
    },
  },
  transactions: { margin: '50px 0 0 0', maxWidth: '100%', width: '400px', flexDirection: 'column' },
  displayMax: {
    fontSize: '12px',
    fontWeight: 500,
  },
  arrowDownContainer: {
    width: '100%',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowDown: {
    background: 'yellow',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    justifyContent: 'center',
    paddingRight: '1px',
  },
  checkboxContainer: { alignItems: 'center', width: '21px', height: '21px', marginRight: ['10px', '0'] },
  checkboxText: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    marginLeft: '10px',
  },
  renderActions: {
    position: 'relative',
    width: '100%',
    marginTop: '10px',
  },
}
