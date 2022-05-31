import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<string, ThemeUIStyleObject> = {
  text: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '700',
    color: 'text',
  },
  row: {
    backgroundColor: 'white3',
    width: '100%',
    padding: '6px 10px',
    justifyContent: 'space-between',
    '&:first-child': {
      borderRadius: '6px 6px 0 0',
    },
    '&:last-child': {
      borderRadius: '0 0 6px 6px',
    },
    '&:nth-child(2)': {
      background: 'white4',
    },
  },
  button: {
    '&&': {
      fontSize: '16px',
      fontWeight: 700,
      padding: '10px 32px',
    },
  },
  modalHeader: {
    Svg: {
      marginLeft: 0,
      marginRight: '11px',
    },
    flexDirection: 'row-reverse',
  },
  balance: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '14px',
    marginRight: '10px',
  },
  token: {
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px',
  },
  icon: {
    justifyContent: 'center',
    backgroundColor: '#FFB300',
    borderRadius: '30px',
    width: '29px',
    height: '29px',
  },
  bottombutton: {
    justifyContent: 'center',
    Button: {
      padding: '7px 30px',
    },
  },
}

export default styles
