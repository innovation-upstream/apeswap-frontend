/** @jsxImportSource theme-ui */
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  firstSection: {
    border: '1px solid #959595',
    padding: '15px',
    borderRadius: '15px',
    margin: '15px 0',
  },
  textAreaBottom: {
    position: 'relative',
    display: 'block',
    bottom: '0px',
    borderTop: '1px solid #ffb300',
    padding: '7px 10px',
    fontSize: '13px',
    width: '100%',
  },
  main: {
    maxWidth: '965px',
    margin: '0 auto',
    padding: '24px 15px',
    flexDirection: ['column', 'row'],
  },
  textArea: {
    position: 'relative',
    marginBottom: '20px',
    background: 'lvl1',
    borderRadius: '10px',
    border: '1px solid #ffb300',
  },
  action: {
    border: '1px solid #ffb300',
    padding: '25px',
    borderRadius: '15px',
    height: '100%',
    marginTop: ['25px', '0px'],
    width: ['100%', '320px'],
    marginLeft: ['0px', '32px'],
    top: ['0px', '75px'],
    position: 'sticky',
  },
  inputMain: {
    alignItems: 'center',
    width: '100%',
    background: 'white4',
    borderRadius: '20px',
    border: '1px solid #ffb300',
    display: 'flex',
    height: '42px',
    padding: ' 0  15px',
    ':hover': {
      border: '1px solid  #000000',
    },
  },
  input: {
    background: 'none',
    border: '0',
    color: 'primary',
    flex: '1',
    height: ' 25px',
    margin: 0,
    padding: '15px',
    outline: 'none',
    fontWeight: ' 600',
    fontSize: ' 13px',
    placeholder: {
      color: 'gray',
      fontSize: '13px',
    },
  },
}
