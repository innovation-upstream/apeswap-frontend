import { ThemeUIStyleObject } from 'theme-ui'

export const dynamicStyles: Record<'menuContainer', (props: { showMonkeyImage?: boolean }) => ThemeUIStyleObject> = {
  menuContainer: ({ showMonkeyImage }: { showMonkeyImage?: boolean }) => ({
    borderRadius: '10px',
    justifyContent: 'space-between',
    padding: '10px 20px',
    zIndex: 2,
    backgroundColor: 'white2',
    minWidth: '300px',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    '@media screen and (min-width: 852px)': {
      padding: showMonkeyImage ? '10px 120px 10px 10px' : '10px 10px',
      flexDirection: 'row',
    },
  }),
}

export const styles: Record<string, ThemeUIStyleObject> = {
  menuContainer: {
    borderRadius: '10px',
    justifyContent: 'space-between',
    padding: '10px 20px',
    zIndex: 2,
    backgroundColor: 'white2',
    minWidth: '300px',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    '@media screen and (min-width: 852px)': {
      padding: '10px 10px',
      flexDirection: 'row',
    },
  },
  searchText: {
    fontWeight: 700,
    fontSize: '16px !important',
    display: 'none',
    alignItems: 'center',
    '@media screen and (min-width: 1050px)': {
      display: 'inherit',
      margin: '0 10px',
    },
  },
  expandedButton: {
    display: ['flex', 'flex', 'none'],
    backgroundColor: 'lvl1',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  container: {
    width: ['100%', '100%', 'unset'],
    justifyContent: 'space-between',
    maxWidth: '353px',
    marginTop: ['15px', '15px', '0'],
  },
  selectContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: '10px',
    fontWeight: 800,
    border: 'none',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '150px',
    },
    '@media screen and (min-width: 1000px)': {
      width: '240px',
    },
  },
  onlyDesktop: {
    display: ['none', 'none', 'flex'],
  },
  onlyMobile: {
    display: ['flex', 'flex', 'none'],
  },
  monkey: {
    height: '187px',
    width: '134px',
    position: 'absolute',
    display: ['none', 'none', 'block'],
    right: '10px',
    top: '14vw',
    '@media screen and (min-width: 1130px)': {
      top: '175px',
    },
  },
}
