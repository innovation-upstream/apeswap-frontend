import { Flex } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'
import { ThemeUIStyleObject } from 'theme-ui'

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ClaimAllWrapper = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 353px;
`

export const styles: Record<
  'menuContainer' | 'mobileContainer' | 'expandedButton' | 'mobileRow' | 'select' | 'stakedText' | 'searchText',
  ThemeUIStyleObject
> = {
  menuContainer: {
    borderRadius: '10px',
    justifyContent: 'space-between',
    padding: '10px 20px',
    zIndex: 2,
    backgroundColor: 'white2',
    minWidth: '300px',
    width: '100%',
    margin: '20px 0',
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
    minWidth: '38px',
    marginLeft: '10px',
  },
  mobileRow: {
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '353px',
  },
  select: {
    height: '36px',
    display: 'flex',
    width: '100%',
  },
  stakedText: {
    fontWeight: 700,
    fontSize: '16px',
    mx: '10px',
  },
  searchText: {
    marginRight: '15px',
    display: 'none',
    '@media screen and (min-width: 1050px)': {
      display: 'inherit',
    },
  },
}
