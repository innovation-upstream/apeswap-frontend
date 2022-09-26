import { Button, Input } from '@apeswapfinance/uikit'
import styled from '@emotion/styled'

export const GetLPButton = styled(Button)`
  height: 44px;
  width: 100%;
  border: 3px solid ${({ theme }) => theme.colors.yellow};
  color: ${({ theme }) => theme.colors.yellow};
  :hover {
    border: 3px solid yellow;
  }
  @media screen and (min-width: 1180px) {
    margin: 0 20px;
  }
`

export const BuyButton = styled(Button)`
  width: 100%;
  height: 44px;
  font-weight: 700;
  @media screen and (min-width: 1180px) {
    margin: 0 20px;
  }
`

export const StyledInput = styled(Input)`
  width: 100%;
  border: none;
  font-size: 22px;
  font-weight: 700;
`

export const styles = {
  buyContainer: {
    width: '100%',
    flexDirection: 'column',
    '@media screen and (min-width: 1180px)': {
      marginRight: '40px',
    },
  },
  getLpContainer: {
    display: 'none',
    width: '50%',
    padding: '0 20px',
    height: '44px',
    '@media screen and (min-width: 1180px)': {
      display: 'initial',
    },
  },
  buyButtonContainer: {
    width: '100%',
    '@media screen and (min-width: 1180px)': {
      width: '50%',
      padding: '0 20px',
    },
  },
  lpContainer: {
    width: '100%',
    marginBottom: '15px',
    '@media screen and (min-width: 1180px)': {
      display: 'none',
    },
  },
}
