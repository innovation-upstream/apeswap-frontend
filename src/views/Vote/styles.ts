import { keyframes } from '@emotion/react'

const loaderAnimation = keyframes({
  '0%': { opacity: 0.8 },
  '50%': { opacity: 0.9 },
  '100%': { opacity: 1 },
})

const styles = {
  pageWrapper: {
    maxWidth: '1012px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '24px',
    marginBottom: '40px',
    display: 'flex',
    columnGap: '30px',
  },
  sideMenuWrapper: {
    display: ['none', 'block'],
    position: 'relative',
    minWidth: '240px',
  },
  proposalSideMenu: {
    display: ['none', 'block'],
    position: 'relative',
    minWidth: '321px',
  },
  sideMenu: {
    width: '100%',
    backgroundColor: 'lvl1',
    borderRadius: '10px',
  },
  sideMenuProfile: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
    alignItems: 'center',
    padding: '24px',
  },
  sideMenuProfileInfo: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '8px',
  },
  sideMenuLinkContainer: {
    marginTop: '40px',
    paddingBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
  },
  sideMenuLink: {
    padding: '15px',
    borderStyle: 'solid',
    borderWidth: '0px 0px 0px 3px',
  },
  menuSocialIcons: {
    marginTop: '10px',
    px: '20px',
    display: 'flex',
    columnGap: '15px',
  },
  sideMenuAvatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50px',
    background: 'yellow',
  },
  propsalListWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
  },
  listHeaderSection: {
    width: '100%',
    display: 'inline-flex',
    px: ['15px', '0px'],
    paddingBottom: '5px',
    alignItems: 'center',
  },
  statusSelectContainer: {
    marginLeft: 'auto',
  },
  cardWrapper: {
    my: '24px',
  },
  cardContentContainer: {
    borderRadius: ['0px', '10px'],
    backgroundColor: 'lvl1',
    border: 'solid 1px transparent',
    padding: ['15px', '24px'],
    marginBottom: '20px',
    '&:hover': {
      border: 'solid 1px gray',
    },
  },
  proposalCard: {
    padding: ['16px', '24px'],
  },
  cardContentProfile: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  listProfileWrapper: {
    columnGap: ['3px', '10px'],
    alignItems: 'center',
  },
  cardListProfile: {
    width: '28px',
    height: '28px',
    borderRadius: '25px',
    backgroundColor: 'yellow',
    '&:img': {
      objectFit: 'cover',
    },
  },
  coreLabel: {
    px: '7px',
    py: '2px',
    marginLeft: ['4px', '8px'],
    borderRadius: '25px',
    border: 'solid 1px gray',
  },
  proposalStatus: {
    py: '2px',
    px: '12px',
    borderRadius: '25px',
    backgroundColor: 'yellow',
  },
  cardTextContent: {
    my: '5px',
  },
  cardListFooter: {
    marginTop: '15px',
    alignItems: 'center',
    columnGap: ['5px', '10px'],
  },
  loading: {
    'div:nth-child(1)': {
      height: '25px',
      width: '60%',
      background: (theme) => `linear-gradient(to right, ${theme.colors.yellow}, #efc97d)`,
      animation: `${loaderAnimation} 1s ease infinite alternate`,
      borderRadius: '5px',
      marginBottom: '10px',
    },
    'div:nth-child(2)': {
      height: '25px',
      width: '40%',
      background: (theme) => `linear-gradient(to left, ${theme.colors.yellow}, #efc97d)`,
      animation: `${loaderAnimation} 1s ease infinite alternate`,
      borderRadius: '5px',
    },
  },
  notFound: {
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  proposalInfoContainer: {
    width: '100%',
    backgroundColor: 'lvl1',
    borderRadius: '10px',
  },
  proposalInfoHeader: {
    padding: '20px',
    borderBottom: 'solid 1px',
    borderColor: 'yellow',
  },
  proposalInfoBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    fontSize: '1',
  },
  proposalInfoBodyItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'light',
  },
  proposalResultContainer: {
    width: '100%',
    backgroundColor: 'lvl1',
    borderRadius: '10px',
    marginTop: '20px',
  },
  proposalResultBody: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
  proposalResultBodyItems: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proposalBodyProfile: {
    columnGap: '10px',
    alignItems: 'center',
  },
  expandBodyText: {
    bottom: 0,
    background: 'white',
    width: '100%',
    height: '50px',
    backgroundColor: 'body',
    opacity: 0.9,
    filter: 'blur(20px)',
    position: 'absolute',
  },
  discussion: {
    width: '100%',
    alignItems: 'center',
    marginTop: '10px',
    padding: '20px',
    backgroundColor: 'lvl1',
    borderRadius: '10px',
    justifyContent: 'space-between',
  },
  votesIconContainer: {
    backgroundColor: 'yellow',
    borderRadius: '50px',
    width: '24px',
    height: '24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  votesContainer: {
    width: '100%',
    backgroundColor: 'lvl1',
    borderRadius: '10px',
  },
  voteItems: {
    padding: '20px',
    borderBottom: 'solid 1px',
    borderBottomColor: 'yellow',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:last-child': {
      border: 'none',
    },
  },
} as any

export default styles
