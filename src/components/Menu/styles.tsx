import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<string, ThemeUIStyleObject> = {
  header: {
    background: 'navbar',
    position: 'fixed',
    width: '100%',
    height: '60px',
    transition: 'transform linear 0.1s',
    zIndex: 9,
  },
  last: {
    display: ['none', 'block', 'block'],
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 5,
    background: 'rgb(56, 56, 56, 0.6)',
  },
}
export default styles
