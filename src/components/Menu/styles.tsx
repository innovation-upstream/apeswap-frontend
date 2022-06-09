import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  headerSetting: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    px: ['25px', '25px', '20px'],
  },
  overlay: {
    display: ['none', 'block', 'block'],
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 5,
    background: 'rgb(56, 56, 56, 0.6)',
  },
  apeLogoHeader: {
    '&:hover:not([disabled])': {
      backgroundColor: 'transparent',
      filter: 'brightness(100%)',
    },
  },
}

interface Props {
  showMenu?: boolean
}

export const dynamicStyles: Record<string, (props: any) => ThemeUIStyleObject> = {
  userBlockBtn: ({ showMenu }: Props) => ({
    background: 'navbar',
    position: 'fixed',
    width: '100%',
    height: '60px',
    transition: 'transform linear 0.1s',
    zIndex: 9,
    transform: `translateY(${showMenu ? 0 : '-100%'})`,
  }),
}
