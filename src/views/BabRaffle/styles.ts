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
  ntd: {
    background: 'white2',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: ['50px', '100px'],
    gap: [0, '15px'],
  },
  ntdTop: {
    width: ['90%'],
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: ['20px', '30px'],
    gap: ['10px', '15px'],
  },
  ntdHeader: {
    fontSize: '30px',
    lineHeight: '45px',
    fontWeight: 700,
  },
  ntdSupportHeader: {
    fontSize: ['18px', '22px'],
    lineHeight: ['27px', '33px'],
    fontWeight: 700,
    width: ['70%', 'max-content'],
  },
  ntdDescription: {
    fontSize: ['16px', '22px'],
    lineHeight: ['24px', '33px'],
    fontWeight: 400,
  },
}
