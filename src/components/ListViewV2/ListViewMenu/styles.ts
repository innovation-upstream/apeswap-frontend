export const styles = {
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
  menuContainer: {
    borderRadius: '10px',
    justifyContent: 'space-between',
    padding: '10px 20px',
    zIndex: 2,
    backgroundColor: 'white2',
    minWidth: '300px',
    width: '100%',
    marginTop: '20px',
    '@media screen and (min-width: 852px)': {
      padding: '10px 10px',
    },
  },
  mobileContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  expandedButton: {
    backgroundColor: 'lvl1',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  mobileRow: {
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '353px',
    marginTop: '15px',
  },
  inputContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  select: {
    height: '36px',
    display: 'flex',
    width: '100%',
  },
  input: {
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
}
