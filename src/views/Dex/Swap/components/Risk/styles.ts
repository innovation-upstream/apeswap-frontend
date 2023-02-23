import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  tag: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3px 8px',
    gap: '5px',
    border: '2px solid',
    borderRadius: '70px',
    height: '21px',
    marginBottom: '5px',
  },
  text: {
    fontWeight: 700,
    fontSize: '10px',
    lineHeight: '15px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}
