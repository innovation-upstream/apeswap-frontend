import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  // Token selector container
  dexNavContainer: {
    position: 'relative',
    width: '100%',
    height: '30px',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '20px',
  },
  navIconContainer: {
    width: '100%',
    maxWidth: '60px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  underline: {
    display: 'inline-block',
    position: 'relative',
    background: 'primaryBright',
    height: '1px',
    width: '100%',
    borderRadius: '10px',
  },
  navLink: {
    position: 'relative',
    width: '50%',
    fontWeight: 700,
    textAlign: 'center',
    cursor: 'pointer',
  },
  underlined: {
    content: "''",
    position: 'absolute',
    background: 'text',
    left: '0px',
    bottom: '-5px',
    height: '5px',
    width: '100%',
    borderRadius: '10px',
    transformOrigin: 'bottom right',
    transition: 'transform 0.25s ease-out',
    backfaceVisibility: 'hidden',
  },
}
