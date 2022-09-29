import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  playBody: {
    lineHeight: '14px',
    fontSize: '12px',
    fontWeight: 500,
    marginBottom: '10px',
  },
  walletHolds: {
    margin: [0, '20px'],
    fontSize: '14px',
  },
  btnContainer: {
    width: ['90%'],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: ['column', 'row'],
    gap: ['20px'],
    marginBottom: ['20px'],
  },
  btn: {
    width: ['100%', '100%', 'auto'],
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 700,
    height: '44px',
  },
}
