import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  newsletter: {
    width: '100%',
    background: 'white2',
    justifyContent: ['center'],
    alignItems: ['center'],
    flexDirection: 'column',
  },
  contentBody: {
    width: ['88%', '90%', '90%', '90%', '100%'],
    maxWidth: '1200px',
    alignItems: 'center',
    flexDirection: ['column', 'row'],
    gap: ['12px', 0],
  },
  leftForm: {
    flexDirection: 'column',
    mr: [0, 0, 0, 0, '82px'],
    width: ['100%', '50%', '50%', '50%', '100%'],
  },
  getLatestText: {
    fontWeight: 700,
  },
  privacyText: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '14px',
    fontStyle: 'italic',
    mr: '5px',
  },
  form: {
    background: 'white3',
    width: ['360px', '360px', '360px', ''],
    height: '42px',
    borderRadius: '10px',
    paddingLeft: ['8px', '10px', '24px'],
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    border: 'none',
    paddingRight: '5px',
  },
  submit: {
    border: 'none',
    background: 'white4',
    width: '75px',
    height: '42px',
    borderRadius: '10px',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  status: {
    mt: '10px',
    fontWeight: 700,
    fontSize: '14px',
  },
}
